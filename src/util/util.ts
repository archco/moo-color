export function padStart(str: string, length: number, chars: string): string {
  const space = length - str.length;
  return space > 0 ? `${makePad(chars, space)}${str}` : str;
}

export function padEnd(str: string, length: number, chars: string): string {
  const space = length - str.length;
  return space > 0 ? `${str}${makePad(chars, space)}` : str;
}

function makePad(chars: string, limit: number): string {
  while (chars.length < limit) {
    chars += chars;
  }
  return chars.length > limit ? chars.substring(chars.length - limit) : chars;
}

export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(min, num), max);
}
