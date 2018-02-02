import {
  Color,
  ColorModifiable,
  ColorStateAccessible,
} from './color';
import { ColorFormatter } from './color-formatter';
import parser from './input-parser';

export class MooColor extends ColorFormatter implements ColorStateAccessible {
  constructor(color: any) {
    super();
    this.setColorByString(color);
  }

  setColorByString(str: string): this {
    const color: Color = parser(str);
    return this.setColor(color);
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
}
