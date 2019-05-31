#include "modules/network.hpp"

#include "drawtypes/animation.hpp"
#include "drawtypes/label.hpp"
#include "drawtypes/ramp.hpp"
#include "utils/factory.hpp"

#include "modules/meta/base.inl"

POLYBAR_NS

namespace modules {
  template class module<network_module>;

  network_module::network_module(const bar_settings& bar, string name_)
      : timer_module<network_module>(bar, move(name_)) {
    // Load configuration values
    m_interface = m_conf.get(name(), "interface", m_interface);
    m_ping_nth_update = m_conf.get(name(), "ping-interval", m_ping_nth_update);
    m_udspeed_minwidth = m_conf.get(name(), "udspeed-minwidth", m_udspeed_minwidth);
    m_accumulate = m_conf.get(name(), "accumulate-stats", m_accumulate);
    m_interval = m_conf.get<decltype(m_interval)>(name(), "interval", 1s);
    m_unknown_up = m_conf.get<bool>(name(), "unknown-as-up", false);

    m_conf.warn_deprecated(name(), "udspeed-minwidth", "%downspeed:min:max% and %upspeed:min:max%");

    // Add formats
    m_formatter->add(FORMAT_CONNECTED, TAG_LABEL_CONNECTED, {TAG_RAMP_SIGNAL, TAG_RAMP_QUALITY, TAG_LABEL_CONNECTED});
    m_formatter->add(FORMAT_DISCONNECTED, TAG_LABEL_DISCONNECTED, {TAG_LABEL_DISCONNECTED});

    // Create elements for format-connected
    if (m_formatter->has(TAG_RAMP_SIGNAL, FORMAT_CONNECTED)) {
      m_ramp_signal = load_ramp(m_conf, name(), TAG_RAMP_SIGNAL);
    }
    if (m_formatter->has(TAG_RAMP_QUALITY, FORMAT_CONNECTED)) {
      m_ramp_quality = load_ramp(m_conf, name(), TAG_RAMP_QUALITY);
    }
    if (m_formatter->has(TAG_LABEL_CONNECTED, FORMAT_CONNECTED)) {
      m_label[connection_state::CONNECTED] =
          load_optional_label(m_conf, name(), TAG_LABEL_CONNECTED, "%ifname% %local_ip%");
    }

    // Create elements for format-disconnected
    if (m_formatter->has(TAG_LABEL_DISCONNECTED, FORMAT_DISCONNECTED)) {
      m_label[connection_state::DISCONNECTED] = load_optional_label(m_conf, name(), TAG_LABEL_DISCONNECTED, "");
      m_label[connection_state::DISCONNECTED]->reset_tokens();
      m_label[connection_state::DISCONNECTED]->replace_token("%ifname%", m_interface);
    }

    // Create elements for format-packetloss if we are told to test connectivity
    if (m_ping_nth_update > 0) {
      m_formatter->add(FORMAT_PACKETLOSS, TAG_LABEL_CONNECTED,
          {TAG_ANIMATION_PACKETLOSS, TAG_LABEL_PACKETLOSS, TAG_LABEL_CONNECTED});

      if (m_formatter->has(TAG_LABEL_PACKETLOSS, FORMAT_PACKETLOSS)) {
        m_label[connection_state::PACKETLOSS] = load_optional_label(m_conf, name(), TAG_LABEL_PACKETLOSS, "");
      }
      if (m_formatter->has(TAG_ANIMATION_PACKETLOSS, FORMAT_PACKETLOSS)) {
        m_animation_packetloss = load_animation(m_conf, name(), TAG_ANIMATION_PACKETLOSS);
      }
    }

    // Get an intstance of the network interface
    if (net::is_wireless_interface(m_interface)) {
      m_wireless = factory_util::unique<net::wireless_network>(m_interface);
      m_wireless->set_unknown_up(m_unknown_up);
    } else {
      m_wired = factory_util::unique<net::wired_network>(m_interface);
      m_wired->set_unknown_up(m_unknown_up);
    };

    // We only need to start the subthread if the packetloss animation is used
    if (m_animation_packetloss) {
      m_threads.emplace_back(thread(&network_module::subthread_routine, this));
    }
  }

