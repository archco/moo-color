# Modifier

## Declarations

### Random arguments

``` ts
/** An argument for `ColorModifiable.random()` method. */
interface RandomArguments {
  /** The hue value from 0 to 360. Also you can give this as range. e.g. [0, 180] */
  hue?: number|[number, number];
  /** The whiteness value from 0 to 100. Also you can give this as range. e.g. [0, 50] */
  white?: number|[number, number];
  /** The blackness value from 0 to 100. Also you can give this as range. e.g. [0, 50] */
  black?: number|[number, number];
}
```

## Methods

### lighten

Increase lightness.

- Syntax

  ``` js
  mooColor.lighten(amount);
  ```

- Param `number` amount - The amount from 0 to 100.
- Returns `this`

### darken

Decrease lightness.

- Syntax

  ``` js
  mooColor.darken(amount);
  ```

- Param `number` amount - The amount from 0 to 100.
- Returns `this`

### saturate

Increase saturation.

- Syntax

  ``` js
  mooColor.saturate(amount);
  ```

- Param `number` amount - The amount from 0 to 100.
- Returns `this`

### desaturate

Decrease saturation.

- Syntax

  ``` js
  mooColor.desaturate(amount);
  ```

- Param `number` amount - The amount from 0 to 100.
- Returns `this`

### grayscale

Sets saturation value to 0.

- Syntax

  ``` js
  mooColor.grayscale();
  ```

- Returns `this`

### whiten

Modify whiteness.

- Syntax

  ``` js
  mooColor.whiten(amount);
  ```

- Param `number` amount - The amount from -100 to 100.
- Returns `this`

### blacken

Modify blackness.

- Syntax

  ``` js
  mooColor.blacken(amount);
  ```

- Param `number` amount - The amount from -100 to 100.
- Returns `this`

### rotate

Rotate hue value.

- Syntax

  ``` js
  mooColor.rotate(degree);
  ```

- Param `number` degree - The degree value from 0 to 360.
- Returns `this`

### mix

Mix two colors.

- Syntax

  ``` js
  const mixedColor = mooColor.mix(color, percent = 50);
  ```

- Param `MooColor` color - The color to mixed.
- Param `number` [percent = 50] - The percentage value of color to be mixed.
- Returns `MooColor` - The mixed color that as a new instance of `MooColor`.

### complement

Sets color to the complement of a color. This is identical to `rotate(180)`.

- Syntax

  ``` js
  mooColor.complement();
  ```

- Returns `this`

### invert

Sets color to the inverse (negative) of a color.

- Syntax

  ``` js
  mooColor.invert();
  ```

- Param `number` [percent = 100] - The relative percent of the color that inverse.
- Returns `this`

### random

Sets random color values as HWB color model.

- Syntax

  ``` js
  mooColor.random({ hue, white, black } = {});
  ```

- Param [`RandomArguments`](#random-arguments) [{ hue, white, black } = {}]
  - `hue` - The hue value from 0 to 360. Also you can give this as range. e.g. [0, 180]
  - `white` - The whiteness value from 0 to 100. Also you can give this as range. e.g. [0, 50]
  - `black` - The blackness value from 0 to 100. Also you can give this as range. e.g. [0, 50]
- Returns `this`
- Examples

  ``` js
  // Make random color. (default)
  const color1 = new MooColor().random();
  // Make random color that specify whiteness and blackness values.
  const color2 = new MooColor().random({ white: 0, black: 50 });
  // Make random color that range between red and yellow (hue value from 0 to 60).
  const color3 = new MooColor().random({ hue: [0, 60] });
  ```
