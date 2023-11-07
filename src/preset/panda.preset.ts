import { definePreset } from '@pandacss/dev';
import { colorTransformer } from '../utils/color';
import { buttonRecipe } from '../components/button.style';

export const themePreset = definePreset({
  theme: {
    extend: {
      recipes: {
        button: buttonRecipe,
      },
    },
    tokens: {
      colors: {
        primary: colorTransformer('#22A958'),
        secondary: colorTransformer('#575EFF'),
        error: colorTransformer('#DF1D17'),
        warning: colorTransformer('#EBA825'),
        neutral: colorTransformer('#686C79'),
      },
    },
  },
});
