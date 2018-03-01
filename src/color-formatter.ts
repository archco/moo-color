import {
  AcceptedModel,
  Color,
  ColorRepresentable,
  ColorSettable,
  HexMode,
  RgbMode,
} from './color';
import * as Converter from './color-converter';
import Names from './color-names';
import { arrayIsEqual, decimal, resolveAlpha } from './util/util';

export class ColorFormatter implements ColorSettable, ColorRepresentable {
  color?: Color;
  // In hwb model, whiteness and blackness value's adjust will required.
  protected resolveHwb = Converter.resolveHwb;

  setColor(color: Color): this {
    color.alpha = resolveAlpha(color.alpha);
    this.color = color;
    return this;
  }

  getColor(): Color {
    return this.color;
  }

  getColorAs(model: AcceptedModel): Color {
    return this.color.model === model
      ? this.color
      : this.convert(this.color, model);
  }

  getModel(): AcceptedModel|undefined {
    return this.color ? this.color.model : undefined;
  }

  changeModel(model: AcceptedModel): this {
    return this.color.model === model
      ? this
      : this.setColor(this.convert(this.color, model));
  }

  getAlpha(): number {
    return this.color.alpha;
  }

  setAlpha(alpha: number): this {
    this.color.alpha = alpha;
    return this;
  }

  convert(color: Color, m: AcceptedModel): Color {
    let val: number[];
    switch (color.model) {
      case 'rgb': val = this.convertFromRgb(color.values, m); break;
      case 'hwb': val = this.convertFromHwb(color.values, m); break;
      case 'hsl': val = this.convertFromHsl(color.values, m); break;
      case 'hsv': val = this.convertFromHsv(color.values, m); break;
      case 'cmyk': val = this.convertFromCmyk(color.values, m); break;
    }
    if (!val.length) {
      throw new Error('Converting Error!');
    }
    return {
      model: m,
      values: val,
      alpha: color.alpha,
    };
  }

  toString(model?: AcceptedModel|'hex', ...args: any[]): string {
    model = model ? model : this.color.model;
    switch (model) {
      case 'hex': return this.toHex(...args);
      case 'hwb': return this.toHwb();
      case 'hsl': return this.toHsl();
      case 'hsv': return this.toHsv();
      case 'cmyk': return this.toCmyk();
      default: return this.toRgb(...args);
    }
  }

  /**
   * Represents color as HEX notation.
   * @see https://www.w3.org/TR/css-color-4/#hex-notation
   *
   * @param {HexMode} [mode='full'] 'full'|'short'|'name'
   * @returns {string}
   */
  toHex(mode: HexMode = 'full'): string {
    const color = this.getColorAs('rgb');
    const [r, g, b] = color.values.map(x => Math.round(x));
    const a = color.alpha === 1 ? null : color.alpha;
    const nameOrShort = () => {
      let name = '';
      for (const key of Object.keys(Names)) {
        if (arrayIsEqual(Names[key], [r, g, b])) {
          name = key; break;
        }
      }
      return a === null && name !== '' ? name : `#${Converter.rgbToHex(r, g, b, a, true)}`;
    };
    switch (mode) {
      case 'name': return nameOrShort();
      case 'short': return `#${Converter.rgbToHex(r, g, b, a, true)}`;
      case 'full':
      default: return `#${Converter.rgbToHex(r, g, b, a)}`;
    }
  }

  /**
   * Represents color as RGB notation.
   * @see https://www.w3.org/TR/css-color-4/#rgb-functions
   * @returns {string}
   */
  toRgb(mode: RgbMode = 'default'): string {
    const color = this.getColorAs('rgb');
    let [r, g, b]: number[]|string[] = color.values.map(x => Math.round(x));
    if (mode === 'percent') {
      [r, g, b] = [r, g, b].map(x => `${x / 255 * 100}%`);
    }
    return color.alpha === 1
      ? `rgb(${r}, ${g}, ${b})`
      : `rgba(${r}, ${g}, ${b}, ${color.alpha})`;
  }

  /**
   * Represents color as HWB notation.
   * @see https://www.w3.org/TR/css-color-4/#the-hwb-notation
   * @returns {string} e.g. 'hwb(0, 0%, 0%, 0)'
   */
  toHwb(): string {
    const color = this.getColorAs('hwb');
    const [h, w, b] = color.values.map(x => decimal(x, 2));
    const a = color.alpha === 1 ? '' : `, ${color.alpha}`;
    return `hwb(${h}, ${w}%, ${b}%${a})`;
  }

