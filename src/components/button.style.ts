import { defineRecipeWithVariants } from '../types/general';
import type { SystemStyleObject } from '@ui/styled-system/types';
import type { ButtonStyleProps } from './button.types';
import { buttonProps } from './button.types';
import generateCompoundVariants from '../utils/style/generateCompoundVariants';
import { elevations } from '../theme/elevation';

const generateButtonStyle =
  generateCompoundVariants<ButtonStyleProps>(buttonProps);

type ButtonGenerator<UsedProps extends keyof ButtonStyleProps> = (
  props: Pick<ButtonStyleProps, UsedProps>
) => SystemStyleObject | null;

export const generateButtonColor: ButtonGenerator<'variant' | 'color'> = ({
  color,
  variant,
}) => {
  if (color === 'background' && variant === 'contained') {
    return { color: 'primary' };
  }

  switch (variant) {
    case 'text':
    case 'outlined':
    case 'elevation':
      return { color: color };

    case 'contained':
    default:
      // TODO: add text
      return {
        color: 'black',
      };
  }
};

export const generateButtonBackgroundColor: ButtonGenerator<
  'variant' | 'color' | 'disabled'
> = ({ color, variant, disabled }) => {
  if (disabled) {
    // if (variant === 'contained' || variant === 'elevation') {
    //   return transparentize(colors.text.surface.disabled, 0.12);
    // }

    // TODO: add neutral color
    return {
      backgroundColor: 'primary',
    };
  }

  switch (variant) {
    case 'text':
    case 'outlined':
      return {
        backgroundColor: 'transparent',
      };
    case 'elevation':
      return {
        // TODO: add background color
        backgroundColor: 'primary',
        _hover: {
          backgroundColor: 'primary.hover.overlay',
        },
        _focus: {
          backgroundColor: 'primary.focus.opacity',
        },
      };
    case 'contained':
    default:
      return {
        backgroundColor: color,
        _hover: {
          backgroundColor: `${color}.hover.overlay`,
        },
        _focus: {
          backgroundColor: `${color}.focus.opacity`,
        },
      };
  }
};

const generateButtonPadding: ButtonGenerator<'variant' | 'iconDirection'> = ({
  variant,
  iconDirection,
}) => {
  const withIconPadding = variant === 'text' ? '0.5rem' : '0.75rem';
  const withoutIconPadding = '1rem';

  if (iconDirection == 'start') {
    return {
      '&[data-has-icon]': {
        paddingInlineStart: withIconPadding,
      },
      paddingInlineStart: withoutIconPadding,
      paddingInlineEnd: withoutIconPadding,
    };
  } else {
    return {
      '&[data-has-icon]': {
        paddingInlineEnd: withIconPadding,
      },
      paddingInlineEnd: withoutIconPadding,
      paddingInlineStart: withoutIconPadding,
    };
  }
};

export type MapSizeToProperty = Record<ButtonStyleProps['size'], `${number}px`>;
const mapButtonSizeToHeight: MapSizeToProperty = {
  lg: '48px',
  md: '40px',
  sm: '36px',
};

const generateButtonHeight: ButtonGenerator<'size'> = ({ size }) => ({
  height: mapButtonSizeToHeight[size],
});

export const generateButtonBorder: ButtonGenerator<
  'disabled' | 'color' | 'variant'
> = ({ disabled, color, variant }) => {
  if (variant === 'outlined') {
    const borderColor = disabled ? 'neutral' : color;

    return {
      border: `1.5px solid token(colors.${borderColor})`,
    };
  }

  return null;
};

export const buttonRecipe = defineRecipeWithVariants<ButtonStyleProps>({
  className: 'button',
  description: 'The styles for the Button component',
  base: {
    // ButtonBase
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'inherit',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    WebkitTapHighlightColor: 'transparent',
    _disabled: {
      cursor: 'not-allowed',
    },

    // Button
    borderRadius: '0.5rem',
    minWidth: '64px',
    boxShadow: elevations[2],

    _hover: {
      boxShadow: elevations[1],
    },
  },
  variants: buttonProps,
  compoundVariants: [
    ...generateButtonStyle(['variant', 'color'], generateButtonColor),
    ...generateButtonStyle(
      ['variant', 'color', 'disabled'],
      generateButtonBackgroundColor
    ),
    ...generateButtonStyle(['variant', 'iconDirection'], generateButtonPadding),
    ...generateButtonStyle(['size'], generateButtonHeight),
    ...generateButtonStyle(
      ['disabled', 'variant', 'color'],
      generateButtonBorder
    ),
    {
      rounded: true,
      css: {
        borderRadius: '2rem',
      },
    },
    {
      fullWidth: true,
      css: {
        width: '100%',
      },
    },
    {
      variant: 'elevation',
      css: {
        boxShadow: 'none',
      },
    },
  ],
});
