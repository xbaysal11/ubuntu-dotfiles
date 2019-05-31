#include <sys/wait.h>
#include <unistd.h>
#include <csignal>
#include <cstdlib>
#include <utility>

#include "errors.hpp"
#include "utils/command.hpp"
#include "utils/io.hpp"
#include "utils/process.hpp"

#ifndef STDOUT_FILENO
#define STDOUT_FILENO 1
#endif
#ifndef STDERR_FILENO
#define STDERR_FILENO 2
#endif

POLYBAR_NS

command::command(const logger& logger, string cmd) : m_log(logger), m_cmd(move(cmd)) {
  if (pipe(m_stdin) != 0) {
    throw command_error("Failed to allocate input stream");
  }
  if (pipe(m_stdout) != 0) {
    throw command_error("Failed to allocate output stream");
  }
}

command::~command() {
  if (is_running()) {
    terminate();
  }
  if (m_stdin[PIPE_READ] > 0) {
    close(m_stdin[PIPE_READ]);
  }
  if (m_stdin[PIPE_WRITE] > 0) {
    close(m_stdin[PIPE_WRITE]);
  }
  if (m_stdout[PIPE_READ] > 0) {
    close(m_stdout[PIPE_READ]);
  }
  if (m_stdout[PIPE_WRITE] > 0) {
    close(m_stdout[PIPE_WRITE]);
  }
}

/**
 * Execute the command
 */
int command::exec(bool wait_for_completion) {
  if ((m_forkpid = fork()) == -1) {
    throw system_error("Failed to fork process");
  }

  if (process_util::in_forked_process(m_forkpid)) {
    if (dup2(m_stdin[PIPE_READ], STDIN_FILENO) == -1) {
      throw command_error("Failed to redirect stdin in child process");
    }
    if (dup2(m_stdout[PIPE_WRITE], STDOUT_FILENO) == -1) {
      throw command_error("Failed to redirect stdout in child process");
    }
    if (dup2(m_stdout[PIPE_WRITE], STDERR_FILENO) == -1) {
      throw command_error("Failed to redirect stderr in child process");
    }

    // Close file descriptors that won't be used by the child
    if ((m_stdin[PIPE_READ] = close(m_stdin[PIPE_READ])) == -1) {
      throw command_error("Failed to close fd");
    }
    if ((m_stdin[PIPE_WRITE] = close(m_stdin[PIPE_WRITE])) == -1) {
      throw command_error("Failed to close fd");
    }
    if ((m_stdout[PIPE_READ] = close(m_stdout[PIPE_READ])) == -1) {
      throw command_error("Failed to close fd");
    }
    if ((m_stdout[PIPE_WRITE] = close(m_stdout[PIPE_WRITE])) == -1) {
      throw command_error("Failed to close fd");
    }

    setpgid(m_forkpid, 0);
    process_util::exec_sh(m_cmd.c_str());
  } else {
    // Close file descriptors that won't be used by the parent
    if ((m_stdin[PIPE_READ] = close(m_stdin[PIPE_READ])) == -1) {
      throw command_error("Failed to close fd");
    }
    if ((m_stdout[PIPE_WRITE] = close(m_stdout[PIPE_WRITE])) == -1) {
      throw command_error("Failed to close fd");
    }

    if (wait_for_completion) {
      auto status = wait();
      m_forkpid = -1;
      return status;
    }
  }

  return EXIT_SUCCESS;
}

void command::terminate() {
  if (is_running()) {
    m_log.trace("command: Sending SIGTERM to running child process (%d)", m_forkpid);
    killpg(m_forkpid, SIGTERM);
    wait();
  }
  m_forkpid = -1;
}

/**
 * Check if command is running
 */
bool command::is_running() {
  return m_forkpid > 0 && process_util::wait_for_completion_nohang(m_forkpid, &m_forkstatus) > -1;
}

/**
 * Wait for the child processs to finish
 */
int command::wait() {
  do {
    m_log.trace("command: Waiting for pid %d to finish...", m_forkpid);

    process_util::wait_for_completion(m_forkpid, &m_forkstatus, WCONTINUED | WUNTRACED);

    if (WIFEXITED(m_forkstatus) && m_forkstatus > 0) {
      m_log.trace("command: Exited with failed status %d", WEXITSTATUS(m_forkstatus));
    } else if (WIFEXITED(m_forkstatus)) {
      m_log.trace("command: Exited with status %d", WEXITSTATUS(m_forkstatus));
    } else if (WIFSIGNALED(m_forkstatus)) {
      m_log.trace("command: killed by signal %d", WTERMSIG(m_forkstatus));
    } else if (WIFSTOPPED(m_forkstatus)) {
      m_log.trace("command: Stopped by signal %d", WSTOPSIG(m_forkstatus));
    } else if (WIFCONTINUED(m_forkstatus)) {
      m_log.trace("command: Continued");
    } else {
      break;
    }
  } while (!WIFEXITED(m_forkstatus) && !WIFSIGNALED(m_forkstatus));

  return m_forkstatus;
}

/**
 * Tail command output
 *
 * @note: This is a blocking call and will not
 * end until the stream is closed
 */
void command::tail(callback<string> cb) {
  io_util::tail(m_stdout[PIPE_READ], move(cb));
}

/**
 * Write line to command input channel
 */
int command::writeline(string data) {
  std::lock_guard<std::mutex> lck(m_pipelock);
  return io_util::writeline(m_stdin[PIPE_WRITE], move(data));
}

/**
 * Read a line from the commands output stream
 */
string command::readline() {
  std::lock_guard<std::mutex> lck(m_pipelock);
  return io_util::readline(m_stdout[PIPE_READ]);
}

/**
 * Get command output channel
 */
int command::get_stdout(int c) {
  return m_stdout[c];
}

/**
 * Get command input channel
 */
int command::get_stdin(int c) {
  return m_stdin[c];
}

/**
 * Get command pid
 */
pid_t command::get_pid() {
  return m_forkpid;
}

/**
 * Get command exit status
 */
int command::get_exit_status() {
  return m_forkstatus;
}

POLYBAR_NS_END
