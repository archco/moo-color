import inputParser from '../src/input-parser';

describe('#inputParser', () => {
  it('can shorthand Hex color.', () => {
    const res = inputParser('#f80');
    expect(res.model).toEqual('rgb');
    expect(res.values).toEqual([255, 136, 0]);
    expect(res.alpha).toEqual(1);
  });

  it('can Hex color.', () => {
    const res = inputParser('#ff880080');
    expect(res.model).toEqual('rgb');
    expect(res.values).toEqual([255, 136, 0]);
    expect(res.alpha).toEqual(.5);
  });

  it('can named color.', () => {
    const res = inputParser('blue');
    expect(res.model).toEqual('rgb');
    expect(res.values).toEqual([0, 0, 255]);
    expect(res.alpha).toEqual(1);
  });

  it('can rgb color', () => {
    const res = inputParser('rgb(255, 0, 0)');
    expect(res.model).toEqual('rgb');
    expect(res.values).toEqual([255, 0, 0]);
    expect(res.alpha).toEqual(1);
  });

  it('can rgba color', () => {
    const res = inputParser('rgba(255, 0, 0, .3)');
    expect(res.model).toEqual('rgb');
    expect(res.values).toEqual([255, 0, 0]);
    expect(res.alpha).toEqual(0.3);
  });

  it('can rgba color as percentage.', () => {
    const res = inputParser('rgba(100%, 25%, 0%, .5)');
    expect(res.model).toEqual('rgb');
    expect(res.values).toEqual([255, 64, 0]);
    expect(res.alpha).toEqual(.5);
  });

  it('can hsl color.', () => {
    const res = inputParser('hsla(355, 75%, 25%, .8)');
    expect(res.model).toEqual('hsl');
    expect(res.values).toEqual([355, 75, 25]);
    expect(res.alpha).toEqual(.8);
  });

  it('can hwb color.', () => {
    const res = inputParser('hwb(180, 0%, 25%, 1)');
    expect(res.model).toEqual('hwb');
    expect(res.values).toEqual([180, 0, 25]);
    expect(res.alpha).toEqual(1);
  });

  it('can hsv color.', () => {
    const res = inputParser('hsv(120, 25%, 50%)');
    expect(res.model).toEqual('hsv');
    expect(res.values).toEqual([120, 25, 50]);
    expect(res.alpha).toEqual(1);
  });

  it('can hsv color with alpha.', () => {
    const res = inputParser('hsv(120, 25%, 50%, .3)');
    expect(res.model).toEqual('hsv');
    expect(res.values).toEqual([120, 25, 50]);
    expect(res.alpha).toEqual(.3);
  });

  it('can cmyk color.', () => {
    const res = inputParser('cmyk(50%, 25%, 12%, 100%)');
    expect(res.model).toEqual('cmyk');
    expect(res.values).toEqual([50, 25, 12, 100]);
    expect(res.alpha).toEqual(1);
  });

  it('can cmyk color with alpha.', () => {
    const res = inputParser('cmyk(50%, 25%, 12%, 100%, 0.1)');
    expect(res.model).toEqual('cmyk');
    expect(res.values).toEqual([50, 25, 12, 100]);
    expect(res.alpha).toEqual(.1);
  });
});