#include <utility>

#include "components/builder.hpp"
#include "drawtypes/label.hpp"
#include "utils/color.hpp"
#include "utils/math.hpp"
#include "utils/string.hpp"
#include "utils/time.hpp"
POLYBAR_NS

#ifndef BUILDER_SPACE_TOKEN
#define BUILDER_SPACE_TOKEN "%__"
#endif

builder::builder(const bar_settings& bar) : m_bar(bar) {
  m_tags[syntaxtag::A] = 0;
  m_tags[syntaxtag::B] = 0;
  m_tags[syntaxtag::F] = 0;
  m_tags[syntaxtag::T] = 0;
  m_tags[syntaxtag::o] = 0;
  m_tags[syntaxtag::u] = 0;

  m_colors[syntaxtag::B] = string();
  m_colors[syntaxtag::F] = string();
  m_colors[syntaxtag::o] = string();
  m_colors[syntaxtag::u] = string();
}

/**
 * Flush contents of the builder and return built string
 *
 * This will also close any unclosed tags
 */
string builder::flush() {
  if (m_tags[syntaxtag::B]) {
    background_close();
  }
  if (m_tags[syntaxtag::F]) {
    color_close();
  }
  if (m_tags[syntaxtag::T]) {
    font_close();
  }
  if (m_tags[syntaxtag::o]) {
    overline_color_close();
  }
  if (m_tags[syntaxtag::u]) {
    underline_color_close();
  }
  if ((m_attributes >> static_cast<int>(attribute::UNDERLINE)) & 1) {
    underline_close();
  }
  if ((m_attributes >> static_cast<int>(attribute::OVERLINE)) & 1) {
    overline_close();
  }

  while (m_tags[syntaxtag::A]) {
    cmd_close();
  }

  string output{m_output};

  // reset values
  m_tags.clear();
  m_colors.clear();
  m_output.clear();
  m_fontindex = 1;

  return string_util::replace_all(output, BUILDER_SPACE_TOKEN, " ");
}

/**
 * Insert raw text string
 */
void builder::append(string text) {
  m_output.reserve(text.size());
  m_output += move(text);
}

/**
 * Insert text node
 *
 * This will also parse raw syntax tags
 */
void builder::node(string str, bool add_space) {
  if (str.empty()) {
    return;
  }

  string::size_type n, m;
  string s(move(str));

  if ((n = s.size()) > 2 && s[0] == '"' && s[n - 1] == '"') {
    s = s.substr(1, n - 2);
  }

  while (true) {
    if (s.empty()) {
      break;

    } else if ((n = s.find("%{F-}")) == 0) {
      color_close();
      s.erase(0, 5);

    } else if ((n = s.find("%{F#")) == 0 && (m = s.find('}')) != string::npos) {
      if (m - n - 4 == 2) {
        color_alpha(s.substr(n + 3, m - 3));
      } else {
        color(s.substr(n + 3, m - 3));
      }
      s.erase(n, m + 1);

    } else if ((n = s.find("%{B-}")) == 0) {
      background_close();
      s.erase(0, 5);

    } else if ((n = s.find("%{B#")) == 0 && (m = s.find('}')) != string::npos) {
      background(s.substr(n + 3, m - 3));
      s.erase(n, m + 1);

    } else if ((n = s.find("%{T-}")) == 0) {
      font_close();
      s.erase(0, 5);

    } else if ((n = s.find("%{T")) == 0 && (m = s.find('}')) != string::npos) {
      font(strtol(s.substr(n + 3, m - 3).c_str(), nullptr, 10));
      s.erase(n, m + 1);

    } else if ((n = s.find("%{U-}")) == 0) {
      line_color_close();
      s.erase(0, 5);

    } else if ((n = s.find("%{u-}")) == 0) {
      underline_color_close();
      s.erase(0, 5);

    } else if ((n = s.find("%{o-}")) == 0) {
      overline_color_close();
      s.erase(0, 5);

    } else if ((n = s.find("%{u#")) == 0 && (m = s.find('}')) != string::npos) {
      underline_color(s.substr(n + 3, m - 3));
      s.erase(n, m + 1);

    } else if ((n = s.find("%{o#")) == 0 && (m = s.find('}')) != string::npos) {
      overline_color(s.substr(n + 3, m - 3));
      s.erase(n, m + 1);

    } else if ((n = s.find("%{U#")) == 0 && (m = s.find('}')) != string::npos) {
      line_color(s.substr(n + 3, m - 3));
      s.erase(n, m + 1);

    } else if ((n = s.find("%{+u}")) == 0) {
      underline();
      s.erase(0, 5);

    } else if ((n = s.find("%{+o}")) == 0) {
      overline();
      s.erase(0, 5);

    } else if ((n = s.find("%{-u}")) == 0) {
      underline_close();
      s.erase(0, 5);

    } else if ((n = s.find("%{-o}")) == 0) {
      overline_close();
      s.erase(0, 5);

    } else if ((n = s.find("%{")) == 0 && (m = s.find('}')) != string::npos) {
      append(s.substr(n, m + 1));
      s.erase(n, m + 1);

    } else if ((n = s.find("%{")) > 0) {
      append(s.substr(0, n));
      s.erase(0, n);

    } else {
      break;
    }
  }

  if (!s.empty()) {
    append(s);
  }
  if (add_space) {
    space();
  }
}

