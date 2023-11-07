import mix from './mix';
import transparentize from './transparentize';

const overlayColorHex = '#fff';

const colorTransformer = (color: string) => ({
  DEFAULT: {
    value: color,
  },
  transparent: {
    get overlay() {
      return {
        value: mix(color, overlayColorHex, 0.1),
      };
    },
    get opacity() {
      return {
        value: transparentize(color, 0.1),
      };
    },
  },
  hover: {
    get overlay() {
      return {
        value: mix(color, overlayColorHex, 0.04),
      };
    },
    get opacity() {
      return {
        value: transparentize(color, 0.04),
      };
    },
  },
  focus: {
    get overlay() {
      return {
        value: mix(color, overlayColorHex, 0.12),
      };
    },
    get opacity() {
      return {
        value: transparentize(color, 0.12),
      };
    },
  },
  pressed: {
    get overlay() {
      return {
        value: mix(color, overlayColorHex, 0.1),
      };
    },
    get opacity() {
      return {
        value: transparentize(color, 0.1),
      };
    },
  },
  selected: {
    get overlay() {
      return {
        value: mix(color, overlayColorHex, 0.08),
      };
    },
    get opacity() {
      return {
        value: transparentize(color, 0.08),
      };
    },
  },
});

export default colorTransformer;
