/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import type { ComponentPropArrayValues } from '../../types/general';

// Inspired from https://stackoverflow.com/a/15310051
type CartesianInputObject<Props> = Partial<ComponentPropArrayValues<Props>>;
type CartesianOutputObject<Props, PropArray> = Pick<Props, PropArray[number]>[];

function cartesianProduct<Props, PropArray>(
  inputObject: CartesianInputObject<Props>
): CartesianOutputObject<Props, PropArray> {
  const result: CartesianOutputObject<Props> = [];
  const keys = Object.keys(inputObject);
  const maxIndex = keys.length - 1;

  function calculateCartesian(
    obj: { [key: string]: Props },
    currentIndex: number
  ) {
    const currentKey = keys[currentIndex];
    const currentArray = inputObject[currentKey];

    for (
      let elementIndex = 0;
      elementIndex < currentArray.length;
      elementIndex++
    ) {
      const currentCombination = { ...obj }; // Clone the current combination
      currentCombination[currentKey] = currentArray[elementIndex];

      if (currentIndex === maxIndex) {
        result.push(currentCombination);
      } else {
        calculateCartesian(currentCombination, currentIndex + 1);
      }
    }
  }

  calculateCartesian({}, 0);
  return result;
}

export default cartesianProduct;
