import ColorError from './ColorError';

const repeat = (str: string, amount: number) =>
  Array.from(Array(amount))
    .map(() => str)
    .join('');

const reducedHexRegex = new RegExp(
  `^#${repeat('([a-f0-9])', 3)}([a-f0-9])?$`,
  'i',
);
const hexRegex = new RegExp(
  `^#${repeat('([a-f0-9]{2})', 3)}([a-f0-9]{2})?$`,
  'i',
);
const rgbaRegex = new RegExp(
  `^rgba?\\(\\s*(\\d+)\\s*${repeat(
    ',\\s*(\\d+)\\s*',
    2,
  )}(?:,\\s*([\\d.]+))?\\s*\\)$`,
  'i',
);

type RgbaArray = [red: number, blue: number, green: number, alpha: number];

/**
 * Parses a color into red, gree, blue, alpha parts
 *
 * @param color the input color. Can be a RGB, RBGA or HEX
 */
const parseToRgba = (color: string): RgbaArray => {
  if (typeof color !== 'string') throw new ColorError(color);
  if (color.trim().toLowerCase() === 'transparent') {
    return [0, 0, 0, 0];
  }

  const normalizedColor = color.trim();

  const reducedHexMatch = reducedHexRegex.exec(normalizedColor);
  if (reducedHexMatch) {
    const arr = Array.from(reducedHexMatch).slice(1);
    return [
      ...arr.slice(0, 3).map((x) => parseInt(repeat(x, 2), 16)),
      parseInt(repeat(arr[3] || 'f', 2), 16) / 255,
    ] as RgbaArray;
  }

  const hexMatch = hexRegex.exec(normalizedColor);
  if (hexMatch) {
    const arr = Array.from(hexMatch).slice(1);
    return [
      ...arr.slice(0, 3).map((x) => parseInt(x, 16)),
      parseInt(arr[3] || 'ff', 16) / 255,
    ] as RgbaArray;
  }

  const rgbaMatch = rgbaRegex.exec(normalizedColor);
  if (rgbaMatch) {
    const arr = Array.from(rgbaMatch).slice(1);
    return [
      ...arr.slice(0, 3).map((x) => parseInt(x, 10)),
      parseFloat(arr[3] || '1'),
    ] as RgbaArray;
  }

  throw new ColorError(color);
};

export default parseToRgba;