  void network_module::teardown() {
    m_wireless.reset();
    m_wired.reset();
  }

  bool network_module::update() {
    net::network* network =
        m_wireless ? static_cast<net::network*>(m_wireless.get()) : static_cast<net::network*>(m_wired.get());

    if (!network->query(m_accumulate)) {
      m_log.warn("%s: Failed to query interface '%s'", name(), m_interface);
      m_connected = false;
      return false;
    }

    try {
      if (m_wireless) {
        m_signal = m_wireless->signal();
        m_quality = m_wireless->quality();
      }
    } catch (const net::network_error& err) {
      m_log.warn("%s: Error getting interface data (%s)", name(), err.what());
    }

    m_connected = network->connected();

    // Ignore the first run
    if (m_counter == -1) {
      m_counter = 0;
    } else if (m_ping_nth_update > 0 && m_connected && (++m_counter % m_ping_nth_update) == 0) {
      m_packetloss = !network->ping();
      m_counter = 0;
    }

    auto upspeed = network->upspeed(m_udspeed_minwidth);
    auto downspeed = network->downspeed(m_udspeed_minwidth);

    // Update label contents
    const auto replace_tokens = [&](label_t& label) {
      label->reset_tokens();
      label->replace_token("%ifname%", m_interface);
      label->replace_token("%local_ip%", network->ip());
      label->replace_token("%local_ip6%", network->ip6());
      label->replace_token("%upspeed%", upspeed);
      label->replace_token("%downspeed%", downspeed);

      if (m_wired) {
        label->replace_token("%linkspeed%", m_wired->linkspeed());
      } else if (m_wireless) {
        label->replace_token("%essid%", m_wireless->essid());
        label->replace_token("%signal%", to_string(m_signal));
        label->replace_token("%quality%", to_string(m_quality));
      }
    };

    if (m_label[connection_state::CONNECTED]) {
      replace_tokens(m_label[connection_state::CONNECTED]);
    }
    if (m_label[connection_state::PACKETLOSS]) {
      replace_tokens(m_label[connection_state::PACKETLOSS]);
    }

    return true;
  }

  string network_module::get_format() const {
    if (!m_connected) {
      return FORMAT_DISCONNECTED;
    } else if (m_packetloss && m_ping_nth_update > 0) {
      return FORMAT_PACKETLOSS;
    } else {
      return FORMAT_CONNECTED;
    }
  }

  bool network_module::build(builder* builder, const string& tag) const {
    if (tag == TAG_LABEL_CONNECTED) {
      builder->node(m_label.at(connection_state::CONNECTED));
    } else if (tag == TAG_LABEL_DISCONNECTED) {
      builder->node(m_label.at(connection_state::DISCONNECTED));
    } else if (tag == TAG_LABEL_PACKETLOSS) {
      builder->node(m_label.at(connection_state::PACKETLOSS));
    } else if (tag == TAG_ANIMATION_PACKETLOSS) {
      builder->node(m_animation_packetloss->get());
    } else if (tag == TAG_RAMP_SIGNAL) {
      builder->node(m_ramp_signal->get_by_percentage(m_signal));
    } else if (tag == TAG_RAMP_QUALITY) {
      builder->node(m_ramp_quality->get_by_percentage(m_quality));
    } else {
      return false;
    }
    return true;
  }

  void network_module::subthread_routine() {
    const chrono::milliseconds framerate{m_animation_packetloss->framerate()};
    const auto dur = chrono::duration<double>(framerate);

    while (running()) {
      if (m_connected && m_packetloss) {
        broadcast();
      }
      sleep(dur);
    }

    m_log.trace("%s: Reached end of network subthread", name());
  }
}

POLYBAR_NS_END
