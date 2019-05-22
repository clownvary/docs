'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _dataAccess = require('./shared/data-access');

var da = _interopRequireWildcard(_dataAccess);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProgressSteps = function (_PureComponent) {
  (0, _inherits3.default)(ProgressSteps, _PureComponent);

  function ProgressSteps() {
    (0, _classCallCheck3.default)(this, ProgressSteps);
    return (0, _possibleConstructorReturn3.default)(this, _PureComponent.apply(this, arguments));
  }

  ProgressSteps.prototype.render = function render() {
    var _classNames;

    var _props = this.props,
        className = _props.className,
        style = _props.style,
        size = _props.size,
        steps = _props.steps;

    var classes = (0, _classnames2.default)((_classNames = {
      'progress-steps': true
    }, _classNames['progress-steps--' + size] = size, _classNames), className);

    return _react2.default.createElement(
      'ul',
      { className: classes, style: style },
      steps.map(function (step) {
        return _react2.default.createElement(
          'li',
          {
            key: da.get(step, 'text'),
            className: 'progress-steps__step ' + da.get(step, 'status')
          },
          _react2.default.createElement(
            'span',
            { className: 'progress-steps__step-text' },
            da.get(step, 'text')
          )
        );
      })
    );
  };

  return ProgressSteps;
}(_react.PureComponent);

ProgressSteps.displayName = 'AAUIProgressSteps';
ProgressSteps.propTypes = {
  className: _propTypes.string,
  size: _propTypes.string,
  steps: _propTypes.array, // eslint-disable-line
  style: _propTypes.object // eslint-disable-line
};
exports.default = ProgressSteps;
module.exports = exports['default'];