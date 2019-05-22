'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _defineProperty2 = require('babel-runtime/helpers/defineProperty');var _defineProperty3 = _interopRequireDefault(_defineProperty2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _consts = require('../../consts');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                     * Default PropTypes of Progress.
                                                                                                                                     */
var ProgressPropTypes = {
  /**
                           * Set the completion percentage.
                           */
  percent: _propTypes2.default.number,

  /**
                                        * Determines the progress size.
                                        */
  size: _propTypes2.default.string,

  /**
                                     * Whether to display the progress value.
                                     */
  showInfo: _propTypes2.default.bool };


/** Default Props for Progress. */
var ProgressProps = {
  percent: 0,
  showInfo: true,
  size: _consts.Size3.MEDIUM };


/** UI component that displays Progress with variant settings.*/var
Progress = function (_React$PureComponent) {(0, _inherits3.default)(Progress, _React$PureComponent);function Progress() {(0, _classCallCheck3.default)(this, Progress);return (0, _possibleConstructorReturn3.default)(this, (Progress.__proto__ || (0, _getPrototypeOf2.default)(Progress)).apply(this, arguments));}(0, _createClass3.default)(Progress, [{ key: 'render', value: function render()




    {var _props =
      this.props,className = _props.className,percent = _props.percent,showInfo = _props.showInfo,size = _props.size;
      var progressInfo = _react2.default.createElement('span', { className: 'an-progress__text' }, percent, '%');

      var classString = (0, _classnames2.default)('an-progress', (0, _defineProperty3.default)({
        'an-progress--show-info': showInfo }, 'an-progress--' +
      size, size),
      className);

      return (
        _react2.default.createElement('div', { className: classString },
          _react2.default.createElement('div', { className: 'outer' },
            _react2.default.createElement('div', { className: 'inner' },
              _react2.default.createElement('div', { className: 'meter', style: { width: percent + '%' } }))),


          showInfo && progressInfo));


    } }]);return Progress;}(_react2.default.PureComponent);Progress.displayName = 'Progress';Progress.defaultProps = ProgressProps;Progress.propTypes = ProgressPropTypes;exports.default =


Progress;module.exports = exports['default'];