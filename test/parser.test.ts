import { describe, it, expect } from 'vitest';
import parseColor from '../src/input-parser';

describe('inputParser', () => {
  // -------------------------------------------------------------------
  // Hex
  // -------------------------------------------------------------------
  it('parses shorthand hex', () => {
    const res = parseColor('#f80');
    expect(res!.model).toBe('rgb');
    expect(res!.values).toEqual([255, 136, 0]);
    expect(res!.alpha).toBe(1);
  });

  it('parses hex with alpha', () => {
    const res = parseColor('#ff880080');
    expect(res!.model).toBe('rgb');
    expect(res!.values).toEqual([255, 136, 0]);
    expect(res!.alpha).toBe(0.5);
  });

  // -------------------------------------------------------------------
  // Named colors
  // -------------------------------------------------------------------
  it('parses named colors', () => {
    const res = parseColor('blue');
    expect(res!.model).toBe('rgb');
    expect(res!.values).toEqual([0, 0, 255]);
    expect(res!.alpha).toBe(1);
  });

  it('parses "transparent"', () => {
    expect(parseColor('transparent')!.alpha).toBe(0);
  });

  // -------------------------------------------------------------------
  // RGB
  // -------------------------------------------------------------------
  it('parses rgb()', () => {
    const res = parseColor('rgb(255, 0, 0)');
    expect(res!.values).toEqual([255, 0, 0]);
    expect(res!.alpha).toBe(1);
  });

  it('parses rgba()', () => {
    const res = parseColor('rgba(255, 0, 0, .3)');
    expect(res!.values).toEqual([255, 0, 0]);
    expect(res!.alpha).toBe(0.3);
  });

  it('parses rgb% notation', () => {
    const res = parseColor('rgba(100%, 25%, 0%, .5)');
    expect(res!.values).toEqual([255, 64, 0]);
    expect(res!.alpha).toBe(0.5);
  });

  it('returns null for malformed rgb', () => {
    expect(parseColor('rgb(0, 0%, 0)')).toBeNull();
  });

  // -------------------------------------------------------------------
  // HSL
  // -------------------------------------------------------------------
  it('parses hsla()', () => {
    const res = parseColor('hsla(355, 75%, 25%, .8)');
    expect(res!.model).toBe('hsl');
    expect(res!.values).toEqual([355, 75, 25]);
    expect(res!.alpha).toBe(0.8);
  });

  it('returns null for malformed hsl', () => {
    expect(parseColor('hsl(0, 0, 0)')).toBeNull();
  });

  // -------------------------------------------------------------------
  // HWB
  // -------------------------------------------------------------------
  it('parses hwb()', () => {
    const res = parseColor('hwb(180, 0%, 25%, 1)');
    expect(res!.model).toBe('hwb');
    expect(res!.values).toEqual([180, 0, 25]);
    expect(res!.alpha).toBe(1);
  });

  it('resolves hwb when w + b > 100', () => {
    const res = parseColor('hwb(0, 100%, 100%)');
    expect(res!.values).toEqual([0, 50, 50]);
  });

  it('returns null for malformed hwb', () => {
    expect(parseColor('hwb(0, 0, 0)')).toBeNull();
  });

  // -------------------------------------------------------------------
  // HSV
  // -------------------------------------------------------------------
  it('parses hsv()', () => {
    const res = parseColor('hsv(120, 25%, 50%)');
    expect(res!.model).toBe('hsv');
    expect(res!.values).toEqual([120, 25, 50]);
    expect(res!.alpha).toBe(1);
  });

  it('parses hsv with alpha', () => {
    const res = parseColor('hsv(120, 25%, 50%, .3)');
    expect(res!.alpha).toBe(0.3);
  });

  it('returns null for malformed hsv', () => {
    expect(parseColor('hsv(0, 0, 0)')).toBeNull();
  });

  // -------------------------------------------------------------------
  // CMYK
  // -------------------------------------------------------------------
  it('parses cmyk()', () => {
    const res = parseColor('cmyk(50%, 25%, 12%, 100%)');
    expect(res!.model).toBe('cmyk');
    expect(res!.values).toEqual([50, 25, 12, 100]);
    expect(res!.alpha).toBe(1);
  });

  it('parses cmyk with alpha', () => {
    const res = parseColor('cmyk(50%, 25%, 12%, 100%, 0.1)');
    expect(res!.alpha).toBe(0.1);
  });

  it('returns null for malformed cmyk', () => {
    expect(parseColor('cmyk(0, 0, 0, 0)')).toBeNull();
  });
});
