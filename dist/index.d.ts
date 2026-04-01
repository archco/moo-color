/**
 * Supported color model identifiers.
 */
type AcceptedModel = 'rgb' | 'hwb' | 'hsl' | 'hsv' | 'cmyk';
/** Mode for hex output formatting. */
type HexMode = 'full' | 'short' | 'name';
/** Mode for RGB output formatting. */
type RgbMode = 'default' | 'percent';
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
type HexColorString = `#${string}`;
/**
 * An RGB/RGBA function string.
 *
 * @example
 * ```ts
 * const rgb: RgbColorString = 'rgb(255, 0, 0)';
 * const rgba: RgbColorString = 'rgba(255, 0, 0, 0.5)';
 * ```
 */
type RgbColorString = `rgb(${string})` | `rgba(${string})`;
/**
 * An HSL/HSLA function string.
 *
 * @example
 * ```ts
 * const hsl: HslColorString = 'hsl(0, 100%, 50%)';
 * ```
 */
type HslColorString = `hsl(${string})` | `hsla(${string})`;
/** An HWB function string. e.g. `'hwb(0, 0%, 0%)'` */
type HwbColorString = `hwb(${string})`;
/** An HSV/HSVA function string. e.g. `'hsv(0, 100%, 100%)'` */
type HsvColorString = `hsv(${string})` | `hsva(${string})`;
/** A CMYK function string. e.g. `'cmyk(0%, 100%, 100%, 0%)'` */
type CmykColorString = `cmyk(${string})`;
/**
 * Any recognized CSS-like color string format.
 * Includes hex, rgb(a), hsl(a), hwb, hsv(a), and cmyk notations.
 */
type ColorString = HexColorString | RgbColorString | HslColorString | HwbColorString | HsvColorString | CmykColorString;
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
type ColorInput = ColorString | (string & {});
/** A plain data object that carries color information. */
interface ColorData {
    readonly model: AcceptedModel;
    values: number[];
    alpha?: number;
}
/** Alias for {@link ColorData}. */
type Color = ColorData;
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
interface RandomOptions {
    /** Hue 0–360. Pass a `[min, max]` tuple for a random range. */
    hue?: number | [min: number, max: number];
    /** Whiteness 0–100. Pass a `[min, max]` tuple for a random range. */
    white?: number | [min: number, max: number];
    /** Blackness 0–100. Pass a `[min, max]` tuple for a random range. */
    black?: number | [min: number, max: number];
}

/**
 * A modern, **immutable** color manipulation class.
 *
 * Every manipulation method returns a **new** `MooColor` instance —
 * the original is never mutated. This makes the class safe for
 * React / Vue state, memoization, and concurrent use.
 *
 * @example
 * ```ts
 * import { MooColor } from 'moo-color';
 *
 * const red = new MooColor('#ff0000');
 * const light = red.lighten(20);
 *
 * console.log(red.toHex());   // '#ff0000' — unchanged
 * console.log(light.toHex()); // '#ff6666'
 * ```
 */