  /**
   * Represents color as HSL notation.
   * @see https://www.w3.org/TR/css-color-4/#the-hsl-notation
   * @returns {string}
   */
  toHsl(): string {
    const color = this.getColorAs('hsl');
    const [h, s, l] = color.values.map(x => decimal(x, 2));
    return color.alpha === 1
      ? `hsl(${h}, ${s}%, ${l}%)`
      : `hsla(${h}, ${s}%, ${l}%, ${color.alpha})`;
  }

  /**
   * Represents color as HSV notation. This format is similar to HSL.
   * @returns {string}
   */
  toHsv(): string {
    const color = this.getColorAs('hsv');
    const [h, s, v] = color.values.map(x => decimal(x, 2));
    return color.alpha === 1
      ? `hsv(${h}, ${s}%, ${v}%)`
      : `hsva(${h}, ${s}%, ${v}%, ${color.alpha})`;
  }

  /**
   * Represents color as CMYK notation. e.g. 'cmyk(0%, 0%, 0%, 0%)'
   * @see https://www.w3.org/TR/css-color-4/#cmyk-colors
   * @returns {string}
   */
  toCmyk(): string {
    const color = this.getColorAs('cmyk');
    const [c, m, y, k] = color.values.map(x => decimal(x, 2));
    const a = color.alpha === 1 ? '' : `, ${color.alpha}`;
    return `cmyk(${c}%, ${m}%, ${y}%, ${k}%${a})`;
  }

  protected convertFromRgb(values: number[], model: AcceptedModel): number[] {
    const [r, g, b] = values;
    switch (model) {
      case 'rgb': break;
      case 'hwb': values = Converter.rgbToHwb(r, g, b); break;
      case 'hsl': values = Converter.rgbToHsl(r, g, b); break;
      case 'hsv': values = Converter.rgbToHsv(r, g, b); break;
      case 'cmyk': values = Converter.rgbToCmyk(r, g, b); break;
    }
    return values;
  }

  protected convertFromHwb(values: number[], model: AcceptedModel): number[] {
    const [h, w, b] = values;
    const rgb = Converter.hwbToRgb(h, w, b);
    const [red, green, blue] = rgb;
    switch (model) {
      case 'rgb': values = rgb; break;
      case 'hwb': break;
      case 'hsl': values = Converter.rgbToHsl(red, green, blue); break;
      case 'hsv': values = Converter.hwbToHsv(h, w, b); break;
      case 'cmyk': values = Converter.rgbToCmyk(red, green, blue); break;
    }
    return values;
  }

  protected convertFromHsl(values: number[], model: AcceptedModel): number[] {
    const [h, s, l] = values;
    const rgb = Converter.hslToRgb(h, s, l);
    const [red, green, blue] = rgb;
    switch (model) {
      case 'rgb': values = rgb; break;
      case 'hwb': values = Converter.rgbToHwb(red, green, blue); break;
      case 'hsl': break;
      case 'hsv': values = Converter.rgbToHsv(red, green, blue); break;
      case 'cmyk': values = Converter.rgbToCmyk(red, green, blue); break;
    }
    return values;
  }

  protected convertFromHsv(values: number[], model: AcceptedModel): number[] {
    const [h, s, v] = values;
    const rgb = Converter.hsvToRgb(h, s, v);
    const [red, green, blue] = rgb;
    switch (model) {
      case 'rgb': values = rgb; break;
      case 'hwb': values = Converter.hsvToHwb(h, s, v); break;
      case 'hsl': values = Converter.rgbToHsl(red, green, blue); break;
      case 'hsv': break;
      case 'cmyk': values = Converter.rgbToCmyk(red, green, blue); break;
    }
    return values;
  }

  protected convertFromCmyk(values: number[], model: AcceptedModel): number[] {
    const [c, m, y, k] = values;
    const rgb = Converter.cmykToRgb(c, m, y, k);
    const [red, green, blue] = rgb;
    switch (model) {
      case 'rgb': values = rgb; break;
      case 'hwb': values = Converter.rgbToHwb(red, green, blue); break;
      case 'hsl': values = Converter.rgbToHsl(red, green, blue); break;
      case 'hsv': values = Converter.rgbToHsv(red, green, blue); break;
      case 'cmyk': break;
    }
    return values;
  }
}
