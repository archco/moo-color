# Modification

> **v2 Breaking change — Immutability**
>
> All methods on this page return a **new `MooColor` instance**. The original instance is never mutated.
>
> ```ts
> const original = new MooColor('hsl(0, 100%, 50%)');
> const lighter  = original.lighten(20);  // new instance
> original.toHsl(); // 'hsl(0, 100%, 50%)' — unchanged
> lighter.toHsl();  // 'hsl(0, 100%, 70%)'
> ```

## Methods

### lighten

Increase HSL lightness by `amount` percent.

Syntax

```ts
mooColor.lighten(amount: number): MooColor;
```

- @param `number` amount — 0–100.
- @returns `MooColor` — new instance.

### darken

Decrease HSL lightness by `amount` percent.

Syntax

```ts
mooColor.darken(amount: number): MooColor;
```

- @param `number` amount — 0–100.
- @returns `MooColor` — new instance.

### saturate

Increase HSL saturation by `amount` percent.

Syntax

```ts
mooColor.saturate(amount: number): MooColor;
```

- @param `number` amount — 0–100.
- @returns `MooColor` — new instance.

### desaturate

Decrease HSL saturation by `amount` percent.

Syntax

```ts
mooColor.desaturate(amount: number): MooColor;
```

- @param `number` amount — 0–100.
- @returns `MooColor` — new instance.

### grayscale

Set HSL saturation to 0 (equivalent to `desaturate(100)`).

Syntax

```ts
mooColor.grayscale(): MooColor;
```

- @returns `MooColor` — new instance.

### whiten

Increase HWB whiteness by `amount` percent.

Syntax

```ts
mooColor.whiten(amount: number): MooColor;
```

- @param `number` amount — positive to whiten, negative to un-whiten.
- @returns `MooColor` — new instance.

### blacken

Increase HWB blackness by `amount` percent.

Syntax

```ts
mooColor.blacken(amount: number): MooColor;
```

- @param `number` amount — positive to blacken, negative to un-blacken.
- @returns `MooColor` — new instance.

### rotate

Rotate the hue channel by `degree` degrees.

Syntax

```ts
mooColor.rotate(degree: number): MooColor;
```

- @param `number` degree — degrees to rotate (wrap-around at 360).
- @returns `MooColor` — new instance.

### mix

Blend this color with another. Also available as a static method — see [static.md#mix](static.md#mix).

Syntax

```ts
mooColor.mix(color: MooColor | ColorInput | ColorData, percent?: number): MooColor;
```

- @param `MooColor | ColorInput | ColorData` color — the color to blend in.
- @param `number` [percent=50] — percentage weight of `color` (0 = fully `this`, 100 = fully `color`).
- @returns `MooColor` — new blended instance.

Examples

```js
const red    = new MooColor('#f00');
const orange = new MooColor('#f80');
const result = red.mix(orange, 50);  // equal blend → new MooColor
```

### complement

Return the complementary color (hue rotated 180°).

Syntax

```ts
mooColor.complement(): MooColor;
```

- @returns `MooColor` — new instance.

### invert

Return the inverse (negative) of the color by inverting RGB channels.

Syntax

```ts
mooColor.invert(percent?: number): MooColor;
```

- @param `number` [percent=100] — degree of inversion from 0 (no change) to 100 (full invert).
- @returns `MooColor` — new instance.