declare class MooColor {
    #private;
    /**
     * Mix two colors together.
     *
     * @param color1 - First color (string, {@link Color} data, or `MooColor`).
     * @param color2 - Second color.
     * @param percentOf1 - Weight of the **first** color, 0–100. Default `50`.
     * @returns A new blended `MooColor`.
     *
     * @example
     * ```ts
     * MooColor.mix('#ff0000', '#ffff00', 50); // orange
     * ```
     */
    static mix(color1: MooColor | ColorInput | Color, color2: MooColor | ColorInput | Color, percentOf1?: number): MooColor;
    /**
     * Generate a random color in the HWB space.
     *
     * @param options - Optional constraints for hue / whiteness / blackness.
     * @returns A new randomly‐generated `MooColor`.
     *
     * @example
     * ```ts
     * MooColor.random();                         // fully random
     * MooColor.random({ hue: [0, 180] });        // warm‐ish hue
     * MooColor.random({ white: 50, black: 10 }); // fixed tint
     * ```
     */
    static random(options?: RandomOptions): MooColor;
    /**
     * Create a new `MooColor`.
     *
     * @param color - A CSS color string, a {@link Color} data object, or
     *   `undefined` (defaults to black `#000`).
     * @throws {Error} When the string cannot be parsed.
     *
     * @example
     * ```ts
     * new MooColor('#ff0000');
     * new MooColor('rgb(255, 0, 0)');
     * new MooColor('hsl(120, 50%, 100%)');
     * new MooColor({ model: 'rgb', values: [255, 0, 0], alpha: 1 });
     * new MooColor(); // black
     * ```
     */
    constructor(color?: ColorInput | Color);
    /**
     * Returns the underlying color data as a plain object.
     *
     * The returned object is a **copy** — mutating it will not
     * affect this instance.
     *
     * @example
     * ```ts
     * new MooColor('#f00').getColor();
     * // → { model: 'rgb', values: [255, 0, 0], alpha: 1 }
     * ```
     */
    getColor(): Color;
    /**
     * Returns color data converted to the given model.
     *
     * @param model - Target color model.
     *
     * @example
     * ```ts
     * new MooColor('#f00').getColorAs('hsl');
     * // → { model: 'hsl', values: [0, 100, 50], alpha: 1 }
     * ```
     */
    getColorAs(model: AcceptedModel): Color;
    /** Returns the current color model identifier. */
    getModel(): AcceptedModel;
    /**
     * Returns a **new** `MooColor` whose internal model is changed to `model`.
     *
     * @param model - Target color model.
     */
    changeModel(model: AcceptedModel): MooColor;
    /** Returns the alpha (opacity) channel, 0–1. */
    getAlpha(): number;
    /**
     * Returns a **new** `MooColor` with the given alpha value.
     *
     * @param alpha - Opacity, 0 (transparent) – 1 (opaque).
     *
     * @example
     * ```ts
     * new MooColor('red').setAlpha(0.5).toRgb();
     * // → 'rgba(255, 0, 0, 0.5)'
     * ```
     */
    setAlpha(alpha: number): MooColor;
    /**
     * Converts a standalone {@link Color} data object to another model.
     *
     * @param color - Source color data.
     * @param model - Target model.
     * @returns A new {@link Color} in the target model.
     */
    convert(color: Color, model: AcceptedModel): Color;
    /** Creates an independent copy of this color. */
    clone(): MooColor;
    /**
     * Perceived brightness on a 0–255 scale (W3C AERT formula).
     *
     * @see https://www.w3.org/TR/AERT/#color-contrast
     *
     * @example
     * ```ts
     * new MooColor('#808080').brightness; // 128
     * ```
     */
    get brightness(): number;
    /** `true` when {@link brightness} ≥ 128. */
    get isLight(): boolean;
    /** `true` when {@link brightness} < 128. */
    get isDark(): boolean;
    /**
     * Relative luminance per **WCAG 2.1** (0 – 1).
     *
     * Unlike v1, this implementation correctly applies **sRGB gamma
     * linearization** before weighting channels:
     *
     * ```
     * L = 0.2126 × R_lin + 0.7152 × G_lin + 0.0722 × B_lin
     * ```
     *
     * where `R_lin = linearize(R / 255)` etc.
     *
     * @see https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
     *
     * @example
     * ```ts
     * new MooColor('#000').luminance; // 0
     * new MooColor('#fff').luminance; // 1
     * new MooColor('#808080').luminance; // ≈ 0.2159 (NOT 0.502)
     * ```
     */
    get luminance(): number;
    /**
     * WCAG 2.1 contrast ratio against another color (range 1–21).
     *
     * @see https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
     *
     * @example
     * ```ts
     * new MooColor('#000').contrastRatioWith(new MooColor('#fff')); // 21
     * ```
     */
    contrastRatioWith(color: MooColor): number;
    /**
     * Returns `true` when the contrast ratio with `color` meets the
     * WCAG 2.1 **AA** requirement for normal text (≥ 4.5 : 1).
     *
     * @see https://www.w3.org/TR/WCAG21/#contrast-minimum
     */
    isContrastEnough(color: MooColor): boolean;
    /**
     * Formats the color in the given model's notation.
     * Defaults to the current model.
     *
     * @param model - Output notation (`'rgb'`, `'hex'`, `'hsl'`, `'hwb'`, `'hsv'`, `'cmyk'`).
     * @param args  - Forwarded to the underlying format method.
     *
     * @example
     * ```ts
     * new MooColor('#f00').toString();         // 'rgb(255, 0, 0)'
     * new MooColor('#f00').toString('hex');     // '#ff0000'
     * new MooColor('#f00').toString('hsl');     // 'hsl(0, 100%, 50%)'
     * ```
     */
    toString(model?: AcceptedModel | 'hex', ...args: unknown[]): string;
    /**
     * Hex notation (`#rrggbb` / `#rrggbbaa`).
     *
     * @param mode - `'full'` (default), `'short'` (`#rgb`), or `'name'` (CSS name if available).
     * @see https://www.w3.org/TR/css-color-4/#hex-notation
     *
     * @example
     * ```ts
     * new MooColor('red').toHex();        // '#ff0000'
     * new MooColor('red').toHex('short'); // '#f00'
     * new MooColor('red').toHex('name');  // 'red'
     * ```
     */
    toHex(mode?: HexMode): string;
    /**
     * RGB / RGBA notation.
     *
     * @param mode - `'default'` or `'percent'`.
     * @see https://www.w3.org/TR/css-color-4/#rgb-functions
     *
     * @example
     * ```ts
     * new MooColor('#f00').toRgb();          // 'rgb(255, 0, 0)'
     * new MooColor('#f00').toRgb('percent'); // 'rgb(100%, 0%, 0%)'
     * ```
     */
    toRgb(mode?: RgbMode): string;
    /**
     * HWB notation.
     * @see https://www.w3.org/TR/css-color-4/#the-hwb-notation
     */
    toHwb(): string;
    /**
     * HSL / HSLA notation.
     * @see https://www.w3.org/TR/css-color-4/#the-hsl-notation
     */
    toHsl(): string;
    /**
     * HSV / HSVA notation (non‐standard; same shape as HSL).
     */
    toHsv(): string;
    /**
     * CMYK notation.
     * @see https://www.w3.org/TR/css-color-4/#cmyk-colors
     */
    toCmyk(): string;
    /**
     * Increase lightness (HSL model).
     *
     * @param amount - Value to add, 0–100.
     *
     * @example
     * ```ts
     * new MooColor('red').lighten(20).toRgb(); // 'rgb(255, 102, 102)'
     * ```
     */
    lighten(amount: number): MooColor;
    /**
     * Decrease lightness (HSL model).
     *
     * @param amount - Value to subtract, 0–100.
     *
     * @example
     * ```ts
     * new MooColor('red').darken(20).toRgb(); // 'rgb(153, 0, 0)'
     * ```
     */
    darken(amount: number): MooColor;
    /**
     * Increase saturation (HSL model).
     *
     * @param amount - Value to add, 0–100.
     */
    saturate(amount: number): MooColor;
    /**
     * Decrease saturation (HSL model).
     *
     * @param amount - Value to subtract, 0–100.
     */
    desaturate(amount: number): MooColor;
    /**
     * Remove all saturation — convert to grayscale.
     */
    grayscale(): MooColor;
    /**
     * Increase whiteness (HWB model).
     *
     * @param amount - Value to add, −100 – 100.
     *
     * @example
     * ```ts
     * new MooColor('hwb(120, 40%, 40%)').whiten(20).toHwb();
     * // 'hwb(120, 60%, 40%)'
     * ```
     */
    whiten(amount: number): MooColor;
    /**
     * Increase blackness (HWB model).
     *
     * @param amount - Value to add, −100 – 100.
     */
    blacken(amount: number): MooColor;
    /**
     * Rotate the hue by `d` degrees.
     *
     * @param d - Degrees to rotate (negative = counter‐clockwise).
     *
     * @example
     * ```ts
     * new MooColor('hsl(0, 100%, 50%)').rotate(120).toHex('short');
     * // '#0f0'
     * ```
     */
    rotate(d: number): MooColor;
    /**
     * Blend this color with another.
     *
     * @param color   - The color to blend with.
     * @param percent - Weight of `color`, 0–100. Default `50`.
     * @returns A new blended `MooColor`.
     *
     * @example
     * ```ts
     * const red = new MooColor('rgb(255, 0, 0)');
     * const yellow = new MooColor('rgb(255, 255, 0)');
     * red.mix(yellow, 50).toString(); // 'rgb(255, 128, 0)'
     * ```
     */
    mix(color: MooColor, percent?: number): MooColor;
    /**
     * Complementary color (hue + 180°).
     *
     * @example
     * ```ts
     * new MooColor('hsl(30, 100%, 50%)').complement().toHsl();
     * // 'hsl(210, 100%, 50%)'
     * ```
     */
    complement(): MooColor;
    /**
     * Invert (negate) the color in RGB space.
     *
     * @param percent - Degree of inversion, 0–100. Default `100`.
     *
     * @example
     * ```ts
     * new MooColor('#0ff').invert().toHex('short'); // '#f00'
     * ```
     */
    invert(percent?: number): MooColor;
}

export { type AcceptedModel, type CmykColorString, type Color, type ColorData, type ColorInput, type ColorString, type HexColorString, type HexMode, type HslColorString, type HsvColorString, type HwbColorString, MooColor, type RandomOptions, type RgbColorString, type RgbMode, MooColor as default };
