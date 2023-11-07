/**
 * NOTE: Implementations inspired from `color2k` package.
 * https://github.com/ricokahler/color2k
 *
 * The only differences are a bit of improving the code readability as well as changing implementation of `parseToRgba` method which is ~1k smaller in gzip by limiting the accepting input formats (HSL, HSLA and named css colors are not supported)
 */

export { default as rgba } from './rgba';
export { default as parseToRgba } from './parseToRgba';
export { default as mix } from './mix';
export { default as transparentize } from './transparentize';
export { default as colorTransformer } from './colorTransformer';
