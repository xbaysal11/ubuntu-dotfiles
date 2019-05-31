#pragma once

#include <cerrno>
#include <cstring>

#include "common.hpp"

POLYBAR_NS

using std::strerror;
using std::exception;
using std::runtime_error;

class application_error : public runtime_error {
 public:
  explicit application_error(const string& message, int code = 0) : runtime_error(message), code(code) {}
  virtual ~application_error() {}
  int code{0};
};

class system_error : public application_error {
 public:
  explicit system_error() : application_error(strerror(errno), errno) {}
  explicit system_error(const string& message)
      : application_error(message + " (reason: " + strerror(errno) + ")", errno) {}
  virtual ~system_error() {}
};

#define DEFINE_CHILD_ERROR(error, parent) \
  class error : public parent {           \
    using parent::parent;                 \
  }
#define DEFINE_ERROR(error) DEFINE_CHILD_ERROR(error, application_error)

POLYBAR_NS_END
