# Static

Static members of MooColor.

## Types

### RandomArguments

``` ts
/** An argument for `random()` method. */
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

### mix

Helper method for [`mix()`](modifier.md#mix) method.

- Syntax

  ``` js
  const mixedColor = MooColor.mix(color1, color2, percentOf1 = 50);
  ```

- Param `MooColor|string|Color` color1
- Param `MooColor|string|Color` color2
- Param `number` [percentOf1=50] - percentage of the first color.
- Returns `MooColor` - mixed color.

### random

Create random color as HWB model.

- Syntax

  ``` js
  const randomColor = MooColor.random({ hue, white, black } = {});
  ```

- Param [`RandomArguments`](#randomarguments) [{ hue, white, black } = {}]
  - `hue` - The hue value from 0 to 360. Also you can give this as range. e.g. [0, 180]
  - `white` - The whiteness value from 0 to 100. Also you can give this as range. e.g. [0, 50]
  - `black` - The blackness value from 0 to 100. Also you can give this as range. e.g. [0, 50]
- Returns `MooColor`

### Examples

  ``` js
  // Make random color. (default)
  const color1 = MooColor.random();
  // Make random color that specify whiteness and blackness values.
  const color2 = MooColor.random({ white: 0, black: 50 });
  // Make random color that range between red and yellow (hue value from 0 to 60).
  const color3 = MooColor.random({ hue: [0, 60] });
  ```
