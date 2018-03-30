import * as Util from '../src/util/util';

describe('#Util', () => {
  describe('#padStart', () => {
    it('padStart', () => {
      let res = Util.padStart('xx', 4, 'O');
      expect(res).toEqual('OOxx');
      res = Util.padStart('xx', 8, '12');
      expect(res).toEqual('121212xx');
    });
  });

  describe('#padEnd', () => {
    it('padEnd', () => {
      let res = Util.padEnd('4', 4, '-');
      expect(res).toEqual('4---');
      res = Util.padEnd('xx', 8, '123');
      expect(res).toEqual('xx123123');
    });

    it('no space, no change.', () => {
      const str = Util.padEnd('1234', 4, '_');
      expect(str).toEqual('1234');
    });
  });

  describe('#getRandom', () => {
    it('works.', () => {
      for (let i = 0; i < 10; i++) {
        const num = Util.getRandom(0, 255, 2);
        expect(num).toBeGreaterThanOrEqual(0);
        expect(num).toBeLessThanOrEqual(255);
      }
    });

    it('0-360', () => {
      for (let i = 0; i < 10; i++) {
        const num = Util.getRandom(0, 360);
        expect(num).toBeGreaterThanOrEqual(0);
        expect(num).toBeLessThanOrEqual(360);
      }
    });
  });

  describe('#degree', () => {
    it('converts minus to plus degree.', () => {
      const d = Util.degree(-45);
      expect(d).toEqual(315);
    });
  });

  describe('#arrayIsEqual', () => {
    it('works.', () => {
      expect(Util.arrayIsEqual([1, 2, 3], [1, 2, 3])).toBe(true);
      expect(Util.arrayIsEqual([1, 2, 3], [2, 2, 3])).toBe(false);
      expect(Util.arrayIsEqual([1, [2, 3], 4], [1, [2, 3], 4])).toBe(true);
    });
  });
});
