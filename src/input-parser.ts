import * as ColorString from 'color-string';
import { Color } from './color';
import Names from './color-names';
import { clamp, degree } from './util/util';

type AcceptedInput = string|string[]|number[]|object;

export default function inputParser(input: AcceptedInput): Color|null {
 if (typeof input === 'string') {
    if (input in Names) {
      // Named colors.
      return {
        model: 'rgb',
        values: Names[input],
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
      const prefix = input.substr(0, 3).toLowerCase();
      switch (prefix) {
        case 'hwb': return parseHwb(input);
        case 'hsl': return parseHsl(input);
        case 'hsv': return parseHsv(input);
        case 'cmy': return parseCmyk(input);
        default: return parseRgb(input);
      }
    }
  }
}

function parseRgb(input: string): Color|null {
  const hex = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i;
  const shortHex = /^#([a-f0-9]{3})([a-f0-9]{1})?$/i;
  const rgba = /^rgba?\s*\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
  // tslint:disable-next-line:max-line-length
  const percent = /^rgba?\s*\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
  let match: RegExpMatchArray;
  const result: Color = {
    model: 'rgb',
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

function parseHsl(input: string): Color|null {
  // tslint:disable-next-line:max-line-length
  const hsl = /^hsla?\s*\(\s*([+-]?\d*[\.]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i;

  if (hsl.test(input)) {
    const match = input.match(hsl);
    return {
      model: 'hsl',
      values: [
        degree(match[1]),
        clamp(parseFloat(match[2]), 0, 100),
        clamp(parseFloat(match[3]), 0, 100),
      ],
      alpha: resolveAlpha(match[4]),
    };
  } else {
    return null;
  }
}

function parseHwb(input: string): Color|null {
  // tslint:disable-next-line:max-line-length
  const hwb = /^hwba?\s*\(\s*([+-]?\d*[\.]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i;

  if (hwb.test(input)) {
    const match = input.match(hwb);
    return {
      model: 'hwb',
      values: [
        degree(match[1]),
        clamp(parseFloat(match[2]), 0, 100),
        clamp(parseFloat(match[3]), 0, 100),
      ],
      alpha: resolveAlpha(match[4]),
    };
  } else {
    return null;
  }
}

function parseHsv(input: string): Color|null {
  // tslint:disable-next-line:max-line-length
  const hsv = /^hsva?\s*\(\s*([+-]?\d*[\.]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i;

  if (hsv.test(input)) {
    const match = input.match(hsv);
    return {
      model: 'hsv',
      values: [
        degree(match[1]),
        clamp(parseFloat(match[2]), 0, 100),
        clamp(parseFloat(match[3]), 0, 100),
      ],
      alpha: resolveAlpha(match[4]),
    };
  } else {
    return null;
  }
}

function parseCmyk(input: string): Color|null {
  // tslint:disable-next-line:max-line-length
  const cmyk = /^cmyk\s*\(\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i;

  if (cmyk.test(input)) {
    const match = input.match(cmyk);
    return {
      model: 'cmyk',
      values: [
        clamp(parseFloat(match[1]), 0, 100),
        clamp(parseFloat(match[2]), 0, 100),
        clamp(parseFloat(match[3]), 0, 100),
        clamp(parseFloat(match[4]), 0, 100),
      ],
      alpha: resolveAlpha(match[5]),
    };
  } else {
    return null;
  }
}

function resolveAlpha(a: string): number {
  const num = parseFloat(a);
  return clamp(isNaN(num) ? 1 : num, 0, 1);
}
