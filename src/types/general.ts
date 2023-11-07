import type {
  RecipeSelection,
  RecipeVariantRecord,
  RecipeConfig,
  SystemStyleObject,
} from '@ui/styled-system/types';

export const defineRecipeWithVariants = <
  T extends RecipeSelection<RecipeVariantRecord>
>(
  config: RecipeConfig<{
    [K in keyof T]: T[K] extends string
      ? Record<T[K], SystemStyleObject>
      : T[K] extends boolean
      ? Record<'true' | 'false', SystemStyleObject>
      : never;
  }>
) => config;

export type InferFromBooleanPropRecord<T extends object> = T extends {
  true: object;
  false: object;
}
  ? boolean
  : never;

export type InferFromPropRecord<T extends object> = keyof T;

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type ComponentPropObjectValues<ComponentType> = {
  [K in keyof ComponentType]: ComponentType[K] extends boolean
    ? Record<'true' | 'false', SystemStyleObject>
    : ComponentType[K] extends string
    ? Record<ComponentType[K], SystemStyleObject>
    : Record<string, object>;
};

export type ComponentPropArrayValues<ComponentType> = {
  [K in keyof ComponentType]: ComponentType[K] extends boolean
    ? ('true' | 'false')[]
    : ComponentType[K];
};

export const isNonNullable = <T>(value: T | null): value is T => value !== null;
