import guard from '../guard';

const generateGuardedColor = (color: number, fixedPointDigits?: number) =>
  guard(0, 255, color).toFixed(fixedPointDigits);

/**
 * Takes in rgba parts and returns an rgba string
 *
 * @param red The amount of red in the red channel, given in a number between 0 and 255 inclusive
 * @param green The amount of green in the red channel, given in a number between 0 and 255 inclusive
 * @param blue The amount of blue in the red channel, given in a number between 0 and 255 inclusive
 * @param alpha Percentage of opacity, given as a decimal between 0 and 1
 */
function rgba(red: number, green: number, blue: number, alpha: number): string {
  const guardedRed = generateGuardedColor(red);
  const guardedGreen = generateGuardedColor(green);
  const guardedBlue = generateGuardedColor(blue);
  const guardedAlpha = generateGuardedColor(alpha, 3);

  return `rgba(${guardedRed}, ${guardedGreen}, ${guardedBlue}, ${parseFloat(
    guardedAlpha
  )})`;
}

export default rgba;
