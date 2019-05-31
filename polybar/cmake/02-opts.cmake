#
# Build options
#

checklib(ENABLE_ALSA "pkg-config" alsa)
checklib(ENABLE_CURL "pkg-config" libcurl)
checklib(ENABLE_I3 "binary" i3)
checklib(ENABLE_MPD "pkg-config" libmpdclient)
checklib(WITH_LIBNL "pkg-config" libnl-genl-3.0)
if(WITH_LIBNL)
  checklib(ENABLE_NETWORK "pkg-config" libnl-genl-3.0)
else()
  checklib(ENABLE_NETWORK "cmake" Libiw)
endif()
checklib(ENABLE_PULSEAUDIO "pkg-config" libpulse)
checklib(ENABLE_PULSEAUDIO "binary" pulseaudio)
checklib(WITH_XKB "pkg-config" xcb-xkb)
checklib(WITH_XRM "pkg-config" xcb-xrm)
checklib(WITH_XRANDR_MONITORS "pkg-config" "xcb-randr>=1.12")
checklib(WITH_XCURSOR "pkg-config" "xcb-cursor")

if(NOT DEFINED ENABLE_CCACHE AND CMAKE_BUILD_TYPE_UPPER MATCHES DEBUG)
  set(ENABLE_CCACHE ON)
endif()

option(CXXLIB_CLANG "Link against libc++" OFF)
option(CXXLIB_GCC "Link against stdlibc++" OFF)

option(BUILD_IPC_MSG "Build ipc messager" ON)
option(BUILD_TESTS "Build testsuite" OFF)

option(ENABLE_ALSA "Enable alsa support" ON)
option(ENABLE_CURL "Enable curl support" ON)
option(ENABLE_I3 "Enable i3 support" ON)
option(ENABLE_MPD "Enable mpd support" ON)
option(WITH_LIBNL "Use netlink interface for wireless" ON)
option(ENABLE_NETWORK "Enable network support" ON)
option(ENABLE_XKEYBOARD "Enable xkeyboard support" ON)
option(ENABLE_PULSEAUDIO "Enable PulseAudio support" ON)

option(WITH_XRANDR "xcb-randr support" ON)
option(WITH_XRANDR_MONITORS "xcb-randr monitor support" ON)
option(WITH_XRENDER "xcb-render support" OFF)
option(WITH_XDAMAGE "xcb-damage support" OFF)
option(WITH_XSYNC "xcb-sync support" OFF)
option(WITH_XCOMPOSITE "xcb-composite support" OFF)
option(WITH_XKB "xcb-xkb support" ON)
option(WITH_XRM "xcb-xrm support" ON)
option(WITH_XCURSOR "xcb-cursor support" ON)

option(DEBUG_LOGGER "Trace logging" ON)

if(CMAKE_BUILD_TYPE_UPPER MATCHES DEBUG)
  option(DEBUG_LOGGER_VERBOSE "Trace logging (verbose)" OFF)
  option(DEBUG_HINTS "Debug clickable areas" OFF)
  option(DEBUG_WHITESPACE "Debug whitespace" OFF)
  option(DEBUG_FONTCONFIG "Debug fontconfig" OFF)
endif()

set(SETTING_ALSA_SOUNDCARD "default"
  CACHE STRING "Name of the ALSA soundcard driver")
set(SETTING_BSPWM_SOCKET_PATH "/tmp/bspwm_0_0-socket"
  CACHE STRING "Path to bspwm socket")
set(SETTING_BSPWM_STATUS_PREFIX "W"
  CACHE STRING "Prefix prepended to the bspwm status line")
set(SETTING_CONNECTION_TEST_IP "8.8.8.8"
  CACHE STRING "Address to ping when testing network connection")
set(SETTING_PATH_ADAPTER "/sys/class/power_supply/%adapter%"
  CACHE STRING "Path to adapter")
set(SETTING_PATH_BACKLIGHT_MAX "/sys/class/backlight/%card%/max_brightness"
  CACHE STRING "Path to file containing the maximum backlight value")
set(SETTING_PATH_BACKLIGHT_VAL "/sys/class/backlight/%card%/brightness"
  CACHE STRING "Path to file containing the current backlight value")
set(SETTING_PATH_BATTERY "/sys/class/power_supply/%battery%"
  CACHE STRING "Path to battery")
set(SETTING_PATH_CPU_INFO "/proc/stat"
  CACHE STRING "Path to file containing cpu info")
set(SETTING_PATH_MEMORY_INFO "/proc/meminfo"
  CACHE STRING "Path to file containing memory info")
set(SETTING_PATH_MESSAGING_FIFO "/tmp/polybar_mqueue.%pid%"
  CACHE STRING "Path to file containing the current temperature")
set(SETTING_PATH_TEMPERATURE_INFO "/sys/class/thermal/thermal_zone%zone%/temp"
  CACHE STRING "Path to file containing the current temperature")

if(CMAKE_BUILD_TYPE_UPPER MATCHES DEBUG)
  set(DEBUG_HINTS_OFFSET_X 0 CACHE INTEGER "Debug hint offset x")
  set(DEBUG_HINTS_OFFSET_Y 0 CACHE INTEGER "Debug hint offset y")
endif()