/**
 * Insert text node with specific font index
 *
 * @see builder::node
 */
void builder::node(string str, int font_index, bool add_space) {
  font(font_index);
  node(move(str), add_space);
  font_close();
}

/**
 * Insert tags for given label
 */
void builder::node(const label_t& label, bool add_space) {
  if (!label || !*label) {
    return;
  }

  auto text = get_label_text(label);

  // if ((label->m_overline.empty() && m_tags[syntaxtag::o] > 0) || (m_tags[syntaxtag::o] > 0 && label->m_margin > 0))
  //   overline_close();
  // if ((label->m_underline.empty() && m_tags[syntaxtag::u] > 0) || (m_tags[syntaxtag::u] > 0 && label->m_margin > 0))
  //   underline_close();

  if (label->m_margin.left > 0) {
    space(label->m_margin.left);
  }

  if (!label->m_overline.empty()) {
    overline(label->m_overline);
  }
  if (!label->m_underline.empty()) {
    underline(label->m_underline);
  }

  if (!label->m_background.empty()) {
    background(label->m_background);
  }
  if (!label->m_foreground.empty()) {
    color(label->m_foreground);
  }

  if (label->m_padding.left > 0) {
    space(label->m_padding.left);
  }

  node(text, label->m_font, add_space);

  if (label->m_padding.right > 0) {
    space(label->m_padding.right);
  }

  if (!label->m_background.empty()) {
    background_close();
  }
  if (!label->m_foreground.empty()) {
    color_close();
  }

  if (!label->m_underline.empty() || (label->m_margin.right > 0 && m_tags[syntaxtag::u] > 0)) {
    underline_close();
  }
  if (!label->m_overline.empty() || (label->m_margin.right > 0 && m_tags[syntaxtag::o] > 0)) {
    overline_close();
  }

  if (label->m_margin.right > 0) {
    space(label->m_margin.right);
  }
}

/**
 * Repeat text string n times
 */
void builder::node_repeat(const string& str, size_t n, bool add_space) {
  string text;
  text.reserve(str.size() * n);
  while (n--) {
    text += str;
  }
  node(text, add_space);
}

/**
 * Repeat label contents n times
 */
void builder::node_repeat(const label_t& label, size_t n, bool add_space) {
  string text;
  string label_text{label->get()};
  text.reserve(label_text.size() * n);
  while (n--) {
    text += label_text;
  }
  label_t tmp{new label_t::element_type{text}};
  tmp->replace_defined_values(label);
  node(tmp, add_space);
}

/**
 * Insert tag that will offset the contents by given pixels
 */
void builder::offset(int pixels) {
  if (pixels == 0) {
    return;
  }
  tag_open(syntaxtag::O, to_string(pixels));
}

/**
 * Insert spaces
 */
void builder::space(size_t width) {
  if (width) {
    m_output.append(width, ' ');
  } else {
    space();
  }
}
void builder::space() {
  m_output.append(m_bar.spacing, ' ');
}

/**
 * Remove trailing space
 */
void builder::remove_trailing_space(size_t len) {
  if (len == 0_z || len > m_output.size()) {
    return;
  } else if (m_output.substr(m_output.size() - len) == string(len, ' ')) {
    m_output.erase(m_output.size() - len);
  }
}
void builder::remove_trailing_space() {
  remove_trailing_space(m_bar.spacing);
}

