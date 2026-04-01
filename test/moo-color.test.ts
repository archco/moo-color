import { describe, it, expect } from 'vitest';
import { MooColor } from '../src/moo-color';

describe('MooColor', () => {
  // -------------------------------------------------------------------
  // Static methods
  // -------------------------------------------------------------------
  describe('static mix()', () => {
    it('accepts string arguments', () => {
      const mixed = MooColor.mix('#fff', '#000', 90);
      expect(mixed.brightness).toEqual(0.9 * 255);
    });
  });

  describe('static random()', () => {
    it('generates valid HWB values', () => {
      for (let i = 0; i < 10; i++) {
        const c = MooColor.random();
        const [h, w, b] = c.getColorAs('hwb').values;
        expect(h).toBeGreaterThanOrEqual(0);
        expect(h).toBeLessThanOrEqual(360);
        expect(w).toBeGreaterThanOrEqual(0);
        expect(w).toBeLessThanOrEqual(100);
        expect(b).toBeGreaterThanOrEqual(0);
        expect(b).toBeLessThanOrEqual(100);
      }
    });

    it('accepts fixed whiteness value', () => {
      for (let i = 0; i < 10; i++) {
        const c = MooColor.random({ white: 50, black: [0, 50] });
        const [, w] = c.getColorAs('hwb').values;
        expect(w).toBe(50);
      }
    });

    it('constrains hue to given range', () => {
      for (let i = 0; i < 10; i++) {
        const c = MooColor.random({ hue: [0, 60] });
        const [h] = c.getColorAs('hwb').values;
        expect(h).toBeGreaterThanOrEqual(0);
        expect(h).toBeLessThanOrEqual(60);
      }
    });
  });

  // -------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------
  describe('constructor', () => {
    it('parses string color', () => {
      expect(new MooColor('#f00').getModel()).toBe('rgb');
    });

    it('accepts ColorData object', () => {
      const c = new MooColor({ model: 'rgb', values: [255, 0, 0] });
      expect(c.toHex('short')).toBe('#f00');
    });

    it('defaults to black when no argument', () => {
      expect(new MooColor().toHex('short')).toBe('#000');
    });

    it('throws on invalid string', () => {
      expect(() => new MooColor('wrong string')).toThrow(Error);
    });
  });

  // -------------------------------------------------------------------
  // State accessors
  // -------------------------------------------------------------------
  describe('brightness', () => {
    it('computes correctly for mid-gray', () => {
      let color = new MooColor('#808080');
      expect(color.brightness).toBe(128);
      expect(color.isLight).toBe(true);
      expect(color.isDark).toBe(false);

      color = new MooColor('#7f7f7f');
      expect(color.brightness).toBe(127);
      expect(color.isLight).toBe(false);
      expect(color.isDark).toBe(true);
    });
  });

  describe('luminance (WCAG 2.1 — sRGB linearized)', () => {
    it('returns 0 for black', () => {
      expect(new MooColor('#000').luminance).toBe(0);
    });

    it('returns 1 for white', () => {
      expect(new MooColor('#fff').luminance).toBe(1);
    });

    it('correctly linearizes mid-gray (not ~0.5)', () => {
      // With correct sRGB linearization, #808080 ≈ 0.216 (not 0.502)
      const lum = new MooColor('#808080').luminance;
      expect(lum).toBeCloseTo(0.216, 2);
      expect(lum).toBeLessThan(0.3);
    });
  });

  // -------------------------------------------------------------------
  // Contrast ratio
  // -------------------------------------------------------------------
  describe('contrastRatioWith()', () => {
    it('black vs white = 21', () => {
      const black = new MooColor('#000');
      const white = new MooColor('#fff');
      expect(black.contrastRatioWith(white)).toBe(21);
    });
  });

  describe('isContrastEnough()', () => {
    it('returns true when ratio ≥ 4.5', () => {
      const blue = new MooColor('#00f');
      const green = new MooColor('#0f0');
      expect(blue.isContrastEnough(green)).toBe(true);
    });

    it('returns false when ratio < 4.5', () => {
      const cyan = new MooColor('cyan');
      const white = new MooColor('white');
      expect(cyan.isContrastEnough(white)).toBe(false);
    });
  });

  // -------------------------------------------------------------------
  // Formatting
  // -------------------------------------------------------------------
  describe('toHex()', () => {
    it('full mode (default)', () => {
      const c = new MooColor('rgb(255, 255, 255)');
      expect(c.toHex()).toBe('#ffffff');
    });

    it('short mode', () => {
      expect(new MooColor('rgb(255, 0, 0)').toHex('short')).toBe('#f00');
    });

    it('name mode', () => {
      expect(new MooColor('rgb(255, 0, 0)').toHex('name')).toBe('red');
    });
  });

  describe('toRgb()', () => {
    it('default mode', () => {
      expect(new MooColor('#f00').toRgb()).toBe('rgb(255, 0, 0)');
    });

    it('includes alpha when present', () => {
      expect(new MooColor('#ff000080').toRgb()).toBe('rgba(255, 0, 0, 0.5)');
    });

    it('percent mode', () => {
      const c = new MooColor('#f0f');
      expect(c.toRgb('percent')).toBe('rgb(100%, 0%, 100%)');
      expect(c.setAlpha(0.5).toRgb('percent')).toBe('rgba(100%, 0%, 100%, 0.5)');
    });
  });

  describe('toHwb()', () => {
    it('formats correctly', () => {
      expect(new MooColor('rgb(0, 255, 255)').toHwb()).toBe('hwb(180, 0%, 0%)');
    });

    it('includes alpha when present', () => {
      expect(new MooColor('rgba(0, 255, 255, 0.4)').toHwb()).toBe('hwb(180, 0%, 0%, 0.4)');
    });
  });

  describe('toHsl()', () => {
    it('formats correctly', () => {
      expect(new MooColor('rgb(255, 0, 0)').toHsl()).toBe('hsl(0, 100%, 50%)');
    });

    it('includes alpha when present', () => {
      expect(new MooColor('rgba(255, 0, 0, .8)').toHsl()).toBe('hsla(0, 100%, 50%, 0.8)');
    });
  });

  describe('toHsv()', () => {
    it('formats correctly', () => {
      expect(new MooColor('#0f0').toHsv()).toBe('hsv(120, 100%, 100%)');
    });

    it('includes alpha when present', () => {
      expect(new MooColor('#0f00').toHsv()).toBe('hsva(120, 100%, 100%, 0)');
    });
  });

  describe('toCmyk()', () => {
    it('formats correctly', () => {
      expect(new MooColor('rgb(0, 0, 255)').toCmyk()).toBe('cmyk(100%, 100%, 0%, 0%)');
    });

    it('includes alpha when present', () => {
      expect(new MooColor('rgba(0, 0, 255, 0.5)').toCmyk()).toBe('cmyk(100%, 100%, 0%, 0%, 0.5)');
    });
  });

  describe('toString()', () => {
    it('defaults to current model notation', () => {
      expect(new MooColor('rgb(255, 0, 0)').toString()).toBe('rgb(255, 0, 0)');
    });

    it('accepts explicit model', () => {
      const c = new MooColor('hwb(120, 0%, 0%, .5)');
      expect(c.toString()).toBe('hwb(120, 0%, 0%, 0.5)');
      expect(c.toString('rgb')).toBe('rgba(0, 255, 0, 0.5)');
    });
  });

  // -------------------------------------------------------------------
  // Manipulation — immutability
  // -------------------------------------------------------------------
  describe('immutability', () => {
    it('lighten does not mutate the original', () => {
      const original = new MooColor('red');
      const lighter = original.lighten(20);
      expect(lighter.toString()).toBe('rgb(255, 102, 102)');
      expect(original.toString()).toBe('rgb(255, 0, 0)');
    });
  });

  describe('lighten()', () => {
    it('increases lightness', () => {
      expect(new MooColor('red').lighten(20).toString()).toBe('rgb(255, 102, 102)');
    });
  });

  describe('darken()', () => {
    it('decreases lightness', () => {
      expect(new MooColor('red').darken(20).toString()).toBe('rgb(153, 0, 0)');
    });
  });

  describe('saturate()', () => {
    it('increases saturation', () => {
      const c = new MooColor('rgb(191, 64, 64)');
      expect(c.saturate(20).toString()).toBe('rgb(217, 38, 38)');
    });
  });

  describe('desaturate()', () => {
    it('decreases saturation', () => {
      const c = new MooColor('rgb(191, 64, 64)');
      expect(c.toHsl()).toBe('hsl(0, 49.8%, 50%)');
      const c2 = c.desaturate(20);
      expect(c2.toHsl()).toBe('hsl(0, 29.8%, 50%)');
    });
  });

  describe('grayscale()', () => {
    it('sets saturation to 0', () => {
      expect(new MooColor('rgb(255, 0, 0)').grayscale().toRgb()).toBe('rgb(128, 128, 128)');
    });
  });

  describe('whiten()', () => {
    it('increases whiteness', () => {
      const c = new MooColor('hwb(120, 40%, 40%)');
      const c2 = c.whiten(20);
      expect(c2.toHwb()).toBe('hwb(120, 60%, 40%)');
      const c3 = c2.whiten(20);
      expect(c3.toHwb()).toBe('hwb(120, 66.67%, 33.33%)');
    });
  });

  describe('blacken()', () => {
    it('increases blackness', () => {
      const c = new MooColor('hwb(120, 0%, 10%)');
      expect(c.blacken(15).toHwb()).toBe('hwb(120, 0%, 25%)');
    });
  });

  describe('rotate()', () => {
    it('rotates hue', () => {
      const c = new MooColor('hsl(0, 100%, 50%)');
      const green = c.rotate(120);
      expect(green.toHex('short')).toBe('#0f0');
      const magenta = green.rotate(-180);
      expect(magenta.toHex('short')).toBe('#f0f');
    });
  });

  describe('clone()', () => {
    it('produces an independent copy', () => {
      const c = new MooColor('blue');
      const c2 = c.clone().lighten(10);
      expect(c2.toString()).not.toBe(c.toString());
    });
  });

  describe('mix()', () => {
    it('blends two colors', () => {
      const c1 = new MooColor('rgb(255, 0, 0)');
      const c2 = new MooColor('rgb(255, 255, 0)');
      expect(c1.mix(c2, 50).toString()).toBe('rgb(255, 128, 0)');
    });
  });

  describe('complement()', () => {
    it('rotates hue by 180°', () => {
      const c = new MooColor('hsl(30, 100%, 50%)');
      const comp = c.complement();
      expect(comp.toString()).toBe('hsl(210, 100%, 50%)');
      expect(comp.complement().toString()).toBe('hsl(30, 100%, 50%)');
    });
  });

  describe('invert()', () => {
    it('inverts RGB values', () => {
      expect(new MooColor('#0ff').invert().toHex('short')).toBe('#f00');
    });

    it('supports partial inversion via percent', () => {
      expect(new MooColor('#f00').invert(75).toHex('short')).toBe('#40bfbf');
    });
  });

  // -------------------------------------------------------------------
  // Model conversion round-trip
  // -------------------------------------------------------------------
  describe('multiple model conversions', () => {
    it('remain close to original values', () => {
      const c1 = new MooColor('hsl(0, 50%, 50%)');
      let c = new MooColor('hsl(0, 50%, 50%)');
      for (let i = 0; i < 100; i++) {
        c = c.changeModel('rgb')
          .changeModel('hwb')
          .changeModel('hsv')
          .changeModel('cmyk')
          .changeModel('hsl');
      }
      const v1 = c.getColor().values;
      const v2 = c1.getColor().values;
      expect(v1[0]).toBeCloseTo(v2[0]!, 5);
      expect(v1[1]).toBeCloseTo(v2[1]!, 5);
      expect(v1[2]).toBeCloseTo(v2[2]!, 5);
    });
  });

  // -------------------------------------------------------------------
  // Data access
  // -------------------------------------------------------------------
  describe('getColor()', () => {
    it('returns a copy', () => {
      const c = new MooColor('#f00');
      const data = c.getColor();
      data.values[0] = 0;
      expect(c.getColor().values[0]).toBe(255);
    });
  });

  describe('getColorAs()', () => {
    it('converts to requested model', () => {
      const c = new MooColor('#f00');
      const hsl = c.getColorAs('hsl');
      expect(hsl.model).toBe('hsl');
      expect(hsl.values[0]).toBeCloseTo(0, 5);
      expect(hsl.values[1]).toBeCloseTo(100, 5);
      expect(hsl.values[2]).toBeCloseTo(50, 5);
    });
  });

  describe('setAlpha()', () => {
    it('returns a new instance with updated alpha', () => {
      const c = new MooColor('red');
      const c2 = c.setAlpha(0.5);
      expect(c.getAlpha()).toBe(1);
      expect(c2.getAlpha()).toBe(0.5);
    });
  });

  describe('convert()', () => {
    it('converts standalone Color data', () => {
      const c = new MooColor('#f00');
      const result = c.convert({ model: 'rgb', values: [255, 0, 0], alpha: 0.5 }, 'hsl');
      expect(result.model).toBe('hsl');
      expect(result.values[0]).toBeCloseTo(0, 5);
      expect(result.alpha).toBe(0.5);
    });
  });
});
