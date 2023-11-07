import { SystemStyleObject } from '@ui/styled-system/types';
import {
  ComponentPropObjectValues,
  ComponentPropArrayValues,
  isNonNullable,
} from '../../types/general';
import cartesian from './cartesian';

const isBooleanProp = (values: string[]) => {
  if (values.includes('false') && values.includes('true')) return true;
  return false;
};

type PartialComponentType<Props, PropArray extends (keyof Props)[]> = Pick<
  Props,
  PropArray[number]
>;

type PandaCompoundVariantAcceptable<
  Props,
  PropArray extends (keyof Props)[]
> = (PartialComponentType<Props, PropArray> & {
  css: SystemStyleObject;
})[];

const generateCompoundVariants =
  <Props>(propsObject: ComponentPropObjectValues<Props>) =>
  <PropArray extends (keyof Props)[]>(
    propArray: PropArray,
    styleGenerator: (
      props: PartialComponentType<Props, PropArray>
    ) => SystemStyleObject | null
  ): PandaCompoundVariantAcceptable<Props, PropArray> => {
    // Generate prop value list
    const propsToGenerateCombination = propArray.reduce<
      Partial<ComponentPropArrayValues<Props>>
    >((accu, propKey) => {
      const propValues = Object.keys(propsObject[propKey]);
      const value = isBooleanProp(propValues) ? [true, false] : propValues;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      accu[propKey] = value as any;
      return accu;
    }, {});

    // Generate Cartesian product
    const conditionsCombinations = cartesian<Props, PropArray>(
      propsToGenerateCombination
    );

    // Generate compoundVariants that PandaCSS accepts
    const pureCompoundVariants = conditionsCombinations.map((condition) => {
      const style = styleGenerator(condition);
      if (style === null) return null;
      return {
        ...condition,
        css: style,
      };
    });

    // Filter null values
    const compoundVariants = pureCompoundVariants.filter(isNonNullable);

    return compoundVariants;
  };

export default generateCompoundVariants;
