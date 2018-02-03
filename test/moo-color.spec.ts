import { MooColor } from '../src/moo-color';

describe('#MooColor', () => {
  describe('static #mix', () => {
    it('can use string.', () => {
      const mixed = MooColor.mix('#fff', '#000', 90);
      expect(mixed.brightness).toEqual(0.9 * 255);
    });
  });

  describe('#constructor', () => {
    it('color argument.', () => {
      const color = new MooColor('#f00');
      expect(color.getModel()).toEqual('rgb');
    });

    it('if no argument, color is black.', () => {
      expect(new MooColor().toHex(true)).toEqual('#000');
    });
  });

  describe('luminance', () => {
    it('value from 0 to 1.', () => {
      expect(new MooColor('#000').luminance).toEqual(0);
      expect(new MooColor('#fff').luminance).toEqual(1);
    });
  });

  // @see http://juicystudio.com/services/luminositycontrastratio.php#specify
  describe('#contrastRatioWith', () => {
    it('ratio range from between 1 to 21.', () => {
      const black = new MooColor('#000');
      const white = new MooColor('#fff');
      expect(black.contrastRatioWith(white)).toEqual(21);
    });
  });

  describe('#isContrastEnough', () => {
    it('returns true if contrast ratio lager than equal to 4.5', () => {
      const blue = new MooColor('#00f');
      const green = new MooColor('#0f0'); // ratio is 6.26:1
      expect(blue.isContrastEnough(green)).toEqual(true);
    });

    it('else returns false', () => {
      const cyan = new MooColor('cyan');
      const white = new MooColor('white'); // ratio is 1.25:1
      expect(cyan.isContrastEnough(white)).toEqual(false);
    });
  });

  describe('#lighten', () => {
    it('increase lightness.', () => {
      const red = new MooColor('red');
      expect(red.lighten(20).toString()).toEqual('rgb(255, 102, 102)');
    });
  });

  describe('#darken', () => {
    it('decrease lightness.', () => {
      const red = new MooColor('red');
      expect(red.darken(20).toString()).toEqual('rgb(153, 0, 0)');
    });
  });

  describe('#saturate', () => {
    it('increase saturation.', () => {
      const rgb = new MooColor('rgb(191, 64, 64)'); // hsl(0, 50%, 50%)
      expect(rgb.saturate(20).toString()).toEqual('rgb(217, 38, 38)');
    });
  });

  describe('#desaturate', () => {
    it('Decrease saturation.', () => {
      const c = new MooColor('rgb(191, 64, 64)');
      expect(c.toHsl()).toEqual('hsl(0, 49.8%, 50%)');
      c.desaturate(20);
      expect(c.toHsl()).toEqual('hsl(0, 29.8%, 50%)');
    });
  });

  describe('multiple converts.', () => {
    it('to be closed to original values.', () => {
      const c1 = new MooColor('hsl(0, 50%, 50%)');
      const c2 = new MooColor('hsl(0, 50%, 50%)');
      for (let i = 0; i < 100; i++) {
        c1.changeModel('rgb')
          .changeModel('hwb')
          .changeModel('hsv')
          .changeModel('cmyk')
          .changeModel('hsl');
      }
      const v1 = c1.getColor().values;
      const v2 = c2.getColor().values;
      expect(v1[0]).toBeCloseTo(v2[0], 5);
      expect(v1[1]).toBeCloseTo(v2[1], 5);
      expect(v1[2]).toBeCloseTo(v2[2], 5);
    });
  });

  describe('#grayscale', () => {
    it('works.', () => {
      const c = new MooColor('rgb(255, 0, 0)');
      expect(c.grayscale().toRgb()).toEqual('rgb(128, 128, 128)');
    });
  });

  describe('#whiten', () => {
    it('increase whiteness.', () => {
      const c = new MooColor('hwb(120, 40%, 40%)');
      c.whiten(20);
      expect(c.toHwb()).toEqual('hwb(120, 60%, 40%)');
      c.whiten(20);
      expect(c.toHwb()).toEqual('hwb(120, 66.67%, 33.33%)');
    });
  });

  describe('#blacken', () => {
    it('increase blackness.', () => {
      const c = new MooColor('hwb(120, 0%, 10%)');
      c.blacken(15);
      expect(c.toHwb()).toEqual('hwb(120, 0%, 25%)');
    });
  });

  describe('#rotate', () => {
    it('rotate hue degree value.', () => {
      const c = new MooColor('hsl(0, 100%, 50%)');
      c.rotate(120);
      expect(c.toHex(true)).toEqual('#0f0'); // 120 = green.
      c.rotate(-180);
      expect(c.toHex(true)).toEqual('#f0f'); // 300 = magenta.
    });
  });

  describe('#clone', () => {
    it('not equal to original.', () => {
      const c = new MooColor('blue');
      const c1 = c.clone().lighten(10);
      expect(c1.toString()).not.toEqual(c.toString());
    });
  });

  describe('#mix', () => {
    it('red + yellow = orange.', () => {
      const c1 = new MooColor('rgb(255, 0, 0)');
      const c2 = new MooColor('rgb(255, 255, 0)');
      const c3 = c1.mix(c2, 50);
      expect(c3.toString()).toEqual('rgb(255, 128, 0)');
    });
  });
});
