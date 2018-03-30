# Formatter

## Declarations

### Hex mode

``` ts
/**
 * Type for `ColorSettable.toHex()` method.
 * `full` - e.g. '#ff0000'
 * `short`- e.g. '#f00'
 * `name` - e.g. 'red'
 */
type HexMode = 'full'|'short'|'name';
```

### Rgb mode

``` ts
/**
 * Type for `ColorSettable.toRgb()` method.
 * `default` - e.g. 'rgb(255, 0, 0)'
 * `percent` - e.g. 'rgb(100%, 0%, 0%)'
 */
type RgbMode = 'default'|'percent';
```

## Methods

### toString

Represents color as notation of specific color model.

- Syntax

  ``` js
  const str = mooColor.toString(model = '', ...args);
  ```

- Param `string` model - Specify color model. If not specifying this value, then returns current color model. `rgb`|`hwb`|`hsl`|`hsv`|`cmyk`|`hex`
- Param `...any[]` args - Arguments for the represent methods.
- Returns `string`

### toHex

Represents color as HEX notation.

- Syntax

  ``` js
  const str = mooColor.toHex(mode = 'full');
  ```

- Param [`HexMode`](#hex-mode) [mode = 'full'] - `full`|`short`|`name`
- Returns `string` - e.g. `#ff0000` or `#f00` or `red`

### toRgb

Represents color as RGB notation.

- Syntax

  ``` js
  const str = mooColor.toRgb(mode = 'default');
  ```

- Param [`RgbMode`](#rgb-mode) [mode = 'default'] - `default`|`percent`
- Returns `string` - e.g. `rgb(255, 0, 0)` or `rgb(100%, 0%, 0%)`

### toHwb

Represents color as HWB notation.

- Syntax

  ``` js
  const str = mooColor.toHwb();
  ```

- Returns `string` - e.g. `hwb(0, 0%, 0%)`

### toHsl

Represents color as HSL notation.

- Syntax

  ``` js
  const str = mooColor.toHsl();
  ```

- Returns `string` - e.g. `hsl(0, 100%, 50%)`

### toHsv

Represents color as HSV notation. This format is similar to HSL.

- Syntax

  ``` js
  const str = mooColor.toHsv();
  ```

- Returns `string` - e.g. `hsv(0, 100%, 100%)`

### toCmyk

Represents color as CMYK notation.

- Syntax

  ``` js
  const str = mooColor.toCmyk();
  ```

- Returns `string` - e.g. `cmyk(0%, 100%, 100%, 0%)`
