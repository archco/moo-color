import * as ColorString from 'color-string';
import Color from './color';
import Names from './color-names';

type AcceptedInput = string|string[]|number[]|object;

// TODO: cmyk input parsing.
export default function inputParser(input: AcceptedInput): Color|null {
 if (typeof input === 'string') {
    if (input in Names) {
      // Named colors.
      return {
        type: 'rgb',
        values: Names[input],
        alpha: 1,
      };
    } else if (input === 'transparent') {
      // 'transparent'.
      return {
        type: 'rgb',
        values: [0, 0, 0],
        alpha: 0,
      };
    } else {
      // parse string.
      const prefix = input.substr(0, 3).toLowerCase();
      switch (prefix) {
        case 'hsl':
          return parseHSL(input);
        case 'hwb':
          return parseHWB(input);
        default:
          return parseRGB(input);
      }
    }
  }
}

function parseRGB(input: string): Color|null {
  const hex = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i;
  const shortHex = /^#([a-f0-9]{3})([a-f0-9]{1})?$/i;
  const rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
  // tslint:disable-next-line:max-line-length
  const percent = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
  let match: RegExpMatchArray;
  const result: Color = {
    type: 'rgb',
    values: [0, 0, 0],
    alpha: 1,
  };
  const alpha = (a: string) => Math.round((parseInt(a, 16) / 255) * 100) / 100;

  if (hex.test(input)) {
    match = input.match(hex);
    const hexPart = match[1];
    const alphaPart = match[2];
    result.values = hexPart.match(/.{2}/g).map(x => parseInt(x, 16));
    if (alphaPart) {
      result.alpha = alpha(alphaPart);
    }
  } else if (shortHex.test(input)) {
    match = input.match(shortHex);
    const hexPart = match[1];
    const alphaPart = match[2];
    result.values = hexPart.match(/.{1}/g).map(x => parseInt(x + x, 16));
    if (alphaPart) {
      result.alpha = alpha(alphaPart + alphaPart);
    }
  } else if (rgba.test(input)) {
    match = input.match(rgba);
    result.values = match.slice(1, 4).map(x => parseInt(x, 0));
    if (match[4]) {
      result.alpha = parseFloat(match[4]);
    }
  } else if (percent.test(input)) {
    match = input.match(percent);
    result.values = match.slice(1, 4).map(x => Math.round(parseFloat(x) * 2.55));
    if (match[4]) {
      result.alpha = parseFloat(match[4]);
    }
  } else {
    return null;
  }
  result.values = result.values.map(x => clamp(x, 0, 255));
  result.alpha = clamp(result.alpha, 0, 1);
  return result;
}

function parseHSL(input: string): Color|null {
  // tslint:disable-next-line:max-line-length
  const hsl = /^hsla?\(\s*([+-]?\d*[\.]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i;

  if (hsl.test(input)) {
    const match = input.match(hsl);
    return {
      type: 'hsl',
      values: [
        ((parseFloat(match[1]) % 360) + 360) % 360,
        clamp(parseFloat(match[2]), 0, 100),
        clamp(parseFloat(match[3]), 0, 100),
      ],
      alpha: resolveAlpha(match[4]),
    };
  } else {
    return null;
  }
}

function parseHWB(input: string): Color|null {
  // tslint:disable-next-line:max-line-length
  const hwb = /^hwb\(\s*([+-]?\d*[\.]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i;

  if (hwb.test(input)) {
    const match = input.match(hwb);
    return {
      type: 'hwb',
      values: [
        ((parseFloat(match[1]) % 360) + 360) % 360,
        clamp(parseFloat(match[2]), 0, 100),
        clamp(parseFloat(match[3]), 0, 100),
      ],
      alpha: resolveAlpha(match[4]),
    };
  } else {
    return null;
  }
}

function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(min, num), max);
}

function resolveAlpha(a: string): number {
  const num = parseFloat(a);
  return clamp(isNaN(num) ? 1 : num, 0, 1);
}
