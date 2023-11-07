/**
 * A simple guard function:
 */
function guard(min: number, max: number, value: number): number {
  return Math.min(Math.max(min, value), max);
}

export default guard;
