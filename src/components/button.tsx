import { button as buttonRecipe } from '@ui/styled-system/recipes';
import { ButtonProps } from './button.types';

const Button = ({
  children,
  color = 'primary',
  fullWidth = true,
  iconDirection = 'start',
  loading = false,
  rounded = false,
  size = 'md',
  variant = 'contained',
  disabled = false,
  icon,
}: ButtonProps) => {
  const buttonClasses = buttonRecipe({
    color,
    variant,
    iconDirection,
    loading,
    size,
    rounded,
    fullWidth,
    disabled,
  });

  return (
    <button data-has-icon={icon} className={buttonClasses}>
      {children}
    </button>
  );
};

export default Button;
