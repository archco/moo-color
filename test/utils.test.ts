import { describe, it, expect } from 'vitest';
import {
  arrayIsEqual,
  clamp,
  decimal,
  degree,
  getRandom,
  linearize,
  resolveAlpha,
} from '../src/utils';

describe('clamp', () => {
  it('clamps within range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(clamp(15, 0, 10)).toBe(10);
  });
});

describe('degree', () => {
  it('normalizes negative degrees', () => {
    expect(degree(-45)).toBe(315);
  });

  it('normalizes degrees above 360', () => {
    expect(degree(450)).toBe(90);
  });

  it('parses strings', () => {
    expect(degree('120')).toBe(120);
  });
});

describe('resolveAlpha', () => {
  it('returns 1 for undefined', () => {
    expect(resolveAlpha(undefined)).toBe(1);
  });

  it('parses string values', () => {
    expect(resolveAlpha('0.5')).toBe(0.5);
  });

  it('clamps to 0–1', () => {
    expect(resolveAlpha(2)).toBe(1);
    expect(resolveAlpha(-1)).toBe(0);
  });
});

describe('decimal', () => {
  it('rounds to given precision', () => {
    expect(decimal(1.23456, 2)).toBe(1.23);
    expect(decimal(1.235, 2)).toBe(1.24);
  });
});

describe('getRandom', () => {
  it('produces values within range', () => {
    for (let i = 0; i < 20; i++) {
      const num = getRandom(0, 255, 2);
      expect(num).toBeGreaterThanOrEqual(0);
      expect(num).toBeLessThanOrEqual(255);
    }
  });

  it('works for 0–360 range', () => {
    for (let i = 0; i < 20; i++) {
      const num = getRandom(0, 360);
      expect(num).toBeGreaterThanOrEqual(0);
      expect(num).toBeLessThanOrEqual(360);
    }
  });
});

describe('arrayIsEqual', () => {
  it('compares flat arrays', () => {
    expect(arrayIsEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(arrayIsEqual([1, 2, 3], [2, 2, 3])).toBe(false);
  });

  it('compares nested arrays', () => {
    expect(arrayIsEqual([1, [2, 3], 4], [1, [2, 3], 4])).toBe(true);
  });
});

describe('linearize', () => {
  it('returns 0 for 0', () => {
    expect(linearize(0)).toBe(0);
  });

  it('returns 1 for 1', () => {
    expect(linearize(1)).toBe(1);
  });

  it('applies sRGB transfer function for mid-range', () => {
    // 0.5 sRGB ≈ 0.214 linear
    const result = linearize(0.5);
    expect(result).toBeCloseTo(0.214, 2);
  });

  it('uses linear segment below threshold', () => {
    const result = linearize(0.04);
    expect(result).toBeCloseTo(0.04 / 12.92, 6);
  });
});
