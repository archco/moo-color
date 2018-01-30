import inputParser from '../src/input-parser';

describe('#inputParser', () => {
  it('can shorthand Hex color.', () => {
    const res = inputParser('#f80');
    expect(res.type).toBe('rgb');
    expect(res.values).toEqual([255, 136, 0]);
    expect(res.alpha).toEqual(1);
  });

  it('can Hex color.', () => {
    const res = inputParser('#ff880080');
    expect(res.type).toBe('rgb');
    expect(res.values).toEqual([255, 136, 0]);
    expect(res.alpha).toEqual(.5);
  });

  it('can named color.', () => {
    const res = inputParser('blue');
    expect(res.type).toBe('rgb');
    expect(res.values).toEqual([0, 0, 255]);
    expect(res.alpha).toEqual(1);
  });

  it('can rgb color', () => {
    const res = inputParser('rgb(255, 0, 0)');
    expect(res.type).toBe('rgb');
    expect(res.values).toEqual([255, 0, 0]);
    expect(res.alpha).toEqual(1);
  });

  it('can rgba color', () => {
    const res = inputParser('rgba(255, 0, 0, .3)');
    expect(res.type).toBe('rgb');
    expect(res.values).toEqual([255, 0, 0]);
    expect(res.alpha).toEqual(0.3);
  });

  it('can rgba color as percentage.', () => {
    const res = inputParser('rgba(100%, 25%, 0%, .5)');
    expect(res.type).toBe('rgb');
    expect(res.values).toEqual([255, 64, 0]);
    expect(res.alpha).toEqual(.5);
  });

  it('can hsl color.', () => {
    const res = inputParser('hsla(355, 75%, 25%, .8)');
    expect(res.type).toBe('hsl');
    expect(res.values).toEqual([355, 75, 25]);
    expect(res.alpha).toEqual(.8);
  });

  it('can hwb color.', () => {
    const res = inputParser('hwb(180, 0%, 25%, 1)');
    expect(res.type).toBe('hwb');
    expect(res.values).toEqual([180, 0, 25]);
    expect(res.alpha).toEqual(1);
  });
});
