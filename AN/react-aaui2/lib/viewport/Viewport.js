'use strict';

exports.__esModule = true;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _reactResponsive = require('react-responsive');

var _reactResponsive2 = _interopRequireDefault(_reactResponsive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VIEWPORTS = {
  smAndAbove: { minWidth: '768px' },
  mdAndAbove: { minWidth: '992px' },
  lgAndAbove: { minWidth: '1200px' }
};

var Viewport = function (_PureComponent) {
  (0, _inherits3.default)(Viewport, _PureComponent);

  function Viewport() {
    (0, _classCallCheck3.default)(this, Viewport);
    return (0, _possibleConstructorReturn3.default)(this, _PureComponent.apply(this, arguments));
  }

  Viewport.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        not = _props.not,
        smAndAbove = _props.smAndAbove,
        mdAndAbove = _props.mdAndAbove,
        lgAndAbove = _props.lgAndAbove,
        type = _props.type,
        viewports = _props.viewports; // eslint-disable-line

    var finalViewports = (0, _extends3.default)({}, VIEWPORTS, viewports);
    var mediaQuery = (0, _keys2.default)(finalViewports).reduce(function (mq, v) {
      var viewport = _this2.props[v];

      return viewport ? (not ? 'not ' + type + ' and' : '') + ' (min-width: ' + finalViewports[v].minWidth + ')' : mq;
    }, '') || '()';

    return _react2.default.createElement(
      _reactResponsive2.default,
      { query: mediaQuery },
      this.props.children
    );
  };

  return Viewport;
}(_react.PureComponent);

Viewport.propTypes = {
  smAndAbove: _propTypes.bool,
  mdAndAbove: _propTypes.bool,
  lgAndAbove: _propTypes.bool,
  not: _propTypes.bool,
  type: (0, _propTypes.oneOf)(['all', 'screen', 'print']),
  children: _propTypes.node,
  viewports: _propTypes.object // eslint-disable-line
};
Viewport.defaultProps = {
  smAndAbove: false,
  mdAndAbove: false,
  lgAndAbove: false,
  not: false,
  type: 'screen',
  viewports: {}
};
exports.default = Viewport;
module.exports = exports['default'];