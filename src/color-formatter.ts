/**
 * Color Formatters.
 */
interface ColorConvertible {
  toRgb: () => string;
  hslToRgb: (hue: number, sat: number, light: number) => void;
  hwbToRgb: (hue: number, white: number, black: number) => void;
  cmykToRgb: (c: number, m: number, y: number, k: number) => void;
  rgbToHsl: (r: number, g: number, b: number) => void;
  rgbToHwb: (r: number, g: number, b: number) => void;
  rgbToCmyk: (r: number, g: number, b: number) => void;
}

export default class ColorFormatter implements ColorConvertible {
  toRgb(): string {
    return 'moo';
  }
}
