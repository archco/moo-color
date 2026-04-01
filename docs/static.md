# Static

Static members of `MooColor`.

## Types

### RandomOptions

```ts
/** Options for the `MooColor.random()` method. */
interface RandomOptions {
  /** Hue, 0–360. Specify a range with a tuple, e.g. `[0, 180]`. */
  hue?: number | [number, number];
  /** Whiteness, 0–100. Specify a range with a tuple, e.g. `[0, 50]`. */
  white?: number | [number, number];
  /** Blackness, 0–100. Specify a range with a tuple, e.g. `[0, 50]`. */
  black?: number | [number, number];
}
```

## Methods

### mix

Blend two colors. Also available as an instance method — see [modification.md#mix](modification.md#mix).

Syntax

```ts
MooColor.mix(
  color1: MooColor | ColorInput | ColorData,
  color2: MooColor | ColorInput | ColorData,
  percentOf1?: number
): MooColor;
```

- @param `MooColor | ColorInput | ColorData` color1 — first color.
- @param `MooColor | ColorInput | ColorData` color2 — second color.
- @param `number` [percentOf1=50] — percentage weight of the first color (0–100).
- @returns `MooColor` — new blended color instance.

Examples

```js
const color1 = new MooColor('#f00');
const color2 = new MooColor('#f80');
const mixed = MooColor.mix(color1, color2);

// Pass strings directly
const mixed2 = MooColor.mix('#f00', '#f80');

// Unbalanced blend: 75% green, 25% blue
const mixed3 = MooColor.mix('green', 'blue', 75);
```

### random

Generate a random HWB color.

Syntax

```ts
MooColor.random(options?: RandomOptions): MooColor;
```

- @param [`RandomOptions`](#randomoptions) [options] — optional constraints.
  - `hue` — hue, 0–360, or `[min, max]` range.
  - `white` — whiteness, 0–100, or `[min, max]` range.
  - `black` — blackness, 0–100, or `[min, max]` range.
- @returns `MooColor` — new random color instance.

Examples

```js
// Fully random
const c1 = MooColor.random();

// Fix whiteness and blackness
const c2 = MooColor.random({ white: 0, black: 50 });

// Random hue between red and yellow (0°–60°)
const c3 = MooColor.random({ hue: [0, 60] });
```
