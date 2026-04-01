# MooColor API

### Table of contents

- [Basic](#basic)
  - [Constructor](#constructor)
  - [Parsable color string](#parsable-color-string)
  - [Color types](#color-types)
- [Static](#static)
- [Data access](#data-access)
- [Formatter](#formatter)
- [State access](#state-access)
- [Modification](#modification)

> **v2 Breaking change — Immutability**
>
> All manipulation methods (`lighten`, `darken`, `rotate`, …) now return a **new `MooColor` instance**
> instead of mutating the original. Chain calls are still supported, but the original is never changed.

## Basic

### Constructor

```ts
const color = new MooColor(color?: ColorInput | ColorData);
```

- `color` — any [parsable color string](#parsable-color-string), a [`ColorData`](#color-types) object, or `undefined` (defaults to `#000`).
- Throws `Error` when the string cannot be parsed.

```ts
new MooColor('#ff0000');
new MooColor('rgba(255, 0, 0, 0.5)');
new MooColor('hsl(0, 100%, 50%)');
new MooColor({ model: 'rgb', values: [255, 0, 0], alpha: 1 });
new MooColor(); // black
```

### Parsable color string

```ts
'red'                           // named color
'transparent'                   // transparent
'#ff0000'                       // hex (full)
'#ff000080'                     // hex (full + alpha)
'#f00'                          // hex (shorthand)
'#f008'                         // hex (shorthand + alpha)
'rgb(255, 0, 0)'                // rgb
'rgba(255, 0, 0, 0.5)'          // rgba
'rgb(100%, 0%, 0%)'             // rgb percent
'rgba(100%, 0%, 0%, 0.5)'       // rgba percent
'hsl(0, 100%, 50%)'             // hsl
'hsla(0, 100%, 50%, 0.5)'       // hsla
'hwb(0, 0%, 0%)'                // hwb
'hwb(0, 0%, 0%, 0.5)'           // hwb + alpha
'hsv(0, 100%, 100%)'            // hsv
'hsv(0, 100%, 100%, 0.5)'       // hsv + alpha
'cmyk(0%, 100%, 100%, 0%)'      // cmyk
'cmyk(0%, 100%, 100%, 0%, 0.5)' // cmyk + alpha
```

### Color types

```ts
/** Accepted color model identifiers. */
type AcceptedModel = 'rgb' | 'hwb' | 'hsl' | 'hsv' | 'cmyk';

/** Color output mode for toHex(). */
type HexMode = 'full' | 'short' | 'name';

/** Color output mode for toRgb(). */
type RgbMode = 'default' | 'percent';

/** A plain data object carrying internal color state. */
interface ColorData {
  readonly model: AcceptedModel;
  values: number[];  // e.g. rgb → [255, 0, 0], cmyk → [0, 100, 100, 0]
  alpha?: number;    // 0 (transparent) – 1 (opaque)
}

/** Template Literal Types for static color string validation. */
type HexColorString  = `#${string}`;
type RgbColorString  = `rgb(${string})` | `rgba(${string})`;
type HslColorString  = `hsl(${string})` | `hsla(${string})`;
type HwbColorString  = `hwb(${string})`;
type HsvColorString  = `hsv(${string})` | `hsva(${string})`;
type CmykColorString = `cmyk(${string})`;

/** All recognized color string formats. */
type ColorString = HexColorString | RgbColorString | HslColorString
                 | HwbColorString | HsvColorString | CmykColorString;

/** Valid constructor input: any typed format or any other string (e.g. named colors). */
type ColorInput = ColorString | (string & {});
```

## [Static](static.md)

- [mix](static.md#mix) — blend two colors.
- [random](static.md#random) — generate a random HWB color.

## [Data access](data-access.md)

- [getColor](data-access.md#getcolor) — return a copy of the internal color data.
- [getColorAs](data-access.md#getcoloras) — return color data converted to a target model.
- [getModel](data-access.md#getmodel) — return the current model identifier.
- [changeModel](data-access.md#changemodel) — return a new instance in a different model.
- [getAlpha](data-access.md#getalpha) — return the alpha channel value.
- [setAlpha](data-access.md#setalpha) — return a new instance with the given alpha.
- [convert](data-access.md#convert) — convert a standalone `ColorData` object.
- [clone](data-access.md#clone) — return an independent copy.

## [Formatter](formatter.md)

- [toString](formatter.md#tostring) — format in any model's notation.
- [toHex](formatter.md#tohex) — `#rrggbb` / `#rrggbbaa` notation.
- [toRgb](formatter.md#torgb) — `rgb()` / `rgba()` notation.
- [toHwb](formatter.md#tohwb) — `hwb()` notation.
- [toHsl](formatter.md#tohsl) — `hsl()` / `hsla()` notation.
- [toHsv](formatter.md#tohsv) — `hsv()` / `hsva()` notation.
- [toCmyk](formatter.md#tocmyk) — `cmyk()` notation.

## [State access](state-access.md)

- [brightness](state-access.md#brightness) `readonly` — W3C AERT brightness (0–255).
- [isLight](state-access.md#islight) `readonly` — `true` when brightness ≥ 128.
- [isDark](state-access.md#isdark) `readonly` — `true` when brightness < 128.
- [luminance](state-access.md#luminance) `readonly` — WCAG 2.1 relative luminance (0–1).
- [contrastRatioWith](state-access.md#contrastRatiowith) — WCAG 2.1 contrast ratio (1–21).
- [isContrastEnough](state-access.md#iscontrastenough) — `true` when ratio ≥ 4.5 (WCAG AA).

## [Modification](modification.md)

> All methods return a **new `MooColor`** instance.

- [lighten](modification.md#lighten) — increase lightness.
- [darken](modification.md#darken) — decrease lightness.
- [saturate](modification.md#saturate) — increase saturation.
- [desaturate](modification.md#desaturate) — decrease saturation.
- [grayscale](modification.md#grayscale) — set saturation to 0.
- [whiten](modification.md#whiten) — increase whiteness.
- [blacken](modification.md#blacken) — increase blackness.
- [rotate](modification.md#rotate) — rotate hue by degrees.
- [mix](modification.md#mix) — blend with another color.
- [complement](modification.md#complement) — complementary color (hue + 180°).
- [invert](modification.md#invert) — invert RGB channels.
