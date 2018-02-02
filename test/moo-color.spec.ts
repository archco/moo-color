import { MooColor } from '../src/moo-color';

describe('#MooColor', () => {
  describe('#constructor', () => {
    it('color argument.', () => {
      const color = new MooColor('#f00');
      expect(color.getModel()).toEqual('rgb');
    });
  });
});
