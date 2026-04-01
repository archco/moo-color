# Data access

## Declarations

### ColorData

A plain object carrying internal color state.

```ts
interface ColorData {
  readonly model: AcceptedModel; // 'rgb' | 'hwb' | 'hsl' | 'hsv' | 'cmyk'
  values: number[];              // e.g. rgb → [255, 0, 0], cmyk → [0, 100, 100, 0]
  alpha?: number;                // 0 (transparent) – 1 (opaque)
}
```

## Methods

### getColor

Return a **copy** of the internal color data.

Syntax

```ts
mooColor.getColor(): ColorData;
```

- @returns `ColorData` — snapshot of the current internal state.

> **Note** — the returned object is a copy. Mutating it does not affect the `MooColor` instance.

### getColorAs

Return color data converted to a given model without changing the instance.

Syntax

```ts
mooColor.getColorAs(model: AcceptedModel): ColorData;
```

- @param `AcceptedModel` model — target model: `'rgb'` | `'hwb'` | `'hsl'` | `'hsv'` | `'cmyk'`
- @returns `ColorData`

### getModel

Return the current model identifier.

Syntax

```ts
mooColor.getModel(): AcceptedModel;
```

- @returns `AcceptedModel`

### changeModel

Return a **new** `MooColor` instance with color data converted to the given model.

Syntax

```ts
mooColor.changeModel(model: AcceptedModel): MooColor;
```

- @param `AcceptedModel` model — target model.
- @returns `MooColor` — new instance in the requested model.

> **v2 Breaking change** — the original instance is **not** mutated.
>
> ```ts
> const rgb   = new MooColor('#f00');              // model: rgb
> const hsl   = rgb.changeModel('hsl');            // model: hsl  (new instance)
> rgb.getModel();  // still 'rgb'
> ```

### getAlpha

Return the alpha channel value.

Syntax

```ts
mooColor.getAlpha(): number;
```

- @returns `number` — 0 (fully transparent) to 1 (fully opaque).

### setAlpha

Return a **new** `MooColor` instance with the given alpha value applied.

Syntax

```ts
mooColor.setAlpha(alpha: number): MooColor;
```

- @param `number` alpha — value from 0 to 1.
- @returns `MooColor` — new instance with the updated alpha.

> **v2 Breaking change** — the original instance is **not** mutated.
>
> ```ts
> const opaque       = new MooColor('#f00');
> const semiTransparent = opaque.setAlpha(0.5); // new instance
> opaque.getAlpha(); // still 1
> ```

### convert

Convert a standalone `ColorData` object from one model to another.

Syntax

```ts
mooColor.convert(color: ColorData, model: AcceptedModel): ColorData;
```

- @param `ColorData` color — source data object.
- @param `AcceptedModel` model — target model.
- @returns `ColorData` — converted data.

### clone

Return an independent copy of the current instance.

Syntax

```ts
mooColor.clone(): MooColor;
```

- @returns `MooColor` — new `MooColor` with identical model, values, and alpha.
