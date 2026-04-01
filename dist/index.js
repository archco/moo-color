import Names from 'color-name';

// src/color-converter.ts
function hslToRgb(h, s, l) {
  h /= 60, s /= 100, l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(h % 2 - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;
  switch (Math.floor(h)) {
    case 0:
      r = c;
      g = x;
      b = 0;
      break;
    case 1:
      r = x;
      g = c;
      b = 0;
      break;
    case 2:
      r = 0;
      g = c;
      b = x;
      break;
    case 3:
      r = 0;
      g = x;
      b = c;
      break;
    case 4:
      r = x;
      g = 0;
      b = c;
      break;
    case 5:
      r = c;
      g = 0;
      b = x;
      break;
  }
  return [r, g, b].map((val) => (val + m) * 255);
}
function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  let h;
  if (delta === 0) {
    h = 0;
  } else if (max === r) {
    h = 60 * ((g - b) / delta % 6);
  } else if (max === g) {
    h = 60 * ((b - r) / delta + 2);
  } else {
    h = 60 * ((r - g) / delta + 4);
  }
  const l = (max + min) / 2;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  return [h, s * 100, l * 100];
}
function hwbToRgb(hue, white, black) {
  const [h, s, v] = hwbToHsv(hue, white, black);
  return hsvToRgb(h, s, v);
}
function rgbToHwb(r, g, b) {
  const [h, s, v] = rgbToHsv(r, g, b);
  return hsvToHwb(h, s, v);
}
function cmykToRgb(c, m, y, k) {
  c /= 100, m /= 100, y /= 100, k /= 100;
  const red = 255 * (1 - c) * (1 - k);
  const green = 255 * (1 - m) * (1 - k);
  const blue = 255 * (1 - y) * (1 - k);
  return [red, green, blue];
}
function rgbToCmyk(r, g, b) {
  r /= 255, g /= 255, b /= 255;
  const k = 1 - Math.max(r, g, b);
  const c = (1 - r - k) / (1 - k);
  const m = (1 - g - k) / (1 - k);
  const y = (1 - b - k) / (1 - k);
  return [c, m, y, k].map((x) => x * 100);
}
function hsvToRgb(h, s, v) {
  s /= 100;
  v /= 100;
  let r = 0;
  let g = 0;
  let b = 0;
  const i = h / 60;
  const c = v * s;
  const x = c * (1 - Math.abs(i % 2 - 1));
  const m = v - c;
  switch (Math.floor(i)) {
    case 0:
      r = c;
      g = x;
      b = 0;
      break;
    case 1:
      r = x;
      g = c;
      b = 0;
      break;
    case 2:
      r = 0;
      g = c;
      b = x;
      break;
    case 3:
      r = 0;
      g = x;
      b = c;
      break;
    case 4:
      r = x;
      g = 0;
      b = c;
      break;
    case 5:
      r = c;
      g = 0;
      b = x;
      break;
  }
  return [r, g, b].map((val) => (val + m) * 255);
}
function rgbToHsv(r, g, b) {
  r /= 255, g /= 255, b /= 255;
  let h;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  if (delta === 0) {
    h = 0;
  } else if (max === r) {
    h = 60 * ((g - b) / delta % 6);
  } else if (max === g) {
    h = 60 * ((b - r) / delta + 2);
  } else {
    h = 60 * ((r - g) / delta + 4);
  }
  const s = max === 0 ? 0 : delta / max;
  const v = max;
  return [h, s * 100, v * 100];
}
function hsvToHwb(h, s, v) {
  s /= 100, v /= 100;
  const white = (1 - s) * v;
  const black = 1 - v;
  return [h, white * 100, black * 100];
}
function hwbToHsv(h, w, b) {
  [h, w, b] = resolveHwb(h, w, b);
  w /= 100, b /= 100;
  const s = 1 - w / (1 - b);
  const v = 1 - b;
  return [h, s * 100, v * 100];
}
function rgbToHex(r, g, b, a, enableShort) {
  const arr = [r, g, b];
  if (typeof a === "number") {
    arr.push(Math.round(a * 255));
  }
  const hex = arr.map((x) => x.toString(16).padStart(2, "0")).join("");
  return enableShort ? hexToShorthand(hex) : hex;
}
function hexToShorthand(hex) {
  const pairs = hex.match(/.{2}/g);
  if (!pairs) return hex;
  const isShorthandable = pairs.every((x) => /(.)\1+/.test(x));
  return isShorthandable ? pairs.map((x) => x.substring(1)).join("") : hex;
}
function resolveHwb(h, w, b) {
  const total = w + b;
  if (total > 100) {
    w = Number((w / total).toFixed(4)) * 100;
    b = Number((b / total).toFixed(4)) * 100;
  }
  return [h, w, b];
}
var color_names_default = Names;

