#pragma once

#include "components/config.hpp"
#include "settings.hpp"
#include "modules/meta/timer_module.hpp"

POLYBAR_NS

namespace modules {
  /**
   * Filesystem structure
   */
  struct fs_mount {
    string mountpoint;
    bool mounted = false;

    string type;
    string fsname;

    unsigned long long bytes_free{0ULL};
    unsigned long long bytes_used{0ULL};
    unsigned long long bytes_avail{0ULL};
    unsigned long long bytes_total{0ULL};

    int percentage_free{0};
    int percentage_used{0};

    explicit fs_mount(const string& mountpoint, bool mounted = false) : mountpoint(mountpoint), mounted(mounted) {}
  };

  using fs_mount_t = unique_ptr<fs_mount>;

  /**
   * Module used to display filesystem stats.
   */
  class fs_module : public timer_module<fs_module> {
   public:
    explicit fs_module(const bar_settings&, string);

    bool update();
    string get_format() const;
    string get_output();
    bool build(builder* builder, const string& tag) const;

   private:
    static constexpr auto FORMAT_MOUNTED = "format-mounted";
    static constexpr auto FORMAT_UNMOUNTED = "format-unmounted";
    static constexpr auto TAG_LABEL_MOUNTED = "<label-mounted>";
    static constexpr auto TAG_LABEL_UNMOUNTED = "<label-unmounted>";
    static constexpr auto TAG_BAR_USED = "<bar-used>";
    static constexpr auto TAG_BAR_FREE = "<bar-free>";
    static constexpr auto TAG_RAMP_CAPACITY = "<ramp-capacity>";

    label_t m_labelmounted;
    label_t m_labelunmounted;
    progressbar_t m_barused;
    progressbar_t m_barfree;
    ramp_t m_rampcapacity;

    vector<string> m_mountpoints;
    vector<fs_mount_t> m_mounts;
    bool m_fixed{false};
    bool m_remove_unmounted{false};
    int m_spacing{2};

    // used while formatting output
    size_t m_index{0_z};
  };
}

POLYBAR_NS_END