/**
 * Insert tag to alter the current font index
 */
void builder::font(int index) {
  if (index == 0) {
    return;
  }
  m_fontindex = index;
  tag_open(syntaxtag::T, to_string(index));
}

/**
 * Insert tag to reset the font index
 */
void builder::font_close() {
  m_fontindex = 1;
  tag_close(syntaxtag::T);
}

/**
 * Insert tag to alter the current background color
 */
void builder::background(string color) {
  if (color.length() == 2 || (color.find('#') == 0 && color.length() == 3)) {
    string bg{background_hex()};
    color = "#" + color.substr(color.length() - 2);
    color += bg.substr(bg.length() - (bg.length() < 6 ? 3 : 6));
  }

  color = color_util::simplify_hex(color);
  m_colors[syntaxtag::B] = color;
  tag_open(syntaxtag::B, color);
}

/**
 * Insert tag to reset the background color
 */
void builder::background_close() {
  m_colors[syntaxtag::B].clear();
  tag_close(syntaxtag::B);
}

/**
 * Insert tag to alter the current foreground color
 */
void builder::color(string color) {
  if (color.length() == 2 || (color[0] == '#' && color.length() == 3)) {
    string fg{foreground_hex()};
    if (!fg.empty()) {
      color = "#" + color.substr(color.length() - 2);
      color += fg.substr(fg.length() - (fg.length() < 6 ? 3 : 6));
    }
  }

  color = color_util::simplify_hex(color);
  m_colors[syntaxtag::F] = color;
  tag_open(syntaxtag::F, color);
}

/**
 * Insert tag to alter the alpha value of the default foreground color
 */
void builder::color_alpha(string alpha) {
  if (alpha.find('#') == string::npos) {
    alpha = "#" + alpha;
  }
  if (alpha.size() == 4) {
    color(alpha);
  } else {
    string val{foreground_hex()};
    if (val.size() < 6 && val.size() > 2) {
      val.append(val.substr(val.size() - 3));
    }
    color((alpha.substr(0, 3) + val.substr(val.size() - 6)).substr(0, 9));
  }
}

/**
 * Insert tag to reset the foreground color
 */
void builder::color_close() {
  m_colors[syntaxtag::F].clear();
  tag_close(syntaxtag::F);
}

/**
 * Insert tag to alter the current overline/underline color
 */
void builder::line_color(const string& color) {
  overline_color(color);
  underline_color(color);
}

/**
 * Close overline/underline color tag
 */
void builder::line_color_close() {
  overline_color_close();
  underline_color_close();
}

/**
 * Insert tag to alter the current overline color
 */
void builder::overline_color(string color) {
  color = color_util::simplify_hex(color);
  m_colors[syntaxtag::o] = color;
  tag_open(syntaxtag::o, color);
  tag_open(attribute::OVERLINE);
}

/**
 * Close underline color tag
 */
void builder::overline_color_close() {
  m_colors[syntaxtag::o].clear();
  tag_close(syntaxtag::o);
}

/**
 * Insert tag to alter the current underline color
 */
void builder::underline_color(string color) {
  color = color_util::simplify_hex(color);
  m_colors[syntaxtag::u] = color;
  tag_open(syntaxtag::u, color);
  tag_open(attribute::UNDERLINE);
}

/**
 * Close underline color tag
 */
void builder::underline_color_close() {
  tag_close(syntaxtag::u);
  m_colors[syntaxtag::u].clear();
}

/**
 * Insert tag to enable the overline attribute
 */
void builder::overline(const string& color) {
  if (!color.empty()) {
    overline_color(color);
  } else {
    tag_open(attribute::OVERLINE);
  }
}

/**
 * Close overline attribute tag
 */
void builder::overline_close() {
  tag_close(attribute::OVERLINE);
}

/**
 * Insert tag to enable the underline attribute
 */
void builder::underline(const string& color) {
  if (!color.empty()) {
    underline_color(color);
  } else {
    tag_open(attribute::UNDERLINE);
  }
}

/**
 * Close underline attribute tag
 */
void builder::underline_close() {
  tag_close(attribute::UNDERLINE);
}

/**
 * Open command tag
 */