// src/utils.ts
function clamp(num, min, max) {
  return Math.min(Math.max(min, num), max);
}
function degree(num) {
  const n = typeof num === "string" ? parseFloat(num) : num;
  return (n % 360 + 360) % 360;
}
function resolveAlpha(a) {
  const n = typeof a === "string" ? parseFloat(a) : a ?? NaN;
  return clamp(isNaN(n) ? 1 : n, 0, 1);
}
function decimal(num, precision) {
  const factor = 10 ** precision;
  return Math.round(num * factor) / factor;
}
function getRandom(min, max, precision = 0) {
  const num = Math.random() * (max - min) + min;
  return decimal(num, precision);
}
function arrayIsEqual(arr1, arr2) {
  return arr1.length === arr2.length && arr1.every(
    (v, i) => Array.isArray(v) ? arrayIsEqual(v, arr2[i]) : v === arr2[i]
  );
}
function linearize(value) {
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

// src/input-parser.ts
function inputParser(input) {
  if (input in color_names_default) {
    return {
      model: "rgb",
      values: color_names_default[input],
      alpha: 1
    };
  } else if (input === "transparent") {
    return {
      model: "rgb",
      values: [0, 0, 0],
      alpha: 0
    };
  } else {
    const prefix = input.substring(0, 3).toLowerCase();
    switch (prefix) {
      case "hwb":
        return parseHwb(input);
      case "hsl":
        return parseHsl(input);
      case "hsv":
        return parseHsv(input);
      case "cmy":
        return parseCmyk(input);
      default:
        return parseRgb(input);
    }
  }
}
function parseRgb(input) {
  const hex = /^#?([a-f0-9]{6})([a-f0-9]{2})?$/i;
  const shortHex = /^#?([a-f0-9]{3})([a-f0-9]{1})?$/i;
  const rgba = /^rgba?\s*\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d.]+)\s*)?\)$/;
  const percent = /^rgba?\s*\(\s*([+-]?[\d.]+)%\s*,\s*([+-]?[\d.]+)%\s*,\s*([+-]?[\d.]+)%\s*(?:,\s*([+-]?[\d.]+)\s*)?\)$/;
  const hexToAlpha = (num) => Math.round(parseInt(num, 16) / 255 * 100) / 100;
  let values;
  let alpha;
  let m;
  if ((m = input.match(hex)) !== null) {
    values = m[1].match(/.{2}/g).map((x) => parseInt(x, 16));
    alpha = m[2] ? hexToAlpha(m[2]) : 1;
  } else if ((m = input.match(shortHex)) !== null) {
    values = m[1].match(/.{1}/g).map((x) => parseInt(x + x, 16));
    alpha = m[2] ? hexToAlpha(m[2]) : 1;
  } else if ((m = input.match(rgba)) !== null) {
    values = [m[1], m[2], m[3]].map((x) => parseInt(x, 0));
    alpha = resolveAlpha(m[4]);
  } else if ((m = input.match(percent)) !== null) {
    values = [m[1], m[2], m[3]].map((x) => Math.round(parseFloat(x) * 2.55));
    alpha = resolveAlpha(m[4]);
  } else {
    return null;
  }
  return {
    model: "rgb",
    values: values.map((x) => clamp(x, 0, 255)),
    alpha: clamp(alpha, 0, 1)
  };
}
function parseHsl(input) {
  const hsl = /^hsla?\s*\(\s*([+-]?\d*[.]?\d+)(?:deg)?\s*,\s*([+-]?[\d.]+)%\s*,\s*([+-]?[\d.]+)%\s*(?:,\s*([+-]?[\d.]+)\s*)?\)$/i;
  const m = input.match(hsl);
  if (!m) return null;
  return {
    model: "hsl",
    values: [
      degree(m[1]),
      clamp(parseFloat(m[2]), 0, 100),
      clamp(parseFloat(m[3]), 0, 100)
    ],
    alpha: resolveAlpha(m[4])
  };
}
function parseHwb(input) {
  const hwb = /^hwba?\s*\(\s*([+-]?\d*[.]?\d+)(?:deg)?\s*,\s*([+-]?[\d.]+)%\s*,\s*([+-]?[\d.]+)%\s*(?:,\s*([+-]?[\d.]+)\s*)?\)$/i;
  const m = input.match(hwb);
  if (!m) return null;
  return {
    model: "hwb",
    values: resolveHwb(
      degree(m[1]),
      clamp(parseFloat(m[2]), 0, 100),
      clamp(parseFloat(m[3]), 0, 100)
    ),
    alpha: resolveAlpha(m[4])
  };
}
function parseHsv(input) {
  const hsv = /^hsva?\s*\(\s*([+-]?\d*[.]?\d+)(?:deg)?\s*,\s*([+-]?[\d.]+)%\s*,\s*([+-]?[\d.]+)%\s*(?:,\s*([+-]?[\d.]+)\s*)?\)$/i;
  const m = input.match(hsv);
  if (!m) return null;
  return {
    model: "hsv",
    values: [
      degree(m[1]),
      clamp(parseFloat(m[2]), 0, 100),
      clamp(parseFloat(m[3]), 0, 100)
    ],
    alpha: resolveAlpha(m[4])
  };
}
function parseCmyk(input) {
  const cmyk = /^cmyk\s*\(\s*([+-]?[\d.]+)%\s*,\s*([+-]?[\d.]+)%\s*,\s*([+-]?[\d.]+)%\s*,\s*([+-]?[\d.]+)%\s*(?:,\s*([+-]?[\d.]+)\s*)?\)$/i;
  const m = input.match(cmyk);
  if (!m) return null;
  return {
    model: "cmyk",
    values: [
      clamp(parseFloat(m[1]), 0, 100),
      clamp(parseFloat(m[2]), 0, 100),
      clamp(parseFloat(m[3]), 0, 100),
      clamp(parseFloat(m[4]), 0, 100)
    ],
    alpha: resolveAlpha(m[5])
  };
}

