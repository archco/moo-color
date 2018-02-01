import { ColorFormatter } from '../src/color-formatter';
import parser from '../src/input-parser';

describe('#ColorFormatter', () => {
  const cf = new ColorFormatter();

  describe('#convert', () => {
    it('convert rgb to hwb', () => {
      const color = parser('rgb(255, 0, 0)');
      const converted = cf.convert(color, 'hwb');
      expect(converted.model).toEqual('hwb');
      expect(converted.values).toEqual([0, 0, 0]);
    });

    it('convert with alpha.', () => {
      const color = parser('#ff000080');
      const converted = cf.convert(color, 'hsl');
      expect(converted.model).toEqual('hsl');
      expect(converted.values).toEqual([0, 100, 50]);
      expect(converted.alpha).toEqual(0.5);
    });
  });

  describe('#toHex', () => {
    it('represent to hex string.', () => {
      const hex = cf.setColor('hsv(160, 50%, 100%)').toHex();
      expect(hex).toEqual('#80ffd4');
      expect(cf.setColor('rgb(255, 255, 255)').toHex()).toEqual('#fff');
    });
  });

  describe('#toRgb', () => {
    it('represent to rgb string.', () => {
      expect(cf.setColor('#f00').toRgb()).toEqual('rgb(255, 0, 0)');
      expect(cf.setColor('#ff000080').toRgb()).toEqual('rgba(255, 0, 0, 0.5)');
    });
  });

  describe('#toHwb', () => {
    it('represent to hwb string.', () => {
      expect(cf.setColor('rgb(0, 255, 255)').toHwb()).toEqual('hwb(180, 0%, 0%)');
      expect(cf.setColor('rgba(0, 255, 255, 0.4)').toHwb()).toEqual('hwb(180, 0%, 0%, 0.4)');
    });
  });

  describe('#toHsl', () => {
    it('represents to hsl string.', () => {
      let color = 'rgb(255, 0, 0)';
      expect(cf.setColor(color).toHsl()).toEqual('hsl(0, 100%, 50%)');
      color = 'rgba(255, 0, 0, .8)';
      expect(cf.setColor(color).toHsl()).toEqual('hsla(0, 100%, 50%, 0.8)');
    });
  });

  describe('#toHsv', () => {
    it('represents to hsv string.', () => {
      let color = '#0f0';
      expect(cf.setColor(color).toHsv()).toEqual('hsv(120, 100%, 100%)');
      color = '#0f00';
      expect(cf.setColor(color).toHsv()).toEqual('hsva(120, 100%, 100%, 0)');
    });
  });

  describe('#toCmyk', () => {
    it('represents to cmyk string.', () => {
      let color = 'rgb(0, 0, 255)';
      expect(cf.setColor(color).toCmyk()).toEqual('cmyk(100%, 100%, 0%, 0%)');
      color = 'rgba(0, 0, 255, 0.5)';
      expect(cf.setColor(color).toCmyk()).toEqual('cmyk(100%, 100%, 0%, 0%, 0.5)');
    });
  });

  describe('#toString', () => {
    it('represents to string.', () => {
      let color = 'rgb(255, 0, 0)';
      expect(cf.setColor(color).toString()).toEqual('rgb(255, 0, 0)');
      color = 'hwb(120, 0%, 0%, .5)';
      expect(cf.setColor(color).toString()).toEqual('hwb(120, 0%, 0%, 0.5)');
      expect(cf.setColor(color).toString('rgb')).toEqual('rgba(0, 255, 0, 0.5)');
    });
  });
});
