import { Color } from './color';
import { ColorFormatter } from './color-formatter';

export class MooColor extends ColorFormatter {
  constructor(color: string) {
    super();
    this.setColor(color);
  }

  lightness(): number {
    // TODO:
    return 0;
  }

  isLight(): boolean {
    // TODO:
    return true;
  }

  isDark(): boolean {
    // TODO:
    return true;
  }
}