// src/moo-color.ts
var MooColor = class _MooColor {
  #model;
  #values;
  #alpha;
  // -----------------------------------------------------------------------
  // Static
  // -----------------------------------------------------------------------
  /**
   * Mix two colors together.
   *
   * @param color1 - First color (string, {@link Color} data, or `MooColor`).
   * @param color2 - Second color.
   * @param percentOf1 - Weight of the **first** color, 0–100. Default `50`.
   * @returns A new blended `MooColor`.
   *
   * @example
   * ```ts
   * MooColor.mix('#ff0000', '#ffff00', 50); // orange
   * ```
   */
  static mix(color1, color2, percentOf1 = 50) {
    const c1 = color1 instanceof _MooColor ? color1 : new _MooColor(color1);
    const c2 = color2 instanceof _MooColor ? color2 : new _MooColor(color2);
    return c2.mix(c1, percentOf1);
  }
  /**
   * Generate a random color in the HWB space.
   *
   * @param options - Optional constraints for hue / whiteness / blackness.
   * @returns A new randomly‐generated `MooColor`.
   *
   * @example
   * ```ts
   * MooColor.random();                         // fully random
   * MooColor.random({ hue: [0, 180] });        // warm‐ish hue
   * MooColor.random({ white: 50, black: 10 }); // fixed tint
   * ```
   */
  static random(options = {}) {
    const { hue, white, black } = options;
    const vals = [hue, white, black].map((x, i) => {
      if (typeof x === "number") return x;
      if (Array.isArray(x)) {
        const precision = i === 0 ? 0 : 2;
        return getRandom(Math.min(...x), Math.max(...x), precision);
      }
      return i === 0 ? getRandom(0, 360) : getRandom(0, 100, 2);
    });
    return new _MooColor({
      model: "hwb",
      values: resolveHwb(
        degree(vals[0]),
        clamp(vals[1], 0, 100),
        clamp(vals[2], 0, 100)
      ),
      alpha: 1
    });
  }
  // -----------------------------------------------------------------------
  // Constructor
  // -----------------------------------------------------------------------
  /**
   * Create a new `MooColor`.
   *
   * @param color - A CSS color string, a {@link Color} data object, or
   *   `undefined` (defaults to black `#000`).
   * @throws {Error} When the string cannot be parsed.
   *
   * @example
   * ```ts
   * new MooColor('#ff0000');
   * new MooColor('rgb(255, 0, 0)');
   * new MooColor('hsl(120, 50%, 100%)');
   * new MooColor({ model: 'rgb', values: [255, 0, 0], alpha: 1 });
   * new MooColor(); // black
   * ```
   */
  constructor(color) {
    if (typeof color === "object" && color !== null && "model" in color) {
      this.#model = color.model;
      this.#values = [...color.values];
      this.#alpha = resolveAlpha(color.alpha);
    } else {
      const str = typeof color === "string" ? color : "#000";
      const parsed = inputParser(str);
      if (!parsed) throw new Error(`Cannot parse color: "${str}"`);
      this.#model = parsed.model;
      this.#values = parsed.values;
      this.#alpha = parsed.alpha ?? 1;
    }
  }
  // -----------------------------------------------------------------------
  // Data access
  // -----------------------------------------------------------------------
  /**
   * Returns the underlying color data as a plain object.
   *
   * The returned object is a **copy** — mutating it will not
   * affect this instance.
   *
   * @example
   * ```ts
   * new MooColor('#f00').getColor();
   * // → { model: 'rgb', values: [255, 0, 0], alpha: 1 }
   * ```
   */
  getColor() {
    return { model: this.#model, values: [...this.#values], alpha: this.#alpha };
  }
  /**
   * Returns color data converted to the given model.
   *
   * @param model - Target color model.
   *
   * @example
   * ```ts
   * new MooColor('#f00').getColorAs('hsl');
   * // → { model: 'hsl', values: [0, 100, 50], alpha: 1 }
   * ```
   */
  getColorAs(model) {
    if (this.#model === model) return this.getColor();
    return {
      model,
      values: this.#convert(this.#values, this.#model, model),
      alpha: this.#alpha
    };
  }
  /** Returns the current color model identifier. */
  getModel() {
    return this.#model;
  }
  /**
   * Returns a **new** `MooColor` whose internal model is changed to `model`.
   *
   * @param model - Target color model.
   */
  changeModel(model) {
    if (this.#model === model) return this.clone();
    return new _MooColor(this.getColorAs(model));
  }
  /** Returns the alpha (opacity) channel, 0–1. */
  getAlpha() {
    return this.#alpha;
  }
  /**
   * Returns a **new** `MooColor` with the given alpha value.
   *
   * @param alpha - Opacity, 0 (transparent) – 1 (opaque).
   *
   * @example
   * ```ts
   * new MooColor('red').setAlpha(0.5).toRgb();
   * // → 'rgba(255, 0, 0, 0.5)'
   * ```
   */
  setAlpha(alpha) {
    return new _MooColor({
      model: this.#model,
      values: [...this.#values],
      alpha: clamp(alpha, 0, 1)
    });
  }
  /**
   * Converts a standalone {@link Color} data object to another model.
   *
   * @param color - Source color data.
   * @param model - Target model.
   * @returns A new {@link Color} in the target model.
   */
  convert(color, model) {
    return {
      model,
      values: this.#convert(color.values, color.model, model),
      alpha: color.alpha
    };
  }
  /** Creates an independent copy of this color. */
  clone() {
    return new _MooColor(this.getColor());
  }
  // -----------------------------------------------------------------------
  // State accessors
  // -----------------------------------------------------------------------
  /**
   * Perceived brightness on a 0–255 scale (W3C AERT formula).
   *
   * @see https://www.w3.org/TR/AERT/#color-contrast
   *
   * @example
   * ```ts
   * new MooColor('#808080').brightness; // 128
   * ```
   */
  get brightness() {
    const rgb = this.#toRgbValues();
    const r = rgb[0] ?? 0;
    const g = rgb[1] ?? 0;
    const b = rgb[2] ?? 0;
    return (r * 299 + g * 587 + b * 114) / 1e3;
  }
  /** `true` when {@link brightness} ≥ 128. */
  get isLight() {
    return this.brightness >= 128;
  }
  /** `true` when {@link brightness} < 128. */
  get isDark() {
    return this.brightness < 128;
  }
  /**
   * Relative luminance per **WCAG 2.1** (0 – 1).
   *
   * Unlike v1, this implementation correctly applies **sRGB gamma
   * linearization** before weighting channels:
   *
   * ```
   * L = 0.2126 × R_lin + 0.7152 × G_lin + 0.0722 × B_lin
   * ```
   *
   * where `R_lin = linearize(R / 255)` etc.
   *
   * @see https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
   *
   * @example
   * ```ts
   * new MooColor('#000').luminance; // 0
   * new MooColor('#fff').luminance; // 1
   * new MooColor('#808080').luminance; // ≈ 0.2159 (NOT 0.502)
   * ```
   */
  get luminance() {
    const rgb = this.#toRgbValues();
    const rLin = linearize((rgb[0] ?? 0) / 255);
    const gLin = linearize((rgb[1] ?? 0) / 255);
    const bLin = linearize((rgb[2] ?? 0) / 255);
    return 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin;
  }
  /**
   * WCAG 2.1 contrast ratio against another color (range 1–21).
   *
   * @see https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
   *
   * @example
   * ```ts
   * new MooColor('#000').contrastRatioWith(new MooColor('#fff')); // 21
   * ```
   */
  contrastRatioWith(color) {
    const l1 = Math.max(this.luminance, color.luminance);
    const l2 = Math.min(this.luminance, color.luminance);
    return (l1 + 0.05) / (l2 + 0.05);
  }
  /**
   * Returns `true` when the contrast ratio with `color` meets the
   * WCAG 2.1 **AA** requirement for normal text (≥ 4.5 : 1).
   *
   * @see https://www.w3.org/TR/WCAG21/#contrast-minimum
   */
  isContrastEnough(color) {
    return this.contrastRatioWith(color) >= 4.5;
  }
  // -----------------------------------------------------------------------
  // Formatting
  // -----------------------------------------------------------------------
  /**
   * Formats the color in the given model's notation.
   * Defaults to the current model.
   *
   * @param model - Output notation (`'rgb'`, `'hex'`, `'hsl'`, `'hwb'`, `'hsv'`, `'cmyk'`).
   * @param args  - Forwarded to the underlying format method.
   *
   * @example
   * ```ts
   * new MooColor('#f00').toString();         // 'rgb(255, 0, 0)'
   * new MooColor('#f00').toString('hex');     // '#ff0000'
   * new MooColor('#f00').toString('hsl');     // 'hsl(0, 100%, 50%)'
   * ```
   */
  toString(model, ...args) {
    const m = model ?? this.#model;
    switch (m) {
      case "hex":
        return this.toHex(args[0]);
      case "hwb":
        return this.toHwb();
      case "hsl":
        return this.toHsl();
      case "hsv":
        return this.toHsv();
      case "cmyk":
        return this.toCmyk();
      default:
        return this.toRgb(args[0]);
    }
  }
  /**
   * Hex notation (`#rrggbb` / `#rrggbbaa`).
   *
   * @param mode - `'full'` (default), `'short'` (`#rgb`), or `'name'` (CSS name if available).
   * @see https://www.w3.org/TR/css-color-4/#hex-notation
   *
   * @example
   * ```ts
   * new MooColor('red').toHex();        // '#ff0000'
   * new MooColor('red').toHex('short'); // '#f00'
   * new MooColor('red').toHex('name');  // 'red'
   * ```
   */
  toHex(mode = "full") {
    const rgb = this.#toRgbValues().map(Math.round);
    const r = rgb[0] ?? 0;
    const g = rgb[1] ?? 0;
    const b = rgb[2] ?? 0;
    const a = this.#alpha === 1 ? null : this.#alpha;
    if (mode === "name") {
      for (const [name, vals] of Object.entries(color_names_default)) {
        if (a === null && arrayIsEqual(vals, [r, g, b])) return name;
      }
      return `#${rgbToHex(r, g, b, a, true)}`;
    }
    const enableShort = mode === "short";
    return `#${rgbToHex(r, g, b, a, enableShort)}`;
  }
  /**
   * RGB / RGBA notation.
   *
   * @param mode - `'default'` or `'percent'`.
   * @see https://www.w3.org/TR/css-color-4/#rgb-functions
   *
   * @example
   * ```ts
   * new MooColor('#f00').toRgb();          // 'rgb(255, 0, 0)'
   * new MooColor('#f00').toRgb('percent'); // 'rgb(100%, 0%, 0%)'
   * ```
   */
  toRgb(mode = "default") {
    const rgb = this.#toRgbValues().map(Math.round);
    const r = rgb[0] ?? 0;
    const g = rgb[1] ?? 0;
    const b = rgb[2] ?? 0;
    let parts = [r, g, b];
    if (mode === "percent") {
      parts = [r, g, b].map((x) => `${x / 255 * 100}%`);
    }
    return this.#alpha === 1 ? `rgb(${parts[0]}, ${parts[1]}, ${parts[2]})` : `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, ${this.#alpha})`;
  }
  /**
   * HWB notation.
   * @see https://www.w3.org/TR/css-color-4/#the-hwb-notation
   */
  toHwb() {
    const [h, w, b] = this.#getValuesAs("hwb").map((x) => decimal(x, 2));
    const a = this.#alpha === 1 ? "" : `, ${this.#alpha}`;
    return `hwb(${h}, ${w}%, ${b}%${a})`;
  }
  /**
   * HSL / HSLA notation.
   * @see https://www.w3.org/TR/css-color-4/#the-hsl-notation
   */
  toHsl() {
    const [h, s, l] = this.#getValuesAs("hsl").map((x) => decimal(x, 2));
    return this.#alpha === 1 ? `hsl(${h}, ${s}%, ${l}%)` : `hsla(${h}, ${s}%, ${l}%, ${this.#alpha})`;
  }
  /**
   * HSV / HSVA notation (non‐standard; same shape as HSL).
   */
  toHsv() {
    const [h, s, v] = this.#getValuesAs("hsv").map((x) => decimal(x, 2));
    return this.#alpha === 1 ? `hsv(${h}, ${s}%, ${v}%)` : `hsva(${h}, ${s}%, ${v}%, ${this.#alpha})`;
  }
  /**
   * CMYK notation.
   * @see https://www.w3.org/TR/css-color-4/#cmyk-colors
   */
  toCmyk() {
    const [c, m, y, k] = this.#getValuesAs("cmyk").map((x) => decimal(x, 2));
    const a = this.#alpha === 1 ? "" : `, ${this.#alpha}`;
    return `cmyk(${c}%, ${m}%, ${y}%, ${k}%${a})`;
  }
  // -----------------------------------------------------------------------
  // Manipulation — every method returns a **new** MooColor
  // -----------------------------------------------------------------------
  /**
   * Increase lightness (HSL model).
   *
   * @param amount - Value to add, 0–100.
   *
   * @example
   * ```ts
   * new MooColor('red').lighten(20).toRgb(); // 'rgb(255, 102, 102)'
   * ```
   */
  lighten(amount) {
    return this.#manipulate("hsl", (h, s, l) => [h, s, clamp(l + amount, 0, 100)]);
  }
  /**
   * Decrease lightness (HSL model).
   *
   * @param amount - Value to subtract, 0–100.
   *
   * @example
   * ```ts
   * new MooColor('red').darken(20).toRgb(); // 'rgb(153, 0, 0)'
   * ```
   */
  darken(amount) {
    return this.#manipulate("hsl", (h, s, l) => [h, s, clamp(l - amount, 0, 100)]);
  }
  /**
   * Increase saturation (HSL model).
   *
   * @param amount - Value to add, 0–100.
   */
  saturate(amount) {
    return this.#manipulate("hsl", (h, s, l) => [h, clamp(s + amount, 0, 100), l]);
  }
  /**
   * Decrease saturation (HSL model).
   *
   * @param amount - Value to subtract, 0–100.
   */
  desaturate(amount) {
    return this.#manipulate("hsl", (h, s, l) => [h, clamp(s - amount, 0, 100), l]);
  }
  /**
   * Remove all saturation — convert to grayscale.
   */
  grayscale() {
    return this.#manipulate("hsl", (h, _s, l) => [h, 0, l]);
  }
  /**
   * Increase whiteness (HWB model).
   *
   * @param amount - Value to add, −100 – 100.
   *
   * @example
   * ```ts
   * new MooColor('hwb(120, 40%, 40%)').whiten(20).toHwb();
   * // 'hwb(120, 60%, 40%)'
   * ```
   */
  whiten(amount) {
    return this.#manipulate(
      "hwb",
      (h, w, b) => resolveHwb(h, clamp(w + amount, 0, 100), b)
    );
  }
  /**
   * Increase blackness (HWB model).
   *
   * @param amount - Value to add, −100 – 100.
   */
  blacken(amount) {
    return this.#manipulate(
      "hwb",
      (h, w, b) => resolveHwb(h, w, clamp(b + amount, 0, 100))
    );
  }
  /**
   * Rotate the hue by `d` degrees.
   *
   * @param d - Degrees to rotate (negative = counter‐clockwise).
   *
   * @example
   * ```ts
   * new MooColor('hsl(0, 100%, 50%)').rotate(120).toHex('short');
   * // '#0f0'
   * ```
   */
  rotate(d) {
    return this.#manipulate("hsl", (h, s, l) => [degree(h + d), s, l]);
  }
  /**
   * Blend this color with another.
   *
   * @param color   - The color to blend with.
   * @param percent - Weight of `color`, 0–100. Default `50`.
   * @returns A new blended `MooColor`.
   *
   * @example
   * ```ts
   * const red = new MooColor('rgb(255, 0, 0)');
   * const yellow = new MooColor('rgb(255, 255, 0)');
   * red.mix(yellow, 50).toString(); // 'rgb(255, 128, 0)'
   * ```
   */
  mix(color, percent = 50) {
    const p = percent / 100;
    const c1 = this.#toRgbValues();
    const c2 = color.#toRgbValues();
    return new _MooColor({
      model: "rgb",
      values: c1.map((v, i) => v + (c2[i] - v) * p),
      alpha: this.#alpha + (color.#alpha - this.#alpha) * p
    }).changeModel(this.#model);
  }
  /**
   * Complementary color (hue + 180°).
   *
   * @example
   * ```ts
   * new MooColor('hsl(30, 100%, 50%)').complement().toHsl();
   * // 'hsl(210, 100%, 50%)'
   * ```
   */
  complement() {
    return this.#manipulate("hsl", (h, s, l) => [degree(h + 180), s, l]);
  }
  /**
   * Invert (negate) the color in RGB space.
   *
   * @param percent - Degree of inversion, 0–100. Default `100`.
   *
   * @example
   * ```ts
   * new MooColor('#0ff').invert().toHex('short'); // '#f00'
   * ```
   */
  invert(percent = 100) {
    const p = percent / 100;
    return this.#manipulate(
      "rgb",
      (r, g, b) => [r, g, b].map((x) => Math.round(Math.abs(255 * p - x)))
    );
  }
  // -----------------------------------------------------------------------
  // Private helpers
  // -----------------------------------------------------------------------
  #toRgbValues() {
    if (this.#model === "rgb") return [...this.#values];
    return this.#convert(this.#values, this.#model, "rgb");
  }
  #getValuesAs(model) {
    if (this.#model === model) return [...this.#values];
    return this.#convert(this.#values, this.#model, model);
  }
  #manipulate(asModel, callback) {
    const vals = this.#getValuesAs(asModel);
    const newVals = callback(...vals);
    const finalVals = asModel === this.#model ? newVals : this.#convert(newVals, asModel, this.#model);
    return new _MooColor({
      model: this.#model,
      values: finalVals,
      alpha: this.#alpha
    });
  }
  #convert(values, from, to) {
    if (from === to) return [...values];
    if (from === "hsv" && to === "hwb") {
      return hsvToHwb(values[0], values[1], values[2]);
    }
    if (from === "hwb" && to === "hsv") {
      return hwbToHsv(values[0], values[1], values[2]);
    }
    let rgb;
    switch (from) {
      case "rgb":
        rgb = values;
        break;
      case "hsl":
        rgb = hslToRgb(values[0], values[1], values[2]);
        break;
      case "hwb":
        rgb = hwbToRgb(values[0], values[1], values[2]);
        break;
      case "hsv":
        rgb = hsvToRgb(values[0], values[1], values[2]);
        break;
      case "cmyk":
        rgb = cmykToRgb(values[0], values[1], values[2], values[3]);
        break;
      default:
        rgb = values;
    }
    switch (to) {
      case "rgb":
        return rgb;
      case "hsl":
        return rgbToHsl(rgb[0], rgb[1], rgb[2]);
      case "hwb":
        return rgbToHwb(rgb[0], rgb[1], rgb[2]);
      case "hsv":
        return rgbToHsv(rgb[0], rgb[1], rgb[2]);
      case "cmyk":
        return rgbToCmyk(rgb[0], rgb[1], rgb[2]);
      default:
        return rgb;
    }
  }
};

export { MooColor, MooColor as default };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map