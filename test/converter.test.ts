import { describe, it, expect } from 'vitest';
import * as Converter from '../src/color-converter';

const round = (arr: number[]) => arr.map(x => Math.round(x));

describe('ColorConverter', () => {
  // -------------------------------------------------------------------
  // HSL
  // -------------------------------------------------------------------
  describe('HSL', () => {
    it('converts HSL to RGB', () => {
      expect(round(Converter.hslToRgb(0, 50, 50))).toEqual([191, 64, 64]);
    });

    it('converts RGB to HSL', () => {
      expect(round(Converter.rgbToHsl(191, 64, 64))).toEqual([0, 50, 50]);
      expect(round(Converter.rgbToHsl(255, 128, 64))).toEqual([20, 100, 63]);
    });

    it('handles achromatic gray (zero delta)', () => {
      const [h, s] = Converter.rgbToHsl(128, 128, 128);
      expect(h).toBe(0);
      expect(s).toBe(0);
    });
  });

  // -------------------------------------------------------------------
  // HWB
  // -------------------------------------------------------------------
  describe('HWB', () => {
    it('converts HWB to RGB', () => {
      expect(round(Converter.hwbToRgb(60, 0, 25))).toEqual([191, 191, 0]);
    });

    it('converts RGB to HWB', () => {
      expect(round(Converter.rgbToHwb(160, 255, 51))).toEqual([88, 20, 0]);
    });
  });

  // -------------------------------------------------------------------
  // HSV
  // -------------------------------------------------------------------
  describe('HSV', () => {
    it('converts HSV to RGB', () => {
      expect(round(Converter.hsvToRgb(45, 80, 65))).toEqual([166, 133, 33]);
      expect(round(Converter.hsvToRgb(330, 85, 50))).toEqual([128, 19, 73]);
    });

    it('converts RGB to HSV', () => {
      expect(round(Converter.rgbToHsv(80, 128, 0))).toEqual([83, 100, 50]);
    });
  });

  // -------------------------------------------------------------------
  // CMYK
  // -------------------------------------------------------------------
  describe('CMYK', () => {
    it('converts CMYK to RGB', () => {
      expect(round(Converter.cmykToRgb(67, 75, 25, 15))).toEqual([72, 54, 163]);
    });

    it('converts RGB to CMYK', () => {
      expect(round(Converter.rgbToCmyk(72, 54, 163))).toEqual([56, 67, 0, 36]);
    });
  });

  // -------------------------------------------------------------------
  // HEX
  // -------------------------------------------------------------------
  describe('HEX', () => {
    it('converts RGB to HEX string', () => {
      expect(Converter.rgbToHex(255, 0, 187)).toBe('ff00bb');
    });

    it('converts RGB to shorthand HEX', () => {
      expect(Converter.rgbToHex(255, 0, 187, null, true)).toBe('f0b');
    });

    it('converts RGB to HEX with alpha', () => {
      expect(Converter.rgbToHex(255, 0, 187, 0.5)).toBe('ff00bb80');
    });

    it('converts HEX to RGB', () => {
      const rgb = Converter.hexToRgb('ff00bb');
      const short = Converter.hexToRgb('f0b');
      expect(rgb).toEqual([255, 0, 187]);
      expect(rgb).toEqual(short);
    });

    it('converts HEX with alpha to RGB', () => {
      expect(Converter.hexToRgb('ff00bbff')).toEqual([255, 0, 187, 1]);
    });
  });

  // -------------------------------------------------------------------
  // HSV ↔ HWB
  // -------------------------------------------------------------------
  describe('HSV ↔ HWB', () => {
    it('converts HSV to HWB', () => {
      const hwb = Converter.hsvToHwb(120, 50, 80);
      expect(round(hwb)).toEqual([120, 40, 20]);
    });

    it('converts HWB to HSV', () => {
      const hsv = Converter.hwbToHsv(120, 40, 20);
      expect(round(hsv)).toEqual([120, 50, 80]);
    });
  });

  // -------------------------------------------------------------------
  // resolveHwb
  // -------------------------------------------------------------------
  describe('resolveHwb', () => {
    it('clamps when w + b > 100', () => {
      const [h, w, b] = Converter.resolveHwb(0, 100, 100);
      expect(h).toBe(0);
      expect(w + b).toBeCloseTo(100, 1);
    });

    it('leaves valid values unchanged', () => {
      expect(Converter.resolveHwb(180, 30, 40)).toEqual([180, 30, 40]);
    });
  });

  // -------------------------------------------------------------------
  // Round-trip stability
  // -------------------------------------------------------------------
  describe('multiple round-trip conversions', () => {
    it('remain close to original values', () => {
      const original = [255, 128, 64];
      let val = [...original];
      for (let i = 0; i < 100; i++) {
        val = Converter.rgbToHwb(val[0]!, val[1]!, val[2]!);
        val = Converter.hwbToRgb(val[0]!, val[1]!, val[2]!);
        val = Converter.rgbToHsl(val[0]!, val[1]!, val[2]!);
        val = Converter.hslToRgb(val[0]!, val[1]!, val[2]!);
        val = Converter.rgbToCmyk(val[0]!, val[1]!, val[2]!);
        val = Converter.cmykToRgb(val[0]!, val[1]!, val[2]!, val[3]!);
      }
      expect(val[0]).toBeCloseTo(original[0]!, 6);
      expect(val[1]).toBeCloseTo(original[1]!, 6);
      expect(val[2]).toBeCloseTo(original[2]!, 6);
    });
  });
});
