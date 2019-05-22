'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.ComboBoxProps = undefined;var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _InputBase2 = require('../InputBase');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
/* eslint-disable  react/no-unused-prop-types */
/* eslint-disable  react/forbid-prop-types */
/* eslint-disable  no-nested-ternary */
/**
                                         *  Default Props of ComboBox
                                         * @name ComboBoxProps
                                         * @const
                                         */
var ComboBoxProps = exports.ComboBoxProps = (0, _extends3.default)({},
_InputBase2.InputBaseProps, {
  showTrigger: true });


/**
                          * ComboBox Component
                          * @react-component
                          */var
ComboBox = function (_InputBase) {(0, _inherits3.default)(ComboBox, _InputBase);function ComboBox() {(0, _classCallCheck3.default)(this, ComboBox);return (0, _possibleConstructorReturn3.default)(this, (ComboBox.__proto__ || (0, _getPrototypeOf2.default)(ComboBox)).apply(this, arguments));}return ComboBox;}(_InputBase2.InputBase);ComboBox.
displayName = 'ComboBox';ComboBox.
defaultProps = ComboBoxProps;exports.default =

ComboBox;