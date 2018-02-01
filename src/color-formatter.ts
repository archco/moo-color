import { AcceptedModel, Color, ColorSettable } from './color';
import * as Converter from './color-converter';

// Accepted color models: 'rgb'|'hwb'|'hsl'|'hsv'|'cmyk' + 'hex'
export interface ColorRepresentable {
  color?: Color;
  toString(model?: AcceptedModel|'hex', ...args: any[]): string;
  toHex(enableShort?: boolean): string;
  toRgb(): string;
  toHwb(): string;
  toHsl(): string;
  toHsv(): string;
  toCmyk(): string;
}

export class ColorFormatter implements ColorSettable, ColorRepresentable {
  color?: Color;

  setColor(color: Color): this {
    this.color = color;
    return this;
  }

  getColor(): Color {
    return this.color;
  }

  getModel(): AcceptedModel|undefined {
    return this.color ? this.color.model : undefined;
  }

  changeModel(model: AcceptedModel): this {
    return this.setColor(this.convert(this.color, model));
  }

  getAlpha(): number {
    return this.color.alpha;
  }

  setAlpha(alpha: number): this {
    this.color.alpha = alpha;
    return this;
  }

  convert(color: Color, m: AcceptedModel): Color {
    const newColor: Color = {
      model: m,
      values: [],
      alpha: color.alpha,
    };
    switch (color.model) {
      case 'rgb': newColor.values = this.convertFromRgb(color.values, m); break;
      case 'hwb': newColor.values = this.convertFromHwb(color.values, m); break;
      case 'hsl': newColor.values = this.convertFromHsl(color.values, m); break;
      case 'hsv': newColor.values = this.convertFromHsv(color.values, m); break;
      case 'cmyk': newColor.values = this.convertFromCmyk(color.values, m); break;
    }
    if (!newColor.values.length) {
      throw new Error('Converting Error!');
    }
    return newColor;
  }

  toString(model: AcceptedModel|'hex', ...args: any[]): string {
    // TODO:
    return '';
  }

  toHex(enableShort?: boolean): string {
    // TODO:
    return '';
  }

  toRgb(): string {
    // TODO:
    return '';
  }

  toHwb(): string {
    // TODO:
    return '';
  }

  toHsl(): string {
    // TODO:
    return '';
  }

  toHsv(): string {
    // TODO:
    return '';
  }

  toCmyk(): string {
    // TODO:
    return '';
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
