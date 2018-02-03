import {
  AcceptedModel,
  Color,
  ColorModifiable,
  ColorStateAccessible,
} from './color';
import { ColorFormatter } from './color-formatter';
import parser from './input-parser';
import { clamp, degree } from './util/util';

type manipulateFn = (...args: number[]) => number[];

export class MooColor extends ColorFormatter implements ColorModifiable<MooColor>, ColorStateAccessible {
  static mix(color1: string|MooColor, color2: string|MooColor, percentOf1: number = 50): MooColor {
    const c1 = (typeof color1 === 'string') ? new MooColor(color1) : color1;
    const c2 = (typeof color2 === 'string') ? new MooColor(color2) : color2;
    return c2.mix(c1, percentOf1);
  }

  constructor(color?: any) {
    super();
    color = color ? color : '#000';
    this.setColorByParser(color);
  }

  setColorByParser(str: string): this {
    const color: Color = parser(str);
    if (!color) {
      throw new Error('parsing error!');
    }
    return this.setColor(color);
  }

  clone(): MooColor {
    return new MooColor().setColor(this.color);
  }

  /**
   * Color brightness. 0-255 (It based RGB)
   * @see https://www.w3.org/TR/AERT/#color-contrast
   * @readonly
   * @type {number}
   */
  get brightness(): number {
    const [r, g, b] = this.getColorAs('rgb').values;
    return ((r * 299) + (g * 587) + (b * 114)) / 1000;
  }

  /**
   * Returns whether color is light or not.
   * @readonly
   * @type {boolean}
   */
  get isLight(): boolean {
    return this.brightness >= 128;
  }

  /**
   * Returns whether color is dark or not.
   * @readonly
   * @type {boolean}
   */
  get isDark(): boolean {
    return this.brightness < 128;
  }

  /**
   * Returns luminance value of color.
   * @see https://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast-contrast
   * @readonly
   * @type {number}
   */
  get luminance(): number {
    const [r, g, b] = this.getColorAs('rgb').values.map(x => x / 255);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  /**
   * Returns contrast ratio with other color. range from 0 to 21.
   * @see https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html#contrast-ratiodef
   * @param {MooColor} color
   * @returns {number} 0-21
   */
  contrastRatioWith(color: MooColor): number {
    const max = Math.max(this.luminance, color.luminance);
    const min = Math.min(this.luminance, color.luminance);
    return (max + 0.05) / (min + 0.05);
  }

  /**
   * Return true if contrast ratio >= 4.5
   * @param {MooColor} color
   * @returns {boolean}
   */
  isContrastEnough(color: MooColor): boolean {
    return this.contrastRatioWith(color) >= 4.5;
  }

  /**
   * Increase lightness.
   * @param {number} amount 0-100
   * @returns {this}
   */
  lighten(amount: number): this {
    return this.manipulate('hsl', (h, s, l) => {
      l = clamp(l + amount, 0, 100);
      return [h, s, l];
    });
  }

  /**
   * Decrease lightness.
   * @param {number} amount 0-100
   * @returns {this}
   */
  darken(amount: number): this {
    return this.manipulate('hsl', (h, s, l) => {
      l = clamp(l - amount, 0, 100);
      return [h, s, l];
    });
  }

  /**
   * Increase saturation.
   * @param {number} amount 0-100
   * @returns {this}
   */
  saturate(amount: number): this {
    return this.manipulate('hsl', (h, s, l) => {
      s = clamp(s + amount, 0, 100);
      return [h, s, l];
    });
  }

  /**
   * Decrease saturation.
   * @param {number} amount 0-100
   * @returns {this}
   */
  desaturate(amount: number): this {
    return this.manipulate('hsl', (h, s, l) => {
      s = clamp(s - amount, 0, 100);
      return [h, s, l];
    });
  }

  /**
   * Set saturation to 0.
   * @returns {this}
   */
  grayscale(): this {
    return this.manipulate('hsl', (h, s, l) => [h, 0, l]);
  }

  /**
   * Modify whiteness.
   * @param {number} amount -100-100
   * @returns {this}
   */
  whiten(amount: number): this {
    return this.manipulate(
      'hwb',
      (h, w, b) => this.resolveHwb(h, clamp(w + amount, 0, 100), b),
    );
  }

  /**
   * Modify blackness.
   * @param {number} amount -100-100
   * @returns {this}
   */
  blacken(amount: number): this {
    return this.manipulate(
      'hwb',
      (h, w, b) => this.resolveHwb(h, w, clamp(b + amount, 0, 100)),
    );
  }

  /**
   * Rotate hue value.
   * @param {number} d degree 0-360
   * @returns {this}
   */
  rotate(d: number): this {
    return this.manipulate('hsl', (h, s, l) => [degree(h + d), s, l]);
  }

  /**
   * Mix two colors.
   * @param {MooColor} color the color to mixed.
   * @param {number} [percent=50] percentage of color to be mixed.
   * @returns {MooColor}
   */
  mix(color: MooColor, percent: number = 50): MooColor {
    percent /= 100;
    const m = this.getModel();
    const c1 = this.getColorAs('rgb');
    const c2 = color.getColorAs('rgb');
    const val = c1.values.map((v, i) => v + (c2.values[i] - v) * percent);
    const a = c1.alpha + (c2.alpha - c1.alpha) * percent;
    return new MooColor().setColor({
      model: 'rgb',
      values: val,
      alpha: a,
    }).changeModel(m);
  }

  protected manipulate(asModel: AcceptedModel, callback: manipulateFn): this {
    const m = this.color.model;
    const color = this.getColorAs(asModel);
    color.values = callback(...color.values);
    return this.setColor(color).changeModel(m);
  }
}
