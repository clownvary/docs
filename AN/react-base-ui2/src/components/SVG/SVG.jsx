import React from 'react';
import { string } from 'prop-types';


const SVGPropTypes = {
  /**
   * SVG symbol prefix defined in svg sprite.
   */
  symbolPrefix: string,
  /**
   * SVG symbol name defined in svg sprite.
   */
  name: string.isRequired
};

const SVGDefaultProps = {
  symbolPrefix: 'an-icon'
};

/**
 * UI component to display an SVG image based on the SVG sprite technology
 *
 * Usage:
 *
 * 1. Install the "svg-sprite-loader", more details can be found at
 * https://www.npmjs.com/package/svg-sprite-loader
 * ```bash
 * npm i -S "svg-sprite-loader"
 * ```
 * 2. Add a webpack rule to let it resolve the svg images through the "svg-sprite-loader".
 * ```js
 * // build/sections/rules/svg.js
 * {
 *   test: /\.svg$/,
 *   use: [
 *     {
 *       loader: 'svg-sprite-loader',
 *       options: {
 *         symbolId: 'svg-[name]'
 *       }
 *     }
 *   ]
 *   include: [/\/svgs\//]
 * }
 * ```
 * You may need to exclude your svg paths in the webpack's font rules because font rules
 * may also resolve the files with ".svg" suffix.
 * ```js
 * // build/sections/rules/font.js
 * {
 *   test: /\.(eot|ttf|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
 *   use: [
 *     {
 *       loader: 'file-loader',
 *       options: {
 *         symbolId: 'fonts/[name].[ext]'
 *       }
 *     }
 *   ]
 *   exclude: [/\/svgs\//]
 * }
 * ```
 * 3. Put the svg images in the paths follow your webpack's configuration.
 * ```js
 * MyComponent
 * ├── index.jsx
 * ├── index.less
 * └── svgs
 *     ├── a.svg
 *     ├── b.svg
 *     └── index.js
 * ```
 * 4. Add an index file and import the svg images.
 * ```js
 * // MyComponent/svgs/index.js
 * import './a.svg';
 * import './b.svg';
 * ```
 * 5. Import the index file of your svg images.
 * ```js
 * // MyComponent/index.jsx
 * import './svgs';
 * ```
 * 6. Render the SVG component with the desired SVG symbol name.
 * ```js
 * // MyComponent/index.jsx
 * <SVG name="a" />
 * <SVG name="a" />
 * ```
 * There is a "symbolPrefix" prop and it's default value is "svg".
 * If your "svg-sprite-loader" set the "symbolId" in another value,
 * You should pass a "symbolPrefix" prop to follow the "symbolId" option.
 * ```js
 * // build/sections/rules/svg.js
 * // set symbolId pattern as 'an-svg-[name]'
 * {
 *   test: /\.svg$/,
 *   use: [
 *     {
 *       loader: 'svg-sprite-loader',
 *       options: {
 *         symbolId: 'an-svg-[name]'
 *       }
 *     }
 *   ]
 *   include: [/\/svgs\//]
 * }
 *
 * // MyComponent/index.jsx
 * // keep the symbolId in the same pattern by "symbolPrefix" prop
 * <SVG name="a" />
 * <SVG name="b" />
 * ```
 */
const SVG = (props) => {
  const { name, symbolPrefix, ...rest } = props;
  return (
    <svg {...rest}>
      <use xlinkHref={`#${[symbolPrefix, name].join('-')}`} />
    </svg>
  );
};

SVG.propTypes = SVGPropTypes;
SVG.defaultProps = SVGDefaultProps;

export default SVG;
