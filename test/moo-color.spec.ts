import { MooColor } from '../src/moo-color';

describe('#MooColor', () => {
  describe('#constructor', () => {
    it('color argument.', () => {
      const color = new MooColor('#f00');
      expect(color.getModel()).toEqual('rgb');
    });
  });

  describe('luminance', () => {
    it('works', () => {
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
      // expect(rgb.toRgb()).toEqual('rgb(165, 90, 90)');
    });
  });

  describe('multiple converts.', () => {
    it('test', () => {
      const c1 =  new MooColor('hsl(0, 50%, 50%)');
      const c2 = new MooColor('hsl(0, 50%, 50%)');
      for (let i = 0; i < 100; i++) {
        c1.changeModel('rgb')
          .changeModel('hwb')
          .changeModel('hsv')
          .changeModel('cmyk')
          .changeModel('hsl');
      }
      expect(c1.getColor()).toEqual(c2.getColor());
    });
  });
});
