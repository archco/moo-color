# MooColor

[![Node.js CI](https://github.com/archco/moo-color/actions/workflows/node.js.yml/badge.svg)](https://github.com/archco/moo-color/actions/workflows/node.js.yml)
[![npm version](https://badge.fury.io/js/moo-color.svg)](https://www.npmjs.com/package/moo-color)
[![Downloads](https://img.shields.io/npm/dm/moo-color.svg)](https://www.npmjs.com/package/moo-color)

A modern TypeScript library for color parsing, conversion, and manipulation.

- **Immutable** — every manipulation method returns a new instance; the original is never mutated.
- **WCAG 2.1 compliant** — `luminance` and `contrastRatio` use the correct sRGB linearization.
- **Dual build** — ships ESM, CJS, and IIFE bundles out of the box.
- **Fully typed** — ships its own `.d.ts` including Template Literal Types for color strings.

## Install

```sh
npm install moo-color
```

## Usage

### ESM / TypeScript

```ts
import { MooColor } from 'moo-color';

const red = new MooColor('#ff0000');

// Manipulation returns a NEW instance — original is untouched
const light = red.lighten(20);
console.log(red.toHex());    // '#ff0000'
console.log(light.toHex());  // '#ff6666'

// Method chaining
new MooColor('hsl(0, 100%, 50%)')
  .rotate(120)
  .saturate(10)
  .toHex('short'); // '#00ff22' (approximately)
```

### CommonJS

```js
const { MooColor } = require('moo-color');

const color = new MooColor('rgb(255, 128, 0)');
console.log(color.toHsl()); // 'hsl(30, 100%, 50%)'
```

### Browser (IIFE via `<script>`)

```html
<script src="https://unpkg.com/moo-color/dist/moo-color.global.js"></script>
<script>
  const color = new MooColor('hsl(200, 80%, 50%)');
  console.log(color.toHex()); // '#1aa3e8'
</script>
```

## Quick Examples

```ts
// Parsing — accepts hex, rgb, hsl, hwb, hsv, cmyk, named colors, transparent
new MooColor('#f00');
new MooColor('rgba(255, 0, 0, 0.5)');
new MooColor('hsl(0, 100%, 50%)');
new MooColor('red');

// Formatting
const c = new MooColor('red');
c.toHex();          // '#ff0000'
c.toHex('short');   // '#f00'
c.toHex('name');    // 'red'
c.toRgb();          // 'rgb(255, 0, 0)'
c.toHsl();          // 'hsl(0, 100%, 50%)'
c.toHwb();          // 'hwb(0, 0%, 0%)'

// WCAG 2.1 contrast
const white = new MooColor('#fff');
const black = new MooColor('#000');
black.contrastRatioWith(white);   // 21
black.isContrastEnough(white);    // true (≥ 4.5)

// Random color
const rand = MooColor.random({ hue: [0, 60], white: 20 });
```

## API

Please see [MooColor API](https://github.com/archco/moo-color/tree/master/docs#moocolor-api).

## Change Log

[CHANGELOG.md](https://github.com/archco/moo-color/blob/master/CHANGELOG.md)

## License

[MIT License](https://github.com/archco/moo-color/blob/master/LICENSE)
