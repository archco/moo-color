import { ColorFormatter } from '../src/color-formatter';
import parser from '../src/input-parser';

describe('#ColorFormatter', () => {
  describe('#convert', () => {
    it('convert rgb to hwb', () => {
      const color = parser('rgb(255, 0, 0)');
      const converted = new ColorFormatter().convert(color, 'hwb');
      expect(converted.model).toEqual('hwb');
      expect(converted.values).toEqual([0, 0, 0]);
    });

    it('convert with alpha.', () => {
      const color = parser('#ff000080');
      const converted = new ColorFormatter().convert(color, 'hsl');
      expect(converted.model).toEqual('hsl');
      expect(converted.values).toEqual([0, 100, 50]);
      expect(converted.alpha).toEqual(0.5);
    });
  });
});
