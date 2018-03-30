# MooColor API

## Base

### Constructor

- Syntax

  ``` js
  const color = new MooColor(str = '');
  ```

- Param `string` str - [parsable color string](#parsable-color-string). If not specify this value, then color set to `#000` (black).
- Return `MooColor` - Instance of `MooColor`

### Parsable color string

``` js
'red'                           // named color.
'#ff0000'                       // Hex (full)
'#ff000080'                     // Hex (full with alpha)
'#f00'                          // Hex (shorthand)
'#f008'                         // Hex (shorthand with alpha)
'rgb(255, 0, 0)'                // rgb
'rgba(255, 0, 0, 0.5)'          // rgba
'rgb(100%, 0%, 0%)'             // rgb (percent)
'rgba(100%, 0%, 0%, 0.5)'       // rgba (percent)
'hsl(0, 100%, 50%)'             // hsl
'hsla(0, 100%, 50%, 0.5)'       // hsla
'hwb(0, 0%, 0%)'                // hwb
'hwb(0, 0%, 0%, 0.5)'           // hwb with alpha
'hsv(0, 100%, 100%)'            // hsv
'hsv(0, 100%, 100%, 0.5)'       // hsv with alpha
'cmyk(0%, 100%, 100%, 0%)'      // cmyk
'cmyk(0%, 100%, 100%, 0%, 0.5)' // cmyk with alpha
```

## [Setter](setter.md)

- [setColor](setter.md#setcolor): Set color data.
- [getColor](setter.md#getcolor): Get color data.
- [getColorAs](setter.md#getcoloras): Get color data as specific color model.
- [getModel](setter.md#getmodel): Get color model name.
- [changeModel](setter.md#changemodel): Converts color data to given color model.
- [getAlpha](setter.md#getalpha): Get alpha value from `Color`.
- [setAlpha](setter.md#setalpha): Set alpha value to `Color`.

## [Formatter](formatter.md)

- [toString](formatter.md#tostring): Represents color as notation of specific color model.
- [toHex](formatter.md#tohex): Represents color as HEX notation.
- [toRgb](formatter.md#torgb): Represents color as RGB notation.
- [toHwb](formatter.md#tohwb): Represents color as HWB notation.
- [toHsl](formatter.md#tohsl): Represents color as HSL notation.
- [toHsv](formatter.md#tohsv): Represents color as HSV notation. This format is similar to HSL.
- [toCmyk](formatter.md#tocmyk): Represents color as CMYK notation.

## [State access](state-access.md)

- [brightness](state-access.md#brightness): `readonly` Returns color brightness from 0 to 255.
- [isLight](state-access.md#islight): `readonly` Returns whether color is light or not.
- [isDark](state-access.md#isdark): `readonly` Returns whether color is dark or not.
- [luminance](state-access.md#luminance): `readonly` Returns luminance value of the color. range from 0 to 1.
- [contrastRatioWith](state-access.md#contrastratiowith): Returns contrast ratio with other color. range from 0 to 21.
- [isContrastEnough](state-access.md#iscontrastenough): Return true if contrast ratio >= 4.5

## [Modifier](modifier.md)

- [lighten](modifier.md#lighten): Increase lightness.
- [darken](modifier.md#darken): Decrease darkness.
- [saturate](modifier.md#saturate): Increase saturation.
- [desaturate](modifier.md#desaturate): Decrease saturation.
- [grayscale](modifier.md#grayscale): Sets saturation value to 0.
- [whiten](modifier.md#whiten): Modify whiteness.
- [blacken](modifier.md#blacken): Modify blackness.
- [rotate](modifier.md#rotate): Rotate hue value.
- [mix](modifier.md#mix): Mix two colors.
- [complement](modifier.md#complement): Sets color to the complement of a color.
- [invert](modifier.md#invert): Sets color to the inverse (negative) of a color.
- [random](modifier.md#random): Sets random color values as HWB color model.
