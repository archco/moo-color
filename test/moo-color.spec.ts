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
});
