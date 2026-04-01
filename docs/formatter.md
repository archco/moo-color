# Formatter

## Declarations

### HexMode

```ts
/**
 * Output mode for `toHex()`.
 * - `'full'`  → `'#ff0000'`
 * - `'short'` → `'#f00'`
 * - `'name'`  → `'red'`
 */
type HexMode = 'full' | 'short' | 'name';
```

### RgbMode

```ts
/**
 * Output mode for `toRgb()`.
 * - `'default'` → `'rgb(255, 0, 0)'`
 * - `'percent'` → `'rgb(100%, 0%, 0%)'`
 */
type RgbMode = 'default' | 'percent';
```

## Methods

### toString

Format the color in any model's notation.

Syntax

```ts
mooColor.toString(model?: AcceptedModel | 'hex', ...args?: unknown[]): string;
```

- @param `AcceptedModel | 'hex'` [model] — target format. Defaults to the current model if omitted.
- @param `...unknown[]` args — forwarded to the underlying `toXxx()` method (e.g. `HexMode`, `RgbMode`).
- @returns `string`

Examples

```js
const c = new MooColor('#ff0000');
c.toString();           // 'rgb(255, 0, 0)'  (current model = rgb)
c.toString('hex');      // '#ff0000'
c.toString('hex', 'short'); // '#f00'
c.toString('hsl');      // 'hsl(0, 100%, 50%)'
```

### toHex

Format as hex notation, including alpha when < 1.

Syntax

```ts
mooColor.toHex(mode?: HexMode): string;
```

- @param [`HexMode`](#hexmode) [mode=`'full'`] — `'full'` | `'short'` | `'name'`
- @returns `string` — e.g. `'#ff0000'`, `'#f00'`, or `'red'`

### toRgb

Format as RGB/RGBA notation.

Syntax

```ts
mooColor.toRgb(mode?: RgbMode): string;
```

- @param [`RgbMode`](#rgbmode) [mode=`'default'`] — `'default'` | `'percent'`
- @returns `string` — e.g. `'rgb(255, 0, 0)'`, `'rgba(255, 0, 0, 0.5)'`, or `'rgb(100%, 0%, 0%)'`

### toHwb

Format as HWB notation, including alpha when < 1.

Syntax

```ts
mooColor.toHwb(): string;
```

- @returns `string` — e.g. `'hwb(0, 0%, 0%)'`

### toHsl

Format as HSL/HSLA notation.

Syntax

```ts
mooColor.toHsl(): string;
```

- @returns `string` — e.g. `'hsl(0, 100%, 50%)'`

### toHsv

Format as HSV notation (similar to HSL).

Syntax

```ts
mooColor.toHsv(): string;
```

- @returns `string` — e.g. `'hsv(0, 100%, 100%)'`

### toCmyk

Format as CMYK notation, including alpha when < 1.

Syntax

```ts
mooColor.toCmyk(): string;
```

- @returns `string` — e.g. `'cmyk(0%, 100%, 100%, 0%)'`
