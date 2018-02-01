/**
 * Container that includes color data.
 */
export interface ColorData {
  model: AcceptedModel;
  values: number[];
  alpha?: number;
}

export type Color = ColorData;
export type AcceptedModel = 'rgb'|'hwb'|'hsl'|'hsv'|'cmyk';

export interface ColorSettable {
  color?: Color;

  setColor: (color: Color) => this;
  getColor: () => Color;
  getModel: () => AcceptedModel|undefined;
  changeModel: (model: AcceptedModel) => this;
  getAlpha: () => number;
  setAlpha: (alpha: number) => this;
  convert: (color: Color, model: AcceptedModel) => Color;
}
