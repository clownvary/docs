'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.InputDateProps = undefined;var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);
var _propTypes = require('prop-types');
var _InputMoment2 = require('../InputMoment');
var _consts = require('../../consts');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/** Default PropTypes of InputDate.
                                                                                                                                     * @memberof InputDate
                                                                                                                                     * @augments InputMoment
                                                                                                                                    */
var InputDatePropTypes = {
  /** Whether to show trigger icon.
                            * @type {boolean}
                           */
  showTrigger: _propTypes.bool,
  /** Whether to show clear icon.
                                 * @type {boolean}
                                */
  showClear: _propTypes.bool };


/** Default Props for InputDate */
var InputDateProps = exports.InputDateProps = (0, _extends3.default)({},
_InputMoment2.InputMomentProps, {
  showTrigger: true,
  showClear: true });


/** UI component of InputDate.*/var
InputDate = function (_InputMoment) {(0, _inherits3.default)(InputDate, _InputMoment);function InputDate() {(0, _classCallCheck3.default)(this, InputDate);return (0, _possibleConstructorReturn3.default)(this, (InputDate.__proto__ || (0, _getPrototypeOf2.default)(InputDate)).apply(this, arguments));}(0, _createClass3.default)(InputDate, [{ key: 'getContainerClassName', value: function getContainerClassName()




    {
      return _consts.DefaultCSSPrefix + '-input-date';
    } }]);return InputDate;}(_InputMoment2.InputMoment);


/**
                                                          * @react-component
                                                          */InputDate.displayName = 'InputDate';InputDate.defaultProps = InputDateProps;InputDate.propTypes = InputDatePropTypes;exports.default =
InputDate;