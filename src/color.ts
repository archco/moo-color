/**
 * Container that includes color data.
 */
interface ColorData {
  type: 'rgb'|'hsl'|'cmyk'|'hwb';
  values: number[];
  alpha?: number;
}
type Color = ColorData;
export default Color;
