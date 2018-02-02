import { Color } from './color';
import { ColorFormatter } from './color-formatter';
import parser from './input-parser';

export class MooColor extends ColorFormatter {
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

  diffColor(color: MooColor): number {
    const [r1, g1, b1] = this.getColorAs('rgb').values;
    const [r2, g2, b2] = color.getColorAs('rgb').values;
    return Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2);
  }
}
