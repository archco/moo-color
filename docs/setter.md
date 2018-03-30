# Setter

## Declarations

### Color data

A data object that includes color data.

``` ts
type Color = ColorData;
interface ColorData {
  model: AcceptedModel; // 'rgb'|'hwb'|'hsl'|'hsv'|'cmyk'
  values: number[];     // e.g. if rgb: [255, 255, 255], if cmyk: [100, 100, 0, 100]
  alpha?: number;       // The opacity value from 0 to 1.
}
```

## Methods

### setColor

Set color data.

- Syntax

  ``` js
  mooColor.setColor(color);
  ```

- Param `Color` color - [Color data](#color-data)
- Returns `this`

### getColor

Get color data.

- Syntax

  ``` js
  const color = mooColor.getColor();
  ```

- Returns `Color` - [Color data](#color-data)

### getColorAs

Get color data as specific color model.

- Syntax

  ``` js
  const color = mooColor.getColorAs(model);
  ```

- Param `string` model - accepted model name. `rgb`|`hwb`|`hsl`|`hsv`|`cmyk`
- Returns `Color` - [Color data](#color-data)

### getModel

Get color model name.

- Syntax

  ``` js
  const model = mooColor.getModel();
  ```

- Returns `string` - model name. `rgb`|`hwb`|`hsl`|`hsv`|`cmyk`

### changeModel

Converts color data to given color model.

- Syntax

  ``` js
  mooColor.changeModel(model);
  ```

- Param `string` model - accepted model name. `rgb`|`hwb`|`hsl`|`hsv`|`cmyk`
- Returns `this`

### getAlpha

Get alpha value from `Color`.

- Syntax

  ``` js
  const alpha = mooColor.getAlpha();
  ```

- Returns `number` - alpha value from 0 to 1.

### setAlpha

Set alpha value to `Color`.

- Syntax

  ``` js
  mooColor.setAlpha(alpha);
  ```

- Param `number` alpha - alpha value from 0 to 1.
- Returns `this`
