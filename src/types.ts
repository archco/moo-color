/**
 * Supported color model identifiers.
 */
export type AcceptedModel = 'rgb' | 'hwb' | 'hsl' | 'hsv' | 'cmyk';

/** Mode for hex output formatting. */
export type HexMode = 'full' | 'short' | 'name';

/** Mode for RGB output formatting. */
export type RgbMode = 'default' | 'percent';

// ---------------------------------------------------------------------------
// Template Literal Types — static validation for color string formats
// ---------------------------------------------------------------------------

/**
 * A hex color string starting with `#`.
 *
 * @example
 * ```ts
 * const hex: HexColorString = '#ff0000';
 * const shortHex: HexColorString = '#f00';
 * const withAlpha: HexColorString = '#ff000080';
 * ```
 */
export type HexColorString = `#${string}`;

/**
 * An RGB/RGBA function string.
 *
 * @example
 * ```ts
 * const rgb: RgbColorString = 'rgb(255, 0, 0)';
 * const rgba: RgbColorString = 'rgba(255, 0, 0, 0.5)';
 * ```
 */
export type RgbColorString = `rgb(${string})` | `rgba(${string})`;

/**
 * An HSL/HSLA function string.
 *
 * @example
 * ```ts
 * const hsl: HslColorString = 'hsl(0, 100%, 50%)';
 * ```
 */
export type HslColorString = `hsl(${string})` | `hsla(${string})`;

/** An HWB function string. e.g. `'hwb(0, 0%, 0%)'` */
export type HwbColorString = `hwb(${string})`;

/** An HSV/HSVA function string. e.g. `'hsv(0, 100%, 100%)'` */
export type HsvColorString = `hsv(${string})` | `hsva(${string})`;

/** A CMYK function string. e.g. `'cmyk(0%, 100%, 100%, 0%)'` */
export type CmykColorString = `cmyk(${string})`;

/**
 * Any recognized CSS-like color string format.
 * Includes hex, rgb(a), hsl(a), hwb, hsv(a), and cmyk notations.
 */
export type ColorString =
  | HexColorString
  | RgbColorString
  | HslColorString
  | HwbColorString
  | HsvColorString
  | CmykColorString;

/**
 * Valid color input accepted by the `MooColor` constructor.
 *
 * Includes all typed color string formats. The `(string & {})` arm allows
 * named CSS colors (`'red'`, `'blue'`, …) and `'transparent'` while still
 * providing autocomplete for the specific template literal patterns.
 *
 * @example
 * ```ts
 * const a: ColorInput = '#ff0000';
 * const b: ColorInput = 'rgb(255, 0, 0)';
 * const c: ColorInput = 'red';
 * ```
 */
export type ColorInput = ColorString | (string & {});

// ---------------------------------------------------------------------------
// Color data
// ---------------------------------------------------------------------------

/** A plain data object that carries color information. */
export interface ColorData {
  readonly model: AcceptedModel;
  values: number[];
  alpha?: number;
}

/** Alias for {@link ColorData}. */
export type Color = ColorData;

/**
 * Configuration for {@link MooColor.random}.
 *
 * Each property accepts either a fixed number or a `[min, max]` tuple
 * to produce a random value within the range.
 *
 * @example
 * ```ts
 * MooColor.random({ hue: [0, 180], white: 50 });
 * ```
 */
export interface RandomOptions {
  /** Hue 0–360. Pass a `[min, max]` tuple for a random range. */
  hue?: number | [min: number, max: number];
  /** Whiteness 0–100. Pass a `[min, max]` tuple for a random range. */
  white?: number | [min: number, max: number];
  /** Blackness 0–100. Pass a `[min, max]` tuple for a random range. */
  black?: number | [min: number, max: number];
}
