'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _SVG = require('./SVG');var _SVG2 = _interopRequireDefault(_SVG);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var IconPropTypes = {
  /**
                       * Icon symbol prefix defined in svg sprite.
                       */
  symbolPrefix: _propTypes.string,
  /**
                                    * Icon's SVG symbol name defined in svg sprite.
                                    */
  name: _propTypes.string.isRequired,
  size: (0, _propTypes.oneOf)(['sm', 'md', 'lg']),
  type: (0, _propTypes.oneOf)(['normal', 'link', 'error', 'warning', 'info', 'success']) };


var IconDefaultProps = {
  symbolPrefix: 'an-icon',
  size: 'md',
  type: 'normal' };


/**
                     * UI component to display an icon based on the SVG sprite technology
                     *
                     * Usage:
                     *
                     * 1. Install the "svg-sprite-loader", more details can be found at
                     * https://www.npmjs.com/package/svg-sprite-loader
                     * ```bash
                     * npm i -S "svg-sprite-loader"
                     * ```
                     * 2. Add a webpack rule to let it resolve the svg icons through the "svg-sprite-loader".
                     * ```js
                     * // build/sections/rules/icon.js
                     * {
                     *   test: /\.svg$/,
                     *   use: [
                     *     {
                     *       loader: 'svg-sprite-loader',
                     *       options: {
                     *         symbolId: 'icon-[name]'
                     *       }
                     *     }
                     *   ]
                     *   include: [/\/icons\//]
                     * }
                     * ```
                     * You may need to exclude your icon paths in the webpack's font rules because font rules
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
                     *   exclude: [/\/icons\//]
                     * }
                     * ```
                     * 3. Put the icon files in the paths follow your webpack's configuration.
                     * ```js
                     * MyComponent
                     * ├── index.jsx
                     * ├── index.less
                     * └── icons
                     *     ├── icon1.svg
                     *     ├── icon2.svg
                     *     └── index.js
                     * ```
                     * 4. Add an index file and import the svg icons.
                     * ```js
                     * // MyComponent/icons/index.js
                     * import './icon1.svg';
                     * import './icon2.svg';
                     * ```
                     * 5. Import the index file of your icon files.
                     * ```js
                     * // MyComponent/index.jsx
                     * import './icons';
                     * ```
                     * 6. Render the Icon component with the desired SVG symbol name.
                     * ```js
                     * // MyComponent/index.jsx
                     * <Icon name="icon1" />
                     * <Icon name="icon2" />
                     * ```
                     * There is a "symbolPrefix" prop and it's default value is "icon".
                     * If your "svg-sprite-loader" set the "symbolId" in another value,
                     * You should pass a "symbolPrefix" prop to follow the "symbolId" option.
                     * ```js
                     * // build/sections/rules/icon.js
                     * // set symbolId pattern as 'an-icon-[name]'
                     * {
                     *   test: /\.svg$/,
                     *   use: [
                     *     {
                     *       loader: 'svg-sprite-loader',
                     *       options: {
                     *         symbolId: 'an-icon-[name]'
                     *       }
                     *     }
                     *   ]
                     *   include: [/\/icons\//]
                     * }
                     *
                     * // MyComponent/index.jsx
                     * // keep the symbolId in the same pattern by "symbolPrefix" prop
                     * <Icon symbolPrefix="an-icon" name="icon1" />
                     * <Icon symbolPrefix="an-icon" name="icon2" />
                     * ```
                     */
var Icon = function Icon(props) {var
  className = props.className,name = props.name,size = props.size,type = props.type,symbolPrefix = props.symbolPrefix,rest = (0, _objectWithoutProperties3.default)(props, ['className', 'name', 'size', 'type', 'symbolPrefix']);
  return _react2.default.createElement(_SVG2.default, (0, _extends3.default)({
    symbolPrefix: symbolPrefix,
    className: (0, _classnames2.default)('icon-svg', 'icon-svg-' + name, 'icon-svg-size-' + size, 'icon-svg-type-' + type, className),
    name: name },
  rest));

};

Icon.propTypes = IconPropTypes;
Icon.defaultProps = IconDefaultProps;exports.default =

Icon;module.exports = exports['default'];