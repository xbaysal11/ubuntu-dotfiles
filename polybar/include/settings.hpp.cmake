#pragma once

#include <cstdio>
#include <string>
#include <vector>

#include "version.hpp"

#define APP_NAME "@PROJECT_NAME@"
#cmakedefine APP_VERSION "@APP_VERSION@"
#ifndef APP_VERSION
#define APP_VERSION GIT_TAG
#endif
#cmakedefine APP_VERSION_NAMESPACE @APP_VERSION_NAMESPACE@
#ifndef APP_VERSION_NAMESPACE
#define APP_VERSION_NAMESPACE GIT_TAG_NAMESPACE
#endif
#define BASE_PATH "@PROJECT_SOURCE_DIR@"

#cmakedefine01 ENABLE_ALSA
#cmakedefine01 ENABLE_MPD
#cmakedefine01 ENABLE_NETWORK
#cmakedefine01 WITH_LIBNL
#cmakedefine01 ENABLE_I3
#cmakedefine01 ENABLE_CURL
#cmakedefine01 ENABLE_PULSEAUDIO

#cmakedefine01 WITH_XRANDR
#cmakedefine01 WITH_XRENDER
#cmakedefine01 WITH_XDAMAGE
#cmakedefine01 WITH_XSYNC
#cmakedefine01 WITH_XCOMPOSITE
#cmakedefine01 WITH_XKB
#cmakedefine01 WITH_XRM
#cmakedefine01 WITH_XCURSOR

#if WITH_XRANDR
#cmakedefine01 WITH_XRANDR_MONITORS
#else
#define WITH_XRANDR_MONITORS 0
#endif

#if WITH_XKB
#cmakedefine01 ENABLE_XKEYBOARD
#else
#define ENABLE_XKEYBOARD 0
#endif

#cmakedefine XPP_EXTENSION_LIST @XPP_EXTENSION_LIST@

#cmakedefine DEBUG_LOGGER

#if DEBUG
#cmakedefine DEBUG_LOGGER_VERBOSE
#cmakedefine DEBUG_HINTS
#cmakedefine DEBUG_WHITESPACE
#cmakedefine DEBUG_SHADED
#cmakedefine DEBUG_FONTCONFIG
#endif

static const size_t EVENT_SIZE = 64;

static const int SIGN_PRIORITY_CONTROLLER{1};
static const int SIGN_PRIORITY_SCREEN{2};
static const int SIGN_PRIORITY_BAR{3};
static const int SIGN_PRIORITY_RENDERER{4};
static const int SIGN_PRIORITY_TRAY{5};

static const int SINK_PRIORITY_BAR{1};
static const int SINK_PRIORITY_SCREEN{2};
static const int SINK_PRIORITY_TRAY{3};
static const int SINK_PRIORITY_MODULE{4};

#ifdef DEBUG_HINTS
static const int DEBUG_HINTS_OFFSET_X{@DEBUG_HINTS_OFFSET_X@};
static const int DEBUG_HINTS_OFFSET_Y{@DEBUG_HINTS_OFFSET_Y@};
#endif

static constexpr const char* ALSA_SOUNDCARD{"@SETTING_ALSA_SOUNDCARD@"};
static constexpr const char* BSPWM_SOCKET_PATH{"@SETTING_BSPWM_SOCKET_PATH@"};
static constexpr const char* BSPWM_STATUS_PREFIX{"@SETTING_BSPWM_STATUS_PREFIX@"};
static constexpr const char* CONNECTION_TEST_IP{"@SETTING_CONNECTION_TEST_IP@"};
static constexpr const char* PATH_ADAPTER{"@SETTING_PATH_ADAPTER@"};
static constexpr const char* PATH_BACKLIGHT_MAX{"@SETTING_PATH_BACKLIGHT_MAX@"};
static constexpr const char* PATH_BACKLIGHT_VAL{"@SETTING_PATH_BACKLIGHT_VAL@"};
static constexpr const char* PATH_BATTERY{"@SETTING_PATH_BATTERY@"};
static constexpr const char* PATH_CPU_INFO{"@SETTING_PATH_CPU_INFO@"};
static constexpr const char* PATH_MEMORY_INFO{"@SETTING_PATH_MEMORY_INFO@"};
static constexpr const char* PATH_MESSAGING_FIFO{"@SETTING_PATH_MESSAGING_FIFO@"};
static constexpr const char* PATH_TEMPERATURE_INFO{"@SETTING_PATH_TEMPERATURE_INFO@"};

static constexpr const char* BUILDER_SPACE_TOKEN{"%__"};

const auto version_details = [](const std::vector<std::string>& args) {
  for (auto&& arg : args) {
    if (arg.compare(0, 3, "-vv") == 0)
      return true;
  }
  return false;
};

// clang-format off
const auto print_build_info = [](bool extended = false) {
  printf("%s %s\n\n", APP_NAME, APP_VERSION);
  printf("Features: %calsa %ccurl %ci3 %cmpd %cnetwork %cpulseaudio %cxkeyboard\n",
    (ENABLE_ALSA       ? '+' : '-'),
    (ENABLE_CURL       ? '+' : '-'),
    (ENABLE_I3         ? '+' : '-'),
    (ENABLE_MPD        ? '+' : '-'),
    (ENABLE_NETWORK    ? '+' : '-'),
    (ENABLE_PULSEAUDIO ? '+' : '-'),
    (ENABLE_XKEYBOARD  ? '+' : '-'));
  if (extended) {
    printf("\n");
    printf("X extensions: %crandr (%cmonitors) %crender %cdamage %csync %ccomposite %cxkb %cxrm %cxcursor\n",
      (WITH_XRANDR            ? '+' : '-'),
      (WITH_XRANDR_MONITORS   ? '+' : '-'),
      (WITH_XRENDER           ? '+' : '-'),
      (WITH_XDAMAGE           ? '+' : '-'),
      (WITH_XSYNC             ? '+' : '-'),
      (WITH_XCOMPOSITE        ? '+' : '-'),
      (WITH_XKB               ? '+' : '-'),
      (WITH_XRM               ? '+' : '-'),
      (WITH_XCURSOR           ? '+' : '-'));
    printf("\n");
    printf("Build type: @CMAKE_BUILD_TYPE@\n");
    printf("Compiler: @CMAKE_CXX_COMPILER@\n");
    printf("Compiler flags: @CMAKE_CXX_FLAGS@\n");
    printf("Linker flags: @CMAKE_EXE_LINKER_FLAGS@\n");
  }
};
// clang-format on

// vim:ft=cpp
