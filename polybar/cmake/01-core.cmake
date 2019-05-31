#
# Core setup
#

set(CMAKE_CXX_STANDARD 14)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

set(THREADS_PREFER_PTHREAD_FLAG ON)

# Export compile commands used for custom targets
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

# Set default build type if not specified
if(NOT CMAKE_BUILD_TYPE)
  message_colored(STATUS "No build type specified; using RelWithDebInfo" 33)
  set(CMAKE_BUILD_TYPE "RelWithDebInfo")
endif()
string(TOUPPER ${CMAKE_BUILD_TYPE} CMAKE_BUILD_TYPE_UPPER)

# Compiler flags
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wall")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wextra")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Werror")
if (CMAKE_CXX_COMPILER_ID MATCHES "GNU")
  # there's no way to modify the code to avoid this warning, so we must
  # suppress it if we use -Werror
  set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wno-noexcept-type")
endif()
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -O2")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -pedantic")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -pedantic-errors")

if (CMAKE_SYSTEM_NAME STREQUAL "FreeBSD")
  # Need dprintf() for FreeBSD 11.1 and older
  set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -D_WITH_DPRINTF")
  # libinotify uses c99 extension, so suppress this error
  set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wno-c99-extensions")
  # Ensures that libraries from dependencies in LOCALBASE are used
  set(CMAKE_EXE_LINKER_FLAGS "${CMAKE_EXE_LINKER_FLAGS} -L/usr/local/lib")
endif()

if(${CMAKE_CXX_COMPILER_ID} STREQUAL Clang)
  set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wno-error=parentheses-equality")
  set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wno-zero-length-array")
endif()

set(CMAKE_CXX_FLAGS_DEBUG "${CMAKE_CXX_FLAGS_DEBUG} -DDEBUG")
set(CMAKE_CXX_FLAGS_DEBUG "${CMAKE_CXX_FLAGS_DEBUG} -O0")
set(CMAKE_CXX_FLAGS_DEBUG "${CMAKE_CXX_FLAGS_DEBUG} -g2")

if(${CMAKE_CXX_COMPILER_ID} STREQUAL GNU)
  set(CMAKE_CXX_FLAGS_MINSIZEREL "${CMAKE_CXX_FLAGS_MINSIZEREL} -fdata-sections -ffunction-sections")
  set(CMAKE_EXE_LINKER_FLAGS_MINSIZEREL "${CMAKE_EXE_LINKER_FLAGS_MINSIZEREL} -Wl,--gc-sections,--icf=safe")
endif()

# Check compiler
if(${CMAKE_CXX_COMPILER_ID} STREQUAL Clang)
  if(CMAKE_CXX_COMPILER_VERSION VERSION_LESS "3.4.0")
    message_colored(FATAL_ERROR "Compiler not supported (Requires clang-3.4+ or gcc-5.1+)" 31)
  else()
    message_colored(STATUS "Using supported compiler ${CMAKE_CXX_COMPILER_ID}-${CMAKE_CXX_COMPILER_VERSION}" 32)
  endif()
elseif(${CMAKE_CXX_COMPILER_ID} STREQUAL GNU)
  if(CMAKE_CXX_COMPILER_VERSION VERSION_LESS "5.1.0")
    message_colored(FATAL_ERROR "Compiler not supported (Requires clang-3.4+ or gcc-5.1+)" 31)
  else()
    message_colored(STATUS "Using supported compiler ${CMAKE_CXX_COMPILER_ID}-${CMAKE_CXX_COMPILER_VERSION}" 32)
  endif()
else()
  message_colored(WARNING "Using unsupported compiler ${CMAKE_CXX_COMPILER_ID}-${CMAKE_CXX_COMPILER_VERSION} !" 31)
endif()

# Set compiler and linker flags for preferred C++ library
if(CXXLIB_CLANG)
  message_colored(STATUS "Linking against libc++" 32)
  set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -stdlib=libc++")
  set(CMAKE_EXE_LINKER_FLAGS "${CMAKE_EXE_LINKER_FLAGS} -lc++ -lc++abi")
elseif(CXXLIB_GCC)
  message_colored(STATUS "Linking against libstdc++" 32)
  set(CMAKE_EXE_LINKER_FLAGS "${CMAKE_EXE_LINKER_FLAGS} -lstdc++")
endif()

# Install paths
if(NOT DEFINED CMAKE_INSTALL_BINDIR)
  set(CMAKE_INSTALL_BINDIR bin)
endif()
if(NOT DEFINED CMAKE_INSTALL_SBINDIR)
  set(CMAKE_INSTALL_SBINDIR sbin)
endif()
if(NOT DEFINED CMAKE_INSTALL_LIBDIR)
  set(CMAKE_INSTALL_LIBDIR lib)
endif()
if(NOT DEFINED CMAKE_INSTALL_INCLUDEDIR)
  set(CMAKE_INSTALL_INCLUDEDIR include)
endif()

# Custom build type ; SANITIZE
SET(CMAKE_CXX_FLAGS_SANITIZE "-O1 -g -fsanitize=address -fno-omit-frame-pointer -fno-optimize-sibling-calls"
  CACHE STRING "Flags used by the C++ compiler during sanitize builds." FORCE)
SET(CMAKE_C_FLAGS_SANITIZE ""
  CACHE STRING "Flags used by the C compiler during sanitize builds." FORCE)
SET(CMAKE_EXE_LINKER_FLAGS_SANITIZE ""
  CACHE STRING "Flags used for linking binaries during sanitize builds." FORCE)
SET(CMAKE_SHARED_LINKER_FLAGS_SANITIZE ""
  CACHE STRING "Flags used by the shared libraries linker during sanitize builds." FORCE)
MARK_AS_ADVANCED(
  CMAKE_CXX_FLAGS_SANITIZE
  CMAKE_C_FLAGS_SANITIZE
  CMAKE_EXE_LINKER_FLAGS_SANITIZE
  CMAKE_SHARED_LINKER_FLAGS_SANITIZE)
