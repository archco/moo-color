import { Color } from './color';
import { ColorFormatter } from './color-formatter';
import inputParser from './input-parser';

export default class MooColor extends ColorFormatter {
  parser = inputParser;
}
