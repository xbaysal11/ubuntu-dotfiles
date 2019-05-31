#include <utility>

#include "drawtypes/label.hpp"
#include "drawtypes/progressbar.hpp"
#include "utils/color.hpp"
#include "utils/factory.hpp"
#include "utils/math.hpp"

POLYBAR_NS

namespace drawtypes {
  progressbar::progressbar(const bar_settings& bar, int width, string format)
      : m_builder(factory_util::unique<builder>(bar)), m_format(move(format)), m_width(width) {}

  void progressbar::set_fill(icon_t&& fill) {
    m_fill = forward<decltype(fill)>(fill);
  }

  void progressbar::set_empty(icon_t&& empty) {
    m_empty = forward<decltype(empty)>(empty);
  }

  void progressbar::set_indicator(icon_t&& indicator) {
    if (!m_indicator && indicator.get()) {
      m_width--;
    }
    m_indicator = forward<decltype(indicator)>(indicator);
  }

  void progressbar::set_gradient(bool mode) {
    m_gradient = mode;
  }

  void progressbar::set_colors(vector<string>&& colors) {
    m_colors = forward<decltype(colors)>(colors);

    if (m_colors.empty()) {
      m_colorstep = 1;
    } else {
      m_colorstep = m_width / m_colors.size();
    }
  }

  string progressbar::output(float percentage) {
    string output{m_format};

    // Get fill/empty widths based on percentage
    unsigned int perc = math_util::cap(percentage, 0.0f, 100.0f);
    unsigned int fill_width = math_util::percentage_to_value(perc, m_width);
    unsigned int empty_width = m_width - fill_width;

    // Output fill icons
    fill(perc, fill_width);
    output = string_util::replace_all(output, "%fill%", m_builder->flush());

    // Output indicator icon
    m_builder->node(m_indicator);
    output = string_util::replace_all(output, "%indicator%", m_builder->flush());

    // Output empty icons
    m_builder->node_repeat(m_empty, empty_width);
    output = string_util::replace_all(output, "%empty%", m_builder->flush());

    return output;
  }

  void progressbar::fill(unsigned int perc, unsigned int fill_width) {
    if (m_colors.empty()) {
      m_builder->node_repeat(m_fill, fill_width);
    } else if (m_gradient) {
      size_t color = 0;
      for (size_t i = 0; i < fill_width; i++) {
        if (i % m_colorstep == 0 && color < m_colors.size()) {
          m_fill->m_foreground = m_colors[color++];
        }
        m_builder->node(m_fill);
      }
    } else {
      size_t color = math_util::percentage_to_value<size_t>(perc, m_colors.size() - 1);
      m_fill->m_foreground = m_colors[color];
      m_builder->node_repeat(m_fill, fill_width);
    }
  }

  /**
   * Create a progressbar by loading values
   * from the configuration
   */
  progressbar_t load_progressbar(const bar_settings& bar, const config& conf, const string& section, string name) {
    // Remove the start and end tag from the name in case a format tag is passed
    name = string_util::ltrim(string_util::rtrim(move(name), '>'), '<');

    string format = "%fill%%indicator%%empty%";
    unsigned int width;

    if ((format = conf.get(section, name + "-format", format)).empty()) {
      throw application_error("Invalid format defined at [" + section + "." + name + "]");
    }
    if ((width = conf.get<decltype(width)>(section, name + "-width")) < 1) {
      throw application_error("Invalid width defined at [" + section + "." + name + "]");
    }

    auto pbar = factory_util::shared<progressbar>(bar, width, format);
    pbar->set_gradient(conf.get(section, name + "-gradient", true));
    pbar->set_colors(conf.get_list(section, name + "-foreground", {}));

    icon_t icon_empty;
    icon_t icon_fill;
    icon_t icon_indicator;

    if (format.find("%empty%") != string::npos) {
      icon_empty = load_icon(conf, section, name + "-empty");
    }
    if (format.find("%fill%") != string::npos) {
      icon_fill = load_icon(conf, section, name + "-fill");
    }
    if (format.find("%indicator%") != string::npos) {
      icon_indicator = load_icon(conf, section, name + "-indicator");
    }

    // If a foreground/background color is defined for the indicator
    // but not for the empty icon we use the bar's default colors to
    // avoid color bleed
    if (icon_empty && icon_indicator) {
      if (!icon_indicator->m_background.empty() && icon_empty->m_background.empty()) {
        icon_empty->m_background = color_util::hex<unsigned short int>(bar.background);
      }
      if (!icon_indicator->m_foreground.empty() && icon_empty->m_foreground.empty()) {
        icon_empty->m_foreground = color_util::hex<unsigned short int>(bar.foreground);
      }
    }

    pbar->set_empty(move(icon_empty));
    pbar->set_fill(move(icon_fill));
    pbar->set_indicator(move(icon_indicator));

    return pbar;
  }
}

POLYBAR_NS_END
