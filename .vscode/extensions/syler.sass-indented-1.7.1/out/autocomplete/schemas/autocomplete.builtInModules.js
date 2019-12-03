"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const autocomplete_utility_1 = require("../autocomplete.utility");
const vscode_1 = require("vscode");
const modules = {
    MATH: [
        {
            name: 'percentage()',
            body: 'percentage($1)',
            desc: 'percentage($number) - Converts a unitless number to a percentage.'
        },
        {
            name: 'round()',
            body: 'round($1)',
            desc: 'round($number) - Rounds a number to the nearest whole number.'
        },
        {
            name: 'ceil()',
            body: 'ceil($1)',
            desc: 'ceil($number) - Rounds a number up to the next whole number.'
        },
        {
            name: 'calc()',
            body: 'calc( $1 ${2|-,+,*,/|} $3 )',
            desc: 'calc(...$numbers) lets you perform calculations when specifying CSS property values'
        },
        {
            name: 'floor()',
            body: 'floor($1)',
            desc: 'floor($number) - Rounds a number down to the next whole number.'
        },
        {
            name: 'abs()',
            body: 'abs($1)',
            desc: 'abs($number) - Returns the absolute value of a number.'
        },
        {
            name: 'min()',
            body: 'min($1...)',
            desc: 'min($numbers...) - Finds the minimum of several numbers.'
        },
        {
            name: 'max()',
            body: 'max($1...)',
            desc: 'max($numbers...) - Finds the maximum of several numbers.'
        },
        {
            name: 'random()',
            body: 'random($1)',
            desc: 'random([$limit]) - Returns a random number.'
        },
        {
            name: 'compatible()',
            body: 'compatible($1, $2)',
            desc: 'comparable($number1, $number2) - Returns whether $number1 and $number2 have compatible units. If this returns true, $number1 and $number2 can safely be added, subtracted, and compared. Otherwise, doing so will produce errors.'
        },
        {
            name: 'unit()',
            body: 'unit($1)',
            desc: "unit($number) - Returns a string representation of $number's units. \n\nNote: This function is intended for debugging; its output format is not guaranteed to be consistent across Sass versions or implementations."
        },
        {
            name: 'is-unitless()',
            body: 'is-unitless($1)',
            desc: 'is-unitless($number) - Returns whether $number has no units.'
        }
    ],
    COLOR: [
        {
            name: 'adjust()',
            body: 'adjust($1)',
            desc: `adjust($color) - Increases or decreases one or more properties of $color by fixed amounts.

Adds the value passed for each keyword argument to the corresponding property of the color, and returns the adjusted color. It’s an error to specify an RGB property ($red, $green, and/or $blue) at the same time as an HSL property ($hue, $saturation, and/or $lightness).

All optional arguments must be numbers. The $red, $green, and $blue arguments must be unitless and between -255 and 255 (inclusive). The $hue argument must have either the unit deg or no unit. The $saturation and $lightness arguments must be between -100% and 100% (inclusive), and may be unitless. The $alpha argument must be unitless and between -1 and 1 (inclusive).`
        },
        {
            name: 'alpha()',
            body: 'alpha($1)',
            desc: 'alpha($color) - Returns the alpha channel of $color as a number between 0 and 1. As a special case, this supports the Internet Explorer syntax alpha(opacity=20), for which it returns an unquoted string.'
        },
        {
            name: 'blue()',
            body: 'blue($1)',
            desc: 'blue($color) - Returns the blue channel of $color as a number between 0 and 255.'
        },
        {
            name: 'change()',
            body: 'change($1)',
            desc: `change($color) - Sets one or more properties of a color to new values.

Uses the value passed for each keyword argument in place of the corresponding property of the color, and returns the changed color. It’s an error to specify an RGB property ($red, $green, and/or $blue) at the same time as an HSL property ($hue, $saturation, and/or $lightness).

All optional arguments must be numbers. The $red, $green, and $blue arguments must be unitless and between 0 and 255 (inclusive). The $hue argument must have either the unit deg or no unit. The $saturation and $lightness arguments must be between 0% and 100% (inclusive), and may be unitless. The $alpha argument must be unitless and between -1 and 1 (inclusive).`
        },
        {
            name: 'complement()',
            body: 'complement($1)',
            desc: 'complement($color) - Returns the complement of a color. Returns the RGB complement of $color.'
        },
        {
            name: 'darken()',
            body: 'darken($1, $2)',
            desc: `darken($color, $amount) - Makes $color darker. 

Note: The darken() function decreases lightness by a fixed amount, which is often not the desired effect. To make a color a certain percentage darker than it was before, use color.scale() instead.

Because darken() is usually not the best way to make a color darker, it’s not included directly in the new module system. However, if you have to preserve the existing behavior, darken($color, $amount) can be written color.adjust($color, $lightness: -$amount).`
        },
        {
            name: 'desaturate()',
            body: 'desaturate($1, $2)',
            desc: `desaturate($color, $amount) - Makes $color less saturated.

Note: The desaturate() function decreases saturation by a fixed amount, which is often not the desired effect. To make a color a certain percentage less saturated than it was before, use color.scale() instead.

Because desaturate() is usually not the best way to make a color less saturated, it’s not included directly in the new module system. However, if you have to preserve the existing behavior, desaturate($color, $amount) can be written color.adjust($color, $saturation: -$amount).`
        },
        {
            name: 'greyscale()',
            body: 'greyscale($1)',
            desc: 'greyscale($color) - Converts a color to grayscale.'
        },
        {
            name: 'green()',
            body: 'green($1)',
            desc: 'green($color) - Returns the green channel of $color as a number between 0 and 255.'
        },
        {
            name: 'hue()',
            body: 'hue($1, $2, $3)$0',
            desc: 'hue($color) - Returns the hue of $color as a number between 0deg and 255deg.'
        },
        {
            name: 'ie-hex-str()',
            body: 'ie-hex-str($1)',
            desc: 'ie-hex-str($color) - Returns an unquoted string that represents $color in the #AARRGGBB format expected by Internet Explorer’s -ms-filter property.'
        },
        {
            name: 'invert()',
            body: 'invert($1)',
            desc: 'invert($color) - Returns the inverse of a color.'
        },
        {
            name: 'lighten()',
            body: 'lighten($1, $2)',
            desc: `lighten($color, $amount) - Makes $color lighter.

Note: The lighten() function increases lightness by a fixed amount, which is often not the desired effect. To make a color a certain percentage lighter than it was before, use scale() instead.

Because lighten() is usually not the best way to make a color lighter, it’s not included directly in the new module system. However, if you have to preserve the existing behavior, lighten($color, $amount) can be written adjust($color, $lightness: $amount).`
        },
        {
            name: 'lightness()',
            body: 'lightness($1)',
            desc: 'lightness($color) - Returns the HSL lightness of $color as a number between 0% and 100%.'
        },
        {
            name: 'mix()',
            body: 'mix($1, $2)',
            desc: `mix($color1, $color2, $weight: 50%) - Returns a number that’s a mixture of $color1 and $color2.

Both the $weight and the relative opacity of each color determines how much of each color is in the result. The $weight must be a number between 0% and 100% (inclusive). A larger weight indicates that more of $color1 should be used, and a smaller weight indicates that more of $color2 should be used.`
        },
        {
            name: 'red()',
            body: 'red($1)',
            desc: 'red($color) - Returns the red channel of $color as a number between 0 and 255.'
        },
        {
            name: 'saturation()',
            body: 'saturation($1)',
            desc: 'saturation($color) - Returns the HSL saturation of $color as a number between 0% and 100%.'
        },
        {
            name: 'scale()',
            body: 'scale($1, $2)',
            desc: `scale($color, ...) - Fluidly scales one or more properties of $color.

Each keyword argument must be a number between -100% and 100% (inclusive). This indicates how far the corresponding property should be moved from its original position towards the maximum (if the argument is positive) or the minimum (if the argument is negative). This means that, for example, $lightness: 50% will make all colors 50% closer to maximum lightness without making them fully white.

It’s an error to specify an RGB property ($red, $green, and/or $blue) at the same time as an HSL property ($saturation, and/or $lightness).`
        }
    ],
    STRING: [
        {
            name: 'quote()',
            body: 'quote($1)',
            desc: 'quote($string) - Returns $string as a quoted string.'
        },
        {
            name: 'index()',
            body: 'index($1, $2)',
            desc: 'index($string, $substring) - Returns the first index of $substring in $string, or null if $string doesn’t contain $substring.'
        },
        {
            name: 'insert()',
            body: 'insert($1, $2, $3)',
            desc: 'insert($string, $insert, $index) - Returns a copy of $string with $insert inserted at $index.'
        },
        {
            name: 'length()',
            body: 'length($1)',
            desc: 'length($string) - Returns the number of characters in $string.'
        },
        {
            name: 'slice()',
            body: 'slice($1, $2)',
            desc: 'slice($string, $start-at, $end-at: -1) - Returns the slice of $string starting at index $start-at and ending at index $end-at (both inclusive).'
        },
        {
            name: 'to-upper-case()',
            body: 'to-upper-case($1)',
            desc: 'to-upper-case($string) - Returns a copy of $string with the ASCII letters converted to upper case.'
        },
        {
            name: 'to-lower-case()',
            body: 'to-lower-case($1)',
            desc: 'to-lower-case($string) - Returns a copy of $string with the ASCII letters converted to lower case.'
        },
        {
            name: 'unique-id()',
            body: 'unique-id()',
            desc: 'unique-id() - Returns a randomly-generated unquoted string that’s guaranteed to be a valid CSS identifier and to be unique within the current Sass compilation.'
        },
        {
            name: 'unquote()',
            body: 'unquote($1)',
            desc: 'unquote($string) - Returns $string as an unquoted string. This can produce strings that aren’t valid CSS, so use with caution.'
        }
    ],
    LIST: [
        {
            name: 'append()',
            body: 'append($1, $2)',
            desc: `append($list, $val, $separator: auto) - Returns a copy of $list with $val added to the end.

If $separator is comma, the returned list is comma-separated. If it’s space, the returned list is space-separated. If it’s auto (the default), the returned list will use the same separator as $list (or space if $list doesn’t have a separator). Other values aren’t allowed.

Note: that unlike list.join(), if $val is a list it’s nested within the returned list rather than having all its elements added to the returned list.`
        },
        {
            name: 'index()',
            body: 'index($1, $2)',
            desc: `index($list, $value) - Returns the index of $value in $list.

If $value doesn’t appear in $list, this returns null. If $value appears multiple times in $list, this returns the index of its first appearance.`
        },
        {
            name: 'is-bracketed()',
            body: 'is-bracketed()',
            desc: 'is-bracketed() - Returns whether $list has square brackets.'
        },
        {
            name: 'join()',
            body: 'join($1, $2)',
            desc: `join($list1, $list2, $separator: auto, $bracketed: auto) - Returns a new list containing the elements of $list1 followed by the elements of $list2.

Note: Because individual values count as single-element lists, it’s possible to use list.join() to add a value to the end of a list. However, this is not recommended, since if that value is a list it will be concatenated, which is probably not what you’re expecting.

Use list.append() instead to add a single value to a list. Only use list.join() to combine two lists together into one`
        },
        {
            name: 'length()',
            body: 'length($1)',
            desc: 'length($list) -Returns the length of $list. This can also return the number of pairs in a map.'
        },
        {
            name: 'separator()',
            body: 'separator($1)',
            desc: 'separator($list) - Returns the name of the separator used by $list, either space or comma. If $list doesn’t have a separator, returns space.'
        },
        {
            name: 'nth()',
            body: 'nth($1, $2)',
            desc: 'nth($list, $n) - Returns the element of $list at index $n. If $n is negative, it counts from the end of $list. Throws an error if there is no element at index $n.'
        },
        {
            name: 'set-nth()',
            body: 'set-nth($1, $2, $3)',
            desc: 'set-nth($list, $n, $value) - Returns a copy of $list with the element at index $n replaced with $value. If $n is negative, it counts from the end of $list. Throws an error if there is no existing element at index $n.'
        },
        {
            name: 'zip()',
            body: 'zip($1)',
            desc: `zip($lists...) - Combines every list in $lists into a single list of sub-lists.

Each element in the returned list contains all the elements at that position in $lists. The returned list is as long as the shortest list in $lists.

The returned list is always comma-separated and the sub-lists are always space-separated.`
        }
    ],
    MAP: [
        {
            name: 'get()',
            body: 'get($1, $2)',
            desc: 'get($map, $key) - Returns the value in $map associated with $key. If $map doesn’t have a value associated with $key, returns null.'
        },
        {
            name: 'has-key()',
            body: 'has-key($1, $2)',
            desc: 'has-key($map, $key) - Returns whether $map contains a value associated with $key.'
        },
        {
            name: 'keys()',
            body: 'keys($1)',
            desc: 'keys($map) - Returns a comma-separated list of all the keys in $map.'
        },
        {
            name: 'merge()',
            body: 'merge($1, $2)',
            desc: `merge($map1, $map2) - Returns a new map with all the keys and values from both $map1 and $map2.

This can also be used to add a new value or overwrite a value in $map1, by passing a single key/value pair as $map2.

If both $map1 and $map2 have the same key, $map2’s value takes precedence.

All keys in the returned map that also appear in $map1 have the same order as in $map1. New keys from $map2 appear at the end of the map.`
        },
        {
            name: 'remove()',
            body: 'remove($1, $2)',
            desc: 'remove($map, $keys...) - Returns a copy of $map without any values associated with $keys. If a key in $keys doesn’t have an associated value in $map, it’s ignored.'
        },
        {
            name: 'values()',
            body: 'values($1)',
            desc: 'values($map) - Returns a comma-separated list of all the values in $map.'
        }
    ],
    SELECTOR: [
        {
            name: 'is-superselector()',
            body: 'is-superselector($1, $2)',
            desc: `is-superselector($super, $sub) - Returns whether the selector $super matches all the elements that the selector $sub matches. 

Still returns true even if $super matches more elements than $sub.

The $super and $sub selectors may contain placeholder selectors, but not parent selectors.`
        },
        {
            name: 'append()',
            body: 'append($1)',
            desc: `append($selectors...) - Combines $selectors without descendant combinators—that is, without whitespace between them.

If any selector in $selectors is a selector list, each complex selector is combined separately.

The $selectors may contain placeholder selectors, but not parent selectors.

See also selector.nest().`
        },
        {
            name: 'extend()',
            body: 'extend($1, $2, $3)',
            desc: `extend($selector, $extendee, $extender) - Extends $selector as with the @extend rule.

Returns a copy of $selector modified with the following @extend rule:

#{$extender
  @extend #{$extendee};

In other words, replaces all instances of $extendee in $selector with $extendee, $extender. If $selector doesn’t contain $extendee, returns it as-is.

The $selector, $extendee, and $extender selectors may contain placeholder selectors, but not parent selectors.`
        },
        {
            name: 'nest()',
            body: 'nest($1)',
            desc: `nest($selectors...) - Combines $selectors as though they were nested within one another in the stylesheet.

The $selectors may contain placeholder selectors. Unlike other selector functions, all of them except the first may also contain parent selectors.`
        },
        {
            name: 'parse()',
            body: 'parse($1)',
            desc: `parse($selector) - Returns $selector in the selector value format.`
        },
        {
            name: 'replace()',
            body: 'replace($1, $2, $3)',
            desc: `replace($selector, $original, $replacement) - Returns a copy of $selector with all instances of $original replaced by $replacement.

This uses the @extend rule’s intelligent unification to make sure $replacement is seamlessly integrated into $selector. If $selector doesn’t contain $original, returns it as-is.

The $selector, $original, and $replacement selectors may contain placeholder selectors, but not parent selectors. `
        },
        {
            name: 'unify()',
            body: 'unify($1, $2)',
            desc: `unify($selector1, $selector2) - Returns a selector that matches only elements matched by both $selector1 and $selector2.

Returns null if $selector1 and $selector2 don’t match any of the same elements, or if there’s no selector that can express their overlap.

Like selectors generated by the @extend rule, the returned selector isn’t guaranteed to match all the elements matched by both $selector1 and $selector2 if they’re both complex selectors.`
        },
        {
            name: 'simple-selectors()',
            body: 'simple-selectors($1)',
            desc: `simple-selectors($selector) - Returns a list of simple selectors in $selector.

The $selector must be a single string that contains a compound selector. This means it may not contains combinators (including spaces) or commas.

The returned list is comma-separated, and the simple selectors are unquoted strings.`
        }
    ],
    META: []
};
function getSassModule(type, namespace) {
    return modules[type].map(item => {
        const completionItem = new vscode_1.CompletionItem(autocomplete_utility_1.AutocompleteUtilities.mergeNamespace(item.name, namespace));
        completionItem.insertText = new vscode_1.SnippetString(autocomplete_utility_1.AutocompleteUtilities.mergeNamespace(item.body, namespace));
        completionItem.detail = item.desc;
        completionItem.kind = vscode_1.CompletionItemKind.Function;
        return completionItem;
    });
}
exports.getSassModule = getSassModule;
//# sourceMappingURL=autocomplete.builtInModules.js.map