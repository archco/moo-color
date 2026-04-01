import type {
  AcceptedModel,
  Color,
  ColorInput,
  HexMode,
  RandomOptions,
  RgbMode,
} from './types';
import * as Converter from './color-converter';
import Names from './color-names';
import parseColor from './input-parser';
import {
  arrayIsEqual,
  clamp,
  decimal,
  degree,
  getRandom,
  linearize,
  resolveAlpha,
} from './utils';

export type { AcceptedModel, Color, ColorInput, HexMode, RandomOptions, RgbMode };

type ManipulateFn = (...args: number[]) => number[];

/**
 * A modern, **immutable** color manipulation class.
 *
 * Every manipulation method returns a **new** `MooColor` instance —
 * the original is never mutated. This makes the class safe for
 * React / Vue state, memoization, and concurrent use.
 *
 * @example
 * ```ts
 * import { MooColor } from 'moo-color';
 *
 * const red = new MooColor('#ff0000');
 * const light = red.lighten(20);
 *
 * console.log(red.toHex());   // '#ff0000' — unchanged
 * console.log(light.toHex()); // '#ff6666'
 * ```
 */
export class MooColor {
  #model: AcceptedModel;
  #values: number[];
  #alpha: number;

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
  static mix(
    color1: MooColor | ColorInput | Color,
    color2: MooColor | ColorInput | Color,
    percentOf1 = 50,
  ): MooColor {
    const c1 = color1 instanceof MooColor ? color1 : new MooColor(color1);
    const c2 = color2 instanceof MooColor ? color2 : new MooColor(color2);
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
  static random(options: RandomOptions = {}): MooColor {
    const { hue, white, black } = options;
    const vals = [hue, white, black].map((x, i) => {
      if (typeof x === 'number') return x;
      if (Array.isArray(x)) {
        const precision = i === 0 ? 0 : 2;
        return getRandom(Math.min(...x), Math.max(...x), precision);
      }
      return i === 0 ? getRandom(0, 360) : getRandom(0, 100, 2);
    });
    return new MooColor({
      model: 'hwb',
      values: Converter.resolveHwb(
        degree(vals[0]!),
        clamp(vals[1]!, 0, 100),
        clamp(vals[2]!, 0, 100),
      ),
      alpha: 1,
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
  constructor(color?: ColorInput | Color) {
    if (typeof color === 'object' && color !== null && 'model' in color) {
      this.#model = color.model;
      this.#values = [...color.values];
      this.#alpha = resolveAlpha(color.alpha);
    } else {
      const str = typeof color === 'string' ? color : '#000';
      const parsed = parseColor(str);
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
  getColor(): Color {
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
  getColorAs(model: AcceptedModel): Color {
    if (this.#model === model) return this.getColor();
    return {
      model,
      values: this.#convert(this.#values, this.#model, model),
      alpha: this.#alpha,
    };
  }

  /** Returns the current color model identifier. */
  getModel(): AcceptedModel {
    return this.#model;
  }

  /**
   * Returns a **new** `MooColor` whose internal model is changed to `model`.
   *
   * @param model - Target color model.
   */
  changeModel(model: AcceptedModel): MooColor {
    if (this.#model === model) return this.clone();
    return new MooColor(this.getColorAs(model));
  }

  /** Returns the alpha (opacity) channel, 0–1. */
  getAlpha(): number {
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
  setAlpha(alpha: number): MooColor {
    return new MooColor({
      model: this.#model,
      values: [...this.#values],
      alpha: clamp(alpha, 0, 1),
    });
  }

  /**
   * Converts a standalone {@link Color} data object to another model.
   *
   * @param color - Source color data.
   * @param model - Target model.
   * @returns A new {@link Color} in the target model.
   */
  convert(color: Color, model: AcceptedModel): Color {
    return {
      model,
      values: this.#convert(color.values, color.model, model),
      alpha: color.alpha,
    };
  }

  /** Creates an independent copy of this color. */
  clone(): MooColor {
    return new MooColor(this.getColor());
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
  get brightness(): number {
    const rgb = this.#toRgbValues();
    const r = rgb[0] ?? 0;
    const g = rgb[1] ?? 0;
    const b = rgb[2] ?? 0;
    return (r * 299 + g * 587 + b * 114) / 1000;
  }

  /** `true` when {@link brightness} ≥ 128. */
  get isLight(): boolean {
    return this.brightness >= 128;
  }

  /** `true` when {@link brightness} < 128. */
  get isDark(): boolean {
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
  get luminance(): number {
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
  contrastRatioWith(color: MooColor): number {
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
  isContrastEnough(color: MooColor): boolean {
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
  toString(model?: AcceptedModel | 'hex', ...args: unknown[]): string {
    const m = model ?? this.#model;
    switch (m) {
      case 'hex': return this.toHex(args[0] as HexMode | undefined);
      case 'hwb': return this.toHwb();
      case 'hsl': return this.toHsl();
      case 'hsv': return this.toHsv();
      case 'cmyk': return this.toCmyk();
      default: return this.toRgb(args[0] as RgbMode | undefined);
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
  toHex(mode: HexMode = 'full'): string {
    const rgb = this.#toRgbValues().map(Math.round);
    const r = rgb[0] ?? 0;
    const g = rgb[1] ?? 0;
    const b = rgb[2] ?? 0;
    const a = this.#alpha === 1 ? null : this.#alpha;

    if (mode === 'name') {
      for (const [name, vals] of Object.entries(Names)) {
        if (a === null && arrayIsEqual(vals as number[], [r, g, b])) return name;
      }
      return `#${Converter.rgbToHex(r, g, b, a, true)}`;
    }

    const enableShort = mode === 'short';
    return `#${Converter.rgbToHex(r, g, b, a, enableShort)}`;
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
  toRgb(mode: RgbMode = 'default'): string {
    const rgb = this.#toRgbValues().map(Math.round);
    const r = rgb[0] ?? 0;
    const g = rgb[1] ?? 0;
    const b = rgb[2] ?? 0;
    let parts: (number | string)[] = [r, g, b];
    if (mode === 'percent') {
      parts = [r, g, b].map(x => `${(x / 255) * 100}%`);
    }
    return this.#alpha === 1
      ? `rgb(${parts[0]}, ${parts[1]}, ${parts[2]})`
      : `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, ${this.#alpha})`;
  }

  /**
   * HWB notation.
   * @see https://www.w3.org/TR/css-color-4/#the-hwb-notation
   */
  toHwb(): string {
    const [h, w, b] = this.#getValuesAs('hwb').map(x => decimal(x, 2));
    const a = this.#alpha === 1 ? '' : `, ${this.#alpha}`;
    return `hwb(${h}, ${w}%, ${b}%${a})`;
  }

  /**
   * HSL / HSLA notation.
   * @see https://www.w3.org/TR/css-color-4/#the-hsl-notation
   */
  toHsl(): string {
    const [h, s, l] = this.#getValuesAs('hsl').map(x => decimal(x, 2));
    return this.#alpha === 1
      ? `hsl(${h}, ${s}%, ${l}%)`
      : `hsla(${h}, ${s}%, ${l}%, ${this.#alpha})`;
  }

  /**
   * HSV / HSVA notation (non‐standard; same shape as HSL).
   */
  toHsv(): string {
    const [h, s, v] = this.#getValuesAs('hsv').map(x => decimal(x, 2));
    return this.#alpha === 1
      ? `hsv(${h}, ${s}%, ${v}%)`
      : `hsva(${h}, ${s}%, ${v}%, ${this.#alpha})`;
  }

  /**
   * CMYK notation.
   * @see https://www.w3.org/TR/css-color-4/#cmyk-colors
   */
  toCmyk(): string {
    const [c, m, y, k] = this.#getValuesAs('cmyk').map(x => decimal(x, 2));
    const a = this.#alpha === 1 ? '' : `, ${this.#alpha}`;
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
  lighten(amount: number): MooColor {
    return this.#manipulate('hsl', (h, s, l) => [h, s, clamp(l + amount, 0, 100)]);
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
  darken(amount: number): MooColor {
    return this.#manipulate('hsl', (h, s, l) => [h, s, clamp(l - amount, 0, 100)]);
  }

  /**
   * Increase saturation (HSL model).
   *
   * @param amount - Value to add, 0–100.
   */
  saturate(amount: number): MooColor {
    return this.#manipulate('hsl', (h, s, l) => [h, clamp(s + amount, 0, 100), l]);
  }

  /**
   * Decrease saturation (HSL model).
   *
   * @param amount - Value to subtract, 0–100.
   */
  desaturate(amount: number): MooColor {
    return this.#manipulate('hsl', (h, s, l) => [h, clamp(s - amount, 0, 100), l]);
  }

  /**
   * Remove all saturation — convert to grayscale.
   */
  grayscale(): MooColor {
    return this.#manipulate('hsl', (h, _s, l) => [h, 0, l]);
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
  whiten(amount: number): MooColor {
    return this.#manipulate(
      'hwb',
      (h, w, b) => Converter.resolveHwb(h, clamp(w + amount, 0, 100), b),
    );
  }

  /**
   * Increase blackness (HWB model).
   *
   * @param amount - Value to add, −100 – 100.
   */
  blacken(amount: number): MooColor {
    return this.#manipulate(
      'hwb',
      (h, w, b) => Converter.resolveHwb(h, w, clamp(b + amount, 0, 100)),
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
  rotate(d: number): MooColor {
    return this.#manipulate('hsl', (h, s, l) => [degree(h + d), s, l]);
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
  mix(color: MooColor, percent = 50): MooColor {
    const p = percent / 100;
    const c1 = this.#toRgbValues();
    const c2 = color.#toRgbValues();
    return new MooColor({
      model: 'rgb',
      values: c1.map((v, i) => v + (c2[i]! - v) * p),
      alpha: this.#alpha + (color.#alpha - this.#alpha) * p,
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
  complement(): MooColor {
    return this.#manipulate('hsl', (h, s, l) => [degree(h + 180), s, l]);
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
  invert(percent = 100): MooColor {
    const p = percent / 100;
    return this.#manipulate('rgb', (r, g, b) =>
      [r, g, b].map(x => Math.round(Math.abs(255 * p - x))),
    );
  }

  // -----------------------------------------------------------------------
  // Private helpers
  // -----------------------------------------------------------------------

  #toRgbValues(): number[] {
    if (this.#model === 'rgb') return [...this.#values];
    return this.#convert(this.#values, this.#model, 'rgb');
  }

  #getValuesAs(model: AcceptedModel): number[] {
    if (this.#model === model) return [...this.#values];
    return this.#convert(this.#values, this.#model, model);
  }

  #manipulate(asModel: AcceptedModel, callback: ManipulateFn): MooColor {
    const vals = this.#getValuesAs(asModel);
    const newVals = callback(...vals);
    const finalVals =
      asModel === this.#model
        ? newVals
        : this.#convert(newVals, asModel, this.#model);
    return new MooColor({
      model: this.#model,
      values: finalVals,
      alpha: this.#alpha,
    });
  }

  #convert(values: number[], from: AcceptedModel, to: AcceptedModel): number[] {
    if (from === to) return [...values];

    // Direct HSV ↔ HWB (avoids RGB round‐trip)
    if (from === 'hsv' && to === 'hwb') {
      return Converter.hsvToHwb(values[0]!, values[1]!, values[2]!);
    }
    if (from === 'hwb' && to === 'hsv') {
      return Converter.hwbToHsv(values[0]!, values[1]!, values[2]!);
    }

    // All other conversions go through RGB as hub
    let rgb: number[];
    switch (from) {
      case 'rgb':  rgb = values; break;
      case 'hsl':  rgb = Converter.hslToRgb(values[0]!, values[1]!, values[2]!); break;
      case 'hwb':  rgb = Converter.hwbToRgb(values[0]!, values[1]!, values[2]!); break;
      case 'hsv':  rgb = Converter.hsvToRgb(values[0]!, values[1]!, values[2]!); break;
      case 'cmyk': rgb = Converter.cmykToRgb(values[0]!, values[1]!, values[2]!, values[3]!); break;
      default:     rgb = values;
    }

    switch (to) {
      case 'rgb':  return rgb;
      case 'hsl':  return Converter.rgbToHsl(rgb[0]!, rgb[1]!, rgb[2]!);
      case 'hwb':  return Converter.rgbToHwb(rgb[0]!, rgb[1]!, rgb[2]!);
      case 'hsv':  return Converter.rgbToHsv(rgb[0]!, rgb[1]!, rgb[2]!);
      case 'cmyk': return Converter.rgbToCmyk(rgb[0]!, rgb[1]!, rgb[2]!);
      default:     return rgb;
    }
  }
}

export default MooColor;