void builder::cmd(mousebtn index, string action, bool condition) {
  if (condition && !action.empty()) {
    size_t p{0};
    while ((p = action.find(':', p)) != string::npos && action[p - 1] != '\\') {
      action.insert(p, 1, '\\');
      p++;
    }
    tag_open(syntaxtag::A, to_string(static_cast<int>(index)) + ":" + action + ":");
  }
}

/**
 * Wrap label in command block
 */
void builder::cmd(mousebtn index, string action, const label_t& label) {
  if (label && *label) {
    cmd(index, action, true);
    node(label);
    tag_close(syntaxtag::A);
  }
}

/**
 * Close command tag
 */
void builder::cmd_close(bool condition) {
  if (condition) {
    tag_close(syntaxtag::A);
  }
}

/**
 * Get default background hex string
 */
string builder::background_hex() {
  if (m_background.empty()) {
    m_background = color_util::hex<unsigned short int>(m_bar.background);
  }
  return m_background;
}

/**
 * Get default foreground hex string
 */
string builder::foreground_hex() {
  if (m_foreground.empty()) {
    m_foreground = color_util::hex<unsigned short int>(m_bar.foreground);
  }
  return m_foreground;
}

string builder::get_label_text(const label_t& label) {
  string text{label->get()};

  size_t maxlen = label->m_maxlen;

  if (maxlen > 0 && string_util::char_len(text) > maxlen) {
    if (label->m_ellipsis) {
      text = string_util::utf8_truncate(std::move(text), maxlen - 3) + "...";
    }
    else {
      text = string_util::utf8_truncate(std::move(text), maxlen);
    }
  }

  return text;
}

/**
 * Insert directive to change value of given tag
 */
void builder::tag_open(syntaxtag tag, const string& value) {
  if (m_tags.find(tag) == m_tags.end()) {
    m_tags[tag] = 0;
  }

  m_tags[tag]++;

  switch (tag) {
    case syntaxtag::NONE:
      break;
    case syntaxtag::A:
      append("%{A" + value + "}");
      break;
    case syntaxtag::F:
      append("%{F" + value + "}");
      break;
    case syntaxtag::B:
      append("%{B" + value + "}");
      break;
    case syntaxtag::T:
      append("%{T" + value + "}");
      break;
    case syntaxtag::u:
      append("%{u" + value + "}");
      break;
    case syntaxtag::o:
      append("%{o" + value + "}");
      break;
    case syntaxtag::R:
      append("%{R}");
      break;
    case syntaxtag::O:
      append("%{O" + value + "}");
      break;
  }
}

/**
 * Insert directive to use given attribute unless already set
 */
void builder::tag_open(attribute attr) {
  if ((m_attributes >> static_cast<int>(attr)) & 1) {
    return;
  }

  m_attributes |= 1 << static_cast<int>(attr);

  switch (attr) {
    case attribute::NONE:
      break;
    case attribute::UNDERLINE:
      append("%{+u}");
      break;
    case attribute::OVERLINE:
      append("%{+o}");
      break;
  }
}

/**
 * Insert directive to reset given tag if it's open and closable
 */
void builder::tag_close(syntaxtag tag) {
  if (m_tags.find(tag) == m_tags.end() || !m_tags[tag]) {
    return;
  }

  m_tags[tag]--;

  switch (tag) {
    case syntaxtag::NONE:
      break;
    case syntaxtag::A:
      append("%{A}");
      break;
    case syntaxtag::F:
      append("%{F-}");
      break;
    case syntaxtag::B:
      append("%{B-}");
      break;
    case syntaxtag::T:
      append("%{T-}");
      break;
    case syntaxtag::u:
      append("%{u-}");
      break;
    case syntaxtag::o:
      append("%{o-}");
      break;
    case syntaxtag::R:
      break;
    case syntaxtag::O:
      break;
  }
}

/**
 * Insert directive to remove given attribute if set
 */
void builder::tag_close(attribute attr) {
  if (!((m_attributes >> static_cast<int>(attr)) & 1)) {
    return;
  }

  m_attributes &= ~(1 << static_cast<int>(attr));

  switch (attr) {
    case attribute::NONE:
      break;
    case attribute::UNDERLINE:
      append("%{-u}");
      break;
    case attribute::OVERLINE:
      append("%{-o}");
      break;
  }
}

POLYBAR_NS_END
