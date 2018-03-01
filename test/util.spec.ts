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
});
