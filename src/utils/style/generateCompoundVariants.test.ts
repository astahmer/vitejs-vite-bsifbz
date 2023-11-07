import {
  generateButtonBackgroundColor,
  generateButtonBorder,
  generateButtonColor,
} from '../../components/button.style';
import { ButtonStyleProps, buttonProps } from '../../components/button.types';
import generateCompoundVariants from './generateCompoundVariants';

const generateButtonStyle =
  generateCompoundVariants<ButtonStyleProps>(buttonProps);
const result = generateButtonStyle(
  ['disabled', 'variant', 'color'],
  generateButtonBackgroundColor
);

console.log(result);
