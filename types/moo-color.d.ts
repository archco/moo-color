import {
  AcceptedModel,
  Color,
  ColorModifiable,
  ColorStateAccessible,
} from './color';
import { ColorFormatter } from './color-formatter';

export * from './color';

type manipulateFn = (...args: number[]) => number[];

export class MooColor extends ColorFormatter implements ColorModifiable<MooColor>, ColorStateAccessible {
  static mix(color1: string|MooColor, color2: string|MooColor, percentOf1?: number): MooColor;

  /**
   * Color brightness. 0-255 (It based RGB)
   * @see https://www.w3.org/TR/AERT/#color-contrast
   * @readonly
   * @type {number}
   */
  readonly brightness: number;

  /**
   * Returns whether color is dark or not.
   * @readonly
   * @type {boolean}
   */
  readonly isDark: boolean;

  /**
   * Returns whether color is light or not.
   * @readonly
   * @type {boolean}
   */
  readonly isLight: boolean;

  /**
   * Returns luminance value of color.
   * @see https://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast-contrast
   * @readonly
   * @type {number}
   */
  readonly luminance: number;

  /**
   * Creates an instance of MooColor.
   * @param {*} [color] color string. e.g. '#ff0000' 'rgba(255, 0, 0, .5)' 'hsl(120, 50%, 100%)'
   */
  constructor(color?: any);

  setColorByParser(str: string): this;
  clone(): MooColor;

  /**
   * Returns contrast ratio with other color. range from 0 to 21.
   * @see https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html#contrast-ratiodef
   * @param {MooColor} color
   * @returns {number} 0-21
   */
  contrastRatioWith(color: MooColor): number;

  /**
   * Return true if contrast ratio >= 4.5
   * @param {MooColor} color
   * @returns {boolean}
   */
  isContrastEnough(color: MooColor): boolean;

  /**
   * Increase lightness.
   * @param {number} amount 0-100
   * @returns {this}
   */
  lighten(amount: number): this;

  /**
   * Decrease lightness.
   * @param {number} amount 0-100
   * @returns {this}
   */
  darken(amount: number): this;

  /**
   * Increase saturation.
   * @param {number} amount 0-100
   * @returns {this}
   */
  saturate(amount: number): this;

  /**
   * Decrease saturation.
   * @param {number} amount 0-100
   * @returns {this}
   */
  desaturate(amount: number): this;

  /**
   * Set saturation to 0.
   * @returns {this}
   */
  grayscale(): this;

  /**
   * Modify whiteness.
   * @param {number} amount -100-100
   * @returns {this}
   */
  whiten(amount: number): this;

  /**
   * Modify blackness.
   * @param {number} amount -100-100
   * @returns {this}
   */
  blacken(amount: number): this;

  /**
   * Rotate hue value.
   * @param {number} d degree 0-360
   * @returns {this}
   */
  rotate(d: number): this;

  /**
   * Mix two colors.
   * @param {MooColor} color the color to mixed.
   * @param {number} [percent=50] percentage of color to be mixed.
   * @returns {MooColor}
   */
  mix(color: MooColor, percent?: number): MooColor;;
}
