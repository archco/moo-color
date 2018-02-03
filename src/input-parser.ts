import { Color } from './color';
import { resolveHwb } from './color-converter';
import Names from './color-names';
import { clamp, degree, resolveAlpha } from './util/util';

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
  const hex = /^#?([a-f0-9]{6})([a-f0-9]{2})?$/i;
  const shortHex = /^#?([a-f0-9]{3})([a-f0-9]{1})?$/i;
  const rgba = /^rgba?\s*\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
  // tslint:disable-next-line:max-line-length
  const percent = /^rgba?\s*\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
  let match: RegExpMatchArray;
  const hexToAlpha = (num: string) => Math.round((parseInt(num, 16) / 255) * 100) / 100;
  let val: number[];
  let a: number;

  if (hex.test(input)) {
    match = input.match(hex);
    const hexPart = match[1];
    const alphaPart = match[2];
    val = hexPart.match(/.{2}/g).map(x => parseInt(x, 16));
    a = alphaPart ? hexToAlpha(alphaPart) : 1;
  } else if (shortHex.test(input)) {
    match = input.match(shortHex);
    const hexPart = match[1];
    const alphaPart = match[2];
    val = hexPart.match(/.{1}/g).map(x => parseInt(x + x, 16));
    a = alphaPart ? hexToAlpha(alphaPart) : 1;
  } else if (rgba.test(input)) {
    match = input.match(rgba);
    val = match.slice(1, 4).map(x => parseInt(x, 0));
    a = resolveAlpha(match[4]);
  } else if (percent.test(input)) {
    match = input.match(percent);
    val = match.slice(1, 4).map(x => Math.round(parseFloat(x) * 2.55));
    a = resolveAlpha(match[4]);
  } else {
    return null;
  }
  return {
    model: 'rgb',
    values: val.map(x => clamp(x, 0, 255)),
    alpha: clamp(a, 0, 1),
  };
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
    const h = degree(match[1]);
    const w = clamp(parseFloat(match[2]), 0, 100);
    const b = clamp(parseFloat(match[3]), 0, 100);
    return {
      model: 'hwb',
      values: resolveHwb(h, w, b),
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
