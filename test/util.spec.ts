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
});
