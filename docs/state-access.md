# State access

## Readonly

### brightness

W3C AERT perceived brightness. Based on RGB channel weighting.

> [Color contrast — W3C AERT](https://www.w3.org/TR/AERT/#color-contrast)

Syntax

```ts
mooColor.brightness: number;
```

- @returns `number` — 0 (darkest) to 255 (brightest).

### isLight

`true` when `brightness >= 128`.

Syntax

```ts
mooColor.isLight: boolean;
```

### isDark

`true` when `brightness < 128`.

Syntax

```ts
mooColor.isDark: boolean;
```

### luminance

WCAG 2.1 relative luminance.

Each RGB channel is first linearized by removing the sRGB transfer function (gamma decoding), then weighted:

$$L = 0.2126 \cdot R_{lin} + 0.7152 \cdot G_{lin} + 0.0722 \cdot B_{lin}$$

where $R_{lin} = \left(\frac{R_{sRGB} + 0.055}{1.055}\right)^{2.4}$ for $R_{sRGB} > 0.04045$.

> [Relative luminance — WCAG 2.1](https://www.w3.org/TR/WCAG21/#dfn-relative-luminance)

Syntax

```ts
mooColor.luminance: number;
```

- @returns `number` — 0 (black) to 1 (white).

> **v2 change** — v1 used the raw 8-bit value divided by 255. v2 applies the full sRGB linearization
> specified by WCAG 2.1. The difference is most visible at mid-tones
> (`#808080`: v1 ≈ 0.502, v2 ≈ 0.216).

## Methods

### contrastRatioWith

WCAG 2.1 contrast ratio between this color and another.

> [Contrast (minimum) — WCAG 2.1](https://www.w3.org/TR/WCAG21/#contrast-minimum)

Syntax

```ts
mooColor.contrastRatioWith(color: MooColor): number;
```

- @param `MooColor` color — the color to compare against.
- @returns `number` — ratio from 1 (no contrast) to 21 (maximum contrast).

Examples

```js
const white = new MooColor('#fff');
const black = new MooColor('#000');
white.contrastRatioWith(black); // 21
```

### isContrastEnough

`true` when the contrast ratio between this color and `color` meets WCAG AA (≥ 4.5 : 1).

> [Contrast (minimum) — WCAG 2.1](https://www.w3.org/TR/WCAG21/#contrast-minimum)

Syntax

```ts
mooColor.isContrastEnough(color: MooColor): boolean;
```

- @param `MooColor` color — the color to compare against.
- @returns `boolean`

Examples

```js
const bg   = new MooColor('#fff');
const text = new MooColor('#767676');
bg.isContrastEnough(text);  // true  (ratio ≈ 4.54)

const text2 = new MooColor('#999');
bg.isContrastEnough(text2); // false (ratio ≈ 2.85)
```

