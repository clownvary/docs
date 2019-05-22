'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _Question = require('./Question');var _Question2 = _interopRequireDefault(_Question);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var QuestionGroupPropTypes = {
  /**
                                * An array that content type must be same with Question PropTypes,
                                * you can check Question component doc
                                */
  questions: _propTypes2.default.array.isRequired,
  /**
                                                    * Unique key of question group
                                                    */
  groupId: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired,
  /**
                                                                                                                * Customize group name
                                                                                                                */
  groupName: _propTypes2.default.string.isRequired };var

QuestionGroup = function (_React$PureComponent) {(0, _inherits3.default)(QuestionGroup, _React$PureComponent);function QuestionGroup() {(0, _classCallCheck3.default)(this, QuestionGroup);return (0, _possibleConstructorReturn3.default)(this, (QuestionGroup.__proto__ || (0, _getPrototypeOf2.default)(QuestionGroup)).apply(this, arguments));}(0, _createClass3.default)(QuestionGroup, [{ key: 'render', value: function render()



    {var _props =








      this.props,questions = _props.questions,groupId = _props.groupId,groupName = _props.groupName,onChange = _props.onChange,onIconClick = _props.onIconClick,isBoldBorder = _props.isBoldBorder,questionLabelClass = _props.questionLabelClass,questionContainerClass = _props.questionContainerClass;
      return (
        _react2.default.createElement('div', {
            key: 'questiongroup_' + groupId,
            className: (0, _classnames2.default)('questiongroup', { 'is-bold-border': isBoldBorder }) },

          _react2.default.createElement('div', { className: 'questiongroup-header' },
            _react2.default.createElement('span', { className: 'icon icon-circle' }),
            _react2.default.createElement('span', null, groupName || 'Custom Question Group')),

          _react2.default.createElement('div', { className: 'questiongroup-body' },

            questions.map(function (question) {return (
                _react2.default.createElement(_Question2.default, (0, _extends3.default)({
                  key: 'question_' + question.id },
                question, {
                  onChange: onChange,
                  onIconClick: onIconClick,
                  questionLabelClass: questionLabelClass,
                  questionContainerClass: questionContainerClass })));}))));





    } }]);return QuestionGroup;}(_react2.default.PureComponent);QuestionGroup.displayName = 'QuestionGroup';QuestionGroup.propTypes = QuestionGroupPropTypes;exports.default =

QuestionGroup;module.exports = exports['default'];