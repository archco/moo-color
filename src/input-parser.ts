import type { Color } from './types';
import { resolveHwb } from './color-converter';
import Names from './color-names';
import { clamp, degree, resolveAlpha } from './utils';

/**
 * Parse a color string into a {@link Color} data object.
 *
 * Handles CSS named colors, `transparent`, hex (`#rgb`, `#rrggbb`, `#rrggbbaa`),
 * and functional notations: `rgb()`, `hsl()`, `hwb()`, `hsv()`, `cmyk()`.
 *
 * @param input - Any parsable color string (see docs/README.md for the full list).
 * @returns A {@link Color} object, or `null` if the string could not be parsed.
 */
export default function inputParser(input: string): Color|null {
  if (input in Names) {
    // Named colors.
    return {
      model: 'rgb',
      values: Names[input]!,
      alpha: 1,
    };
  } else if (input === 'transparent') {
    // 'transparent'.
    return {
      model: 'rgb',
      values: [0, 0, 0],
      alpha: 0,
    };
  } else {
    // parse string.
    const prefix = input.substring(0, 3).toLowerCase();
    switch (prefix) {
      case 'hwb': return parseHwb(input);
      case 'hsl': return parseHsl(input);
      case 'hsv': return parseHsv(input);
      case 'cmy': return parseCmyk(input);
      default: return parseRgb(input);
    }
  }
}

/** Parse `#rrggbb`, `#rgb`, `rgb()`, or `rgba()` strings. */
function parseRgb(input: string): Color|null {
  const hex = /^#?([a-f0-9]{6})([a-f0-9]{2})?$/i;
  const shortHex = /^#?([a-f0-9]{3})([a-f0-9]{1})?$/i;
  const rgba = /^rgba?\s*\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d.]+)\s*)?\)$/;
  const percent = /^rgba?\s*\(\s*([+-]?[\d.]+)%\s*,\s*([+-]?[\d.]+)%\s*,\s*([+-]?[\d.]+)%\s*(?:,\s*([+-]?[\d.]+)\s*)?\)$/;
  const hexToAlpha = (num: string) => Math.round((parseInt(num, 16) / 255) * 100) / 100;
  let values: number[];
  let alpha: number;
  let m: RegExpMatchArray | null;

  if ((m = input.match(hex)) !== null) {
    values = m[1]!.match(/.{2}/g)!.map((x: string) => parseInt(x, 16));
    alpha = m[2] ? hexToAlpha(m[2]) : 1;
  } else if ((m = input.match(shortHex)) !== null) {
    values = m[1]!.match(/.{1}/g)!.map((x: string) => parseInt(x + x, 16));
    alpha = m[2] ? hexToAlpha(m[2]) : 1;
  } else if ((m = input.match(rgba)) !== null) {
    values = [m[1]!, m[2]!, m[3]!].map((x: string) => parseInt(x, 0));
    alpha = resolveAlpha(m[4]);
  } else if ((m = input.match(percent)) !== null) {
    values = [m[1]!, m[2]!, m[3]!].map((x: string) => Math.round(parseFloat(x) * 2.55));
    alpha = resolveAlpha(m[4]);
  } else {
    return null;
  }
  return {
    model: 'rgb',
    values: values.map(x => clamp(x, 0, 255)),
    alpha: clamp(alpha, 0, 1),
  };
}

/** Parse `hsl()` or `hsla()` strings. */
function parseHsl(input: string): Color|null {
  const hsl = /^hsla?\s*\(\s*([+-]?\d*[.]?\d+)(?:deg)?\s*,\s*([+-]?[\d.]+)%\s*,\s*([+-]?[\d.]+)%\s*(?:,\s*([+-]?[\d.]+)\s*)?\)$/i;
  const m = input.match(hsl);
  if (!m) return null;
  return {
    model: 'hsl',
    values: [
      degree(m[1]!),
      clamp(parseFloat(m[2]!), 0, 100),
      clamp(parseFloat(m[3]!), 0, 100),
    ],
    alpha: resolveAlpha(m[4]),
  };
}

/** Parse `hwb()` or `hwba()` strings. Normalizes whiteness + blackness sums over 100. */
function parseHwb(input: string): Color|null {
  const hwb = /^hwba?\s*\(\s*([+-]?\d*[.]?\d+)(?:deg)?\s*,\s*([+-]?[\d.]+)%\s*,\s*([+-]?[\d.]+)%\s*(?:,\s*([+-]?[\d.]+)\s*)?\)$/i;
  const m = input.match(hwb);
  if (!m) return null;
  return {
    model: 'hwb',
    values: resolveHwb(
      degree(m[1]!),
      clamp(parseFloat(m[2]!), 0, 100),
      clamp(parseFloat(m[3]!), 0, 100),
    ),
    alpha: resolveAlpha(m[4]),
  };
}

/** Parse `hsv()` or `hsva()` strings. */
function parseHsv(input: string): Color|null {
  const hsv = /^hsva?\s*\(\s*([+-]?\d*[.]?\d+)(?:deg)?\s*,\s*([+-]?[\d.]+)%\s*,\s*([+-]?[\d.]+)%\s*(?:,\s*([+-]?[\d.]+)\s*)?\)$/i;
  const m = input.match(hsv);
  if (!m) return null;
  return {
    model: 'hsv',
    values: [
      degree(m[1]!),
      clamp(parseFloat(m[2]!), 0, 100),
      clamp(parseFloat(m[3]!), 0, 100),
    ],
    alpha: resolveAlpha(m[4]),
  };
}

/** Parse `cmyk()` strings. */
function parseCmyk(input: string): Color|null {
  const cmyk = /^cmyk\s*\(\s*([+-]?[\d.]+)%\s*,\s*([+-]?[\d.]+)%\s*,\s*([+-]?[\d.]+)%\s*,\s*([+-]?[\d.]+)%\s*(?:,\s*([+-]?[\d.]+)\s*)?\)$/i;
  const m = input.match(cmyk);
  if (!m) return null;
  return {
    model: 'cmyk',
    values: [
      clamp(parseFloat(m[1]!), 0, 100),
      clamp(parseFloat(m[2]!), 0, 100),
      clamp(parseFloat(m[3]!), 0, 100),
      clamp(parseFloat(m[4]!), 0, 100),
    ],
    alpha: resolveAlpha(m[5]),
  };
}
