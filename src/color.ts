// A data object that includes color data.
export interface ColorData {
  model: AcceptedModel;
  values: number[];
  alpha?: number;
}

export type Color = ColorData;
export type AcceptedModel = 'rgb'|'hwb'|'hsl'|'hsv'|'cmyk';

// It can set or get color data. and also can change color to another model.
export interface ColorSettable {
  color?: Color;

  setColor: (color: Color) => this;
  getColor: () => Color;
  getColorAs: (model: AcceptedModel) => Color;
  getModel: () => AcceptedModel|undefined;
  changeModel: (model: AcceptedModel) => this;
  getAlpha: () => number;
  setAlpha: (alpha: number) => this;
  convert: (color: Color, model: AcceptedModel) => Color;
}

// It can represent color to multiple notations.
// accepted color models: 'rgb'|'hwb'|'hsl'|'hsv'|'cmyk' + 'hex'
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

// It can access color state. such as brightness, luminance..
// @see https://www.w3.org/TR/AERT/#color-contrast
// @see https://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
export interface ColorStateAccessible {
  color?: Color;

  readonly brightness: number;
  readonly isLight: boolean;
  readonly isDark: boolean;
  readonly luminance: number;

  contrastRatioWith(color: ColorStateAccessible): number;
  isContrastEnough(color: ColorStateAccessible): boolean;
}

// It can manipulate color values.
export interface ColorModifiable<T extends ColorSettable> {
  color?: Color;

  lighten(amount: number): this;
  darken(amount: number): this;
  saturate(amount: number): this;
  desaturate(amount: number): this;
  grayscale(): this;
  whiten(amount: number): this;
  blacken(amount: number): this;
  rotate(degree: number): this;
  mix(color: T, percent?: number): T;

  // TODO: add methods: complement, invert
  // @see http://sass-lang.com/documentation/Sass/Script/Functions.html
}
