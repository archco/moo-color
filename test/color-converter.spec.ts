import * as Converter from '../src/color-converter';

const rounding = (arr: number[]) => {
  return arr.map(x => Math.round(x));
};

describe('#ColorConverter', () => {
  describe('#HSL', () => {
    it('converts HSL to RGB', () => {
      const rgb = Converter.hslToRgb(0, 50, 50);
      expect(rounding(rgb)).toEqual([191, 64, 64]);
    });

    it('converts RGB to HSL', () => {
      const hsl = Converter.rgbToHsl(191, 64, 64);
      expect(rounding(hsl)).toEqual([0, 50, 50]);
    });
  });

  describe('#HWB', () => {
    it('converts HWB to RGB', () => {
      const rgb = Converter.hwbToRgb(60, 0, 25);
      expect(rounding(rgb)).toEqual([191, 191, 0]);
    });

    it('converts RGB to HWB', () => {
      const hwb = Converter.rgbToHwb(160, 255, 51);
      expect(rounding(hwb)).toEqual([88, 20, 0]);
    });
  });

  describe('#HSV', () => {
    it('converts HSV to RGB', () => {
      const rgb = Converter.hsvToRgb(45, 80, 65);
      expect(rounding(rgb)).toEqual([166, 133, 33]);
    });

    it('converts RGB to HSV', () => {
      const hsv = Converter.rgbToHsv(80, 128, 0);
      expect(rounding(hsv)).toEqual([83, 100, 50]);
    });
  });

  describe('#CMYK', () => {
    it('converts CMYK to RGB', () => {
      const rgb = Converter.cmykToRgb(67, 75, 25, 15);
      expect(rounding(rgb)).toEqual([72, 54, 163]);
    });

    it('converts RGB to CMYK', () => {
      const cmyk = Converter.rgbToCmyk(72, 54, 163);
      expect(rounding(cmyk)).toEqual([56, 67, 0, 36]);
    });
  });

  describe('#HEX', () => {
    it('converts RGB to HEX string.', () => {
      const hex = Converter.rgbToHex(255, 0, 187);
      expect(hex).toEqual('ff00bb');
    });

    it('converts RGB to HEX as shorthand string.', () => {
      const hex = Converter.rgbToHex(255, 0, 187, null, true);
      expect(hex).toEqual('f0b');
    });

    it('RGB to HEX with alpha', () => {
      const hex = Converter.rgbToHex(255, 0, 187, .5);
      expect(hex).toEqual('ff00bb80');
    });

    it('converts HEX to RGB.', () => {
      const rgb = Converter.hexToRgb('ff00bb');
      const short = Converter.hexToRgb('f0b');
      expect(rgb).toEqual([255, 0, 187]);
      expect(rgb).toEqual(short);
    });

    it('converts Hex with alpha to RGB', () => {
      const rgba = Converter.hexToRgb('ff00bbff');
      expect(rgba).toEqual([255, 0, 187, 1]);
    });
  });
});
