#pragma once

#include "modules/meta/timer_module.hpp"
#include "settings.hpp"

POLYBAR_NS

namespace modules {
  enum class memtype { NONE = 0, TOTAL, USED, FREE, SHARED, BUFFERS, CACHE, AVAILABLE };

  class memory_module : public timer_module<memory_module> {
   public:
    explicit memory_module(const bar_settings&, string);

    bool update();
    bool build(builder* builder, const string& tag) const;

   private:
    static constexpr const char* TAG_LABEL{"<label>"};
    static constexpr const char* TAG_BAR_USED{"<bar-used>"};
    static constexpr const char* TAG_BAR_FREE{"<bar-free>"};
    static constexpr const char* TAG_RAMP_USED{"<ramp-used>"};
    static constexpr const char* TAG_RAMP_FREE{"<ramp-free>"};

    label_t m_label;
    progressbar_t m_bar_memused;
    progressbar_t m_bar_memfree;
    int m_perc_memused{0};
    int m_perc_memfree{0};
    ramp_t m_ramp_memused;
    ramp_t m_ramp_memfree;
    int m_perc_swap_used{0};
    int m_perc_swap_free{0};
  };
}

POLYBAR_NS_END
