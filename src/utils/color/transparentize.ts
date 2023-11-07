import guard from '../guard';
import parseToRgba from './parseToRgba';
import rgba from './rgba';

/**
 * Takes in a color and makes it transparent by converting it to `rgba` and
 * setting the amount in the alpha channel.
 *
 * @param color Can be RGB or HEX
 * @param amount The amount to set the transparency by, given as a decimal between 0 and 1
 */
function transparentize(color: string, amount: number): string {
  const [r, g, b] = parseToRgba(color);
  const guardedAmount = guard(0, 1, amount);
  return rgba(r, g, b, guardedAmount);
}

export default transparentize;
