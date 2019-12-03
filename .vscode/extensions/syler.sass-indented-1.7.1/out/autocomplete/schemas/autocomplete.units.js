"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sassSchemaUnits = [
    {
        name: 's',
        body: 's',
        desc: 'Time unit (seconds)'
    },
    {
        name: 'ms',
        body: 'ms',
        desc: 'Time unit (miliseconds)'
    },
    // descriptions are from https://www.tutorialspoint.com/css/css_measurement_units.htm
    {
        name: '%',
        body: '%',
        desc: 'Defines a measurement as a percentage relative to another value, typically an enclosing element.'
    },
    {
        name: 'cm',
        body: 'cm',
        desc: 'Defines a measurement in centimeters.'
    },
    {
        name: 'em',
        body: 'em',
        desc: 'A relative measurement for the height of a font in em spaces. Because an em unit is equivalent to the size of a given font, if you assign a font to 12pt, each "em" unit would be 12pt; thus, 2em would be 24pt.'
    },
    {
        name: 'ex',
        body: 'ex',
        desc: "This value defines a measurement relative to a font's x-height. The x-height is determined by the height of the font's lowercase letter x."
    },
    {
        name: 'in',
        body: 'in',
        desc: 'Defines a measurement in inches.'
    },
    {
        name: 'mm',
        body: 'mm',
        desc: 'Defines a measurement in millimeters.'
    },
    {
        name: 'pc',
        body: 'pc',
        desc: '	Defines a measurement in picas. A pica is equivalent to 12 points; thus, there are 6 picas per inch.'
    },
    {
        name: 'pt',
        body: 'pt',
        desc: 'Defines a measurement in points. A point is defined as 1/72nd of an inch.'
    },
    {
        name: 'px',
        body: 'px',
        desc: 'Defines a measurement in screen pixels.'
    },
    // descriptions from : https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Values_and_Units
    {
        name: 'ch',
        body: 'ch',
        desc: 'Average character advance of a narrow glyph in the element’s font, as represented by the “0” (ZERO, U+0030) glyph.'
    },
    /*
      name: '$ic',
      body: 'ic',
      desc: 'Average character advance of a full width glyph in the element’s font, as represented by the “水” (CJK water ideograph, U+6C34) glyph.'
    },
    {
      name: '$cap',
      body: 'cap',
      desc: '	Cap height (the nominal height of capital letters) of the element\'s font.'
    },
    {
      name: '$lh',
      body: 'lh',
      desc: '	Line height of the element.'
    },
    {
      name: '$rlh',
      body: 'rlh',
      desc: '	Line height of the root element.'
    }, */
    // descriptions from : https://www.w3schools.com/cssref/css_units.asp
    {
        name: 'rem',
        body: 'rem',
        desc: 'Relative to font-size of the root element'
    },
    {
        name: 'vw',
        body: 'vw',
        desc: '1% of the width of the viewport, Viewport = the browser window size. If the viewport is 50cm wide, 1vw = 0.5cm.'
    },
    {
        name: 'vh',
        body: 'vh',
        desc: '1% of the height of the viewport, Viewport = the browser window size. If the viewport is 50cm wide, 1vw = 0.5cm.'
    },
    {
        name: 'vmin',
        body: 'vmin',
        desc: "	1% of viewport's smaller dimension Viewport = the browser window size. If the viewport is 50cm wide, 1vw = 0.5cm."
    },
    {
        name: 'vmax',
        body: 'vmax',
        desc: "	1% of viewport's larger dimension Viewport = the browser window size. If the viewport is 50cm wide, 1vw = 0.5cm."
    },
    // descriptions from : https://alligator.io/css/css-grid-layout-fr-unit/
    {
        name: 'fr',
        body: 'fr',
        desc: 'Fractional unit, 1fr is for 1 part of the available space'
    }
];
exports.default = sassSchemaUnits;
//# sourceMappingURL=autocomplete.units.js.map