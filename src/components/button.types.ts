import type { ReactNode } from 'react';
import {
  InferFromBooleanPropRecord,
  InferFromPropRecord,
  PartialBy,
} from '../types/general';
import { booleanRecord, colorRecord } from '../types/theme';

export const buttonProps = {
  color: {
    ...colorRecord,
    background: {},
  },
  variant: {
    text: {},
    contained: {},
    outlined: {
      borderWidth: '4px',
    },
    elevation: {},
  },
  iconDirection: {
    start: {},
    end: {},
  },
  size: {
    sm: {},
    md: {},
    lg: {},
  },
  fullWidth: booleanRecord,
  loading: booleanRecord,
  rounded: booleanRecord,
  disabled: booleanRecord,
};

export interface ButtonBaseProps {
  /**
   * The content of the component.
   */
  children?: ReactNode;
  /**
   * The color of the button.
   */
  color: InferFromPropRecord<typeof buttonProps.color>;
  /**
   * If true, button will be expanded to the full width.
   */
  fullWidth: InferFromBooleanPropRecord<typeof buttonProps.fullWidth>;
  /**
   * If provided, the icon will be rendered inside the button.
   */
  icon?: ReactNode;
  /**
   * Specifies the direction of the icon.
   * If you set iconDirection but not the icon it self
   */
  iconDirection: InferFromPropRecord<typeof buttonProps.iconDirection>;
  /**
   * If true, loading styles will be applied.
   */
  loading: InferFromBooleanPropRecord<typeof buttonProps.loading>;
  /**
   * If true, the button will be rounded.
   */
  rounded: InferFromBooleanPropRecord<typeof buttonProps.rounded>;
  /**
   * The size of the button.
   */
  size: InferFromPropRecord<typeof buttonProps.size>;
  /**
   * Specifies the variant of the button.
   */
  variant: InferFromPropRecord<typeof buttonProps.variant>;
  /**
   * Specified whether or not the button is disabled
   */
  disabled: InferFromBooleanPropRecord<typeof buttonProps.disabled>;
}

export type ButtonStyleProps = Pick<
  ButtonBaseProps,
  | 'color'
  | 'fullWidth'
  | 'iconDirection'
  | 'loading'
  | 'rounded'
  | 'size'
  | 'variant'
  | 'disabled'
>;

export type ButtonProps = PartialBy<
  ButtonBaseProps,
  | 'rounded'
  | 'variant'
  | 'fullWidth'
  | 'color'
  | 'size'
  | 'icon'
  | 'iconDirection'
  | 'loading'
  | 'disabled'
>;
