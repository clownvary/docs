'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.QuestionPropTypes = undefined;var _defineProperties = require('babel-runtime/core-js/object/define-properties');var _defineProperties2 = _interopRequireDefault(_defineProperties);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _isArray = require('lodash/isArray');var _isArray2 = _interopRequireDefault(_isArray);
var _isEqual = require('lodash/isEqual');var _isEqual2 = _interopRequireDefault(_isEqual);
var _isNil = require('lodash/isNil');var _isNil2 = _interopRequireDefault(_isNil);
var _isInteger = require('lodash/isInteger');var _isInteger2 = _interopRequireDefault(_isInteger);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _uniqueId = require('lodash/uniqueId');var _uniqueId2 = _interopRequireDefault(_uniqueId);

var _Dropdown = require('../Dropdown');var _Dropdown2 = _interopRequireDefault(_Dropdown);
var _SafeText = require('../SafeText');
var _Checkbox = require('../Checkbox');var _Checkbox2 = _interopRequireDefault(_Checkbox);
var _Input = require('../Input');var _Input2 = _interopRequireDefault(_Input);
var _Radio = require('../Radio');var _Radio2 = _interopRequireDefault(_Radio);
var _InputDate = require('../InputDate');var _InputDate2 = _interopRequireDefault(_InputDate);
var _InputTime = require('../InputTime');var _InputTime2 = _interopRequireDefault(_InputTime);
var _Duration = require('../Duration');var _Duration2 = _interopRequireDefault(_Duration);
var _Phone = require('../Phone');var _Phone2 = _interopRequireDefault(_Phone);
var _i18n = require('../../services/i18n');var _i18n2 = _interopRequireDefault(_i18n);

var _consts = require('./consts');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var QuestionPropTypes = exports.QuestionPropTypes = {
  /**
                                                       * The unique key of question.
                                                       */
  id: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired,
  /**
                                                                                                           * The path of question.
                                                                                                           */
  path: _propTypes2.default.array.isRequired,
  /**
                                               * The text description of question.
                                               */
  text: _propTypes2.default.string.isRequired,
  /**
                                                * The hint text of question.
                                                */
  hint: _propTypes2.default.string.isRequired,
  /**
                                                * Determines the readonly of question.
                                                */
  readonly: _propTypes2.default.bool,
  /**
                                       * Determines the question require an answer.
                                       */
  required: _propTypes2.default.bool,
  /**
                                       * Determines the question is not hidden.
                                       */
  isShown: _propTypes2.default.bool.isRequired,
  /**
                                                 * The error message for the question answer validation.
                                                 */
  errorMsgs: _propTypes2.default.array,
  /**
                                         * The post icon for question.
                                         */
  icon: _propTypes2.default.string,
  /**
                                     * The max length limit for the question answer. Available for question of
                                     * INPUT type with formats: UPPERCASE, LOWERCASE, NUMBER, ALPHA and FREE.
                                     */
  maxLength: _propTypes2.default.number,
  /**
                                          * Determines the width of popup calender will auto resize as input date's width.
                                          * The property will only work for question whose format is InputType.DATE.
                                          * The property will only work for the question whose format is InputType.DATE.
                                          */
  flexibleCalendar: _propTypes2.default.bool,
  /**
                                               * Determines the width of popup menu will auto resize as parent select width.
                                               * The property will only work for the question whose type is QuestionType
                                               * SINGLEDROPDOWN or QuestionType.MULTIPLEDROPDOWN.
                                               */
  flexibleMenu: _propTypes2.default.bool,
  /**
                                           * The placeholder for the question answer. Available for question MULTIPLEDROPDOWN type
                                           * and INPUT type with formats: MULTIPLEDROPDOWN, UPPERCASE, LOWERCASE, NUMBER, ALPHA and FREE.
                                           */
  placeHolder: _propTypes2.default.string,
  /**
                                            * The answer value of question.
                                            */
  value: _propTypes2.default.oneOfType([
  _propTypes2.default.string,
  _propTypes2.default.array,
  _propTypes2.default.number,
  _propTypes2.default.object,
  _propTypes2.default.instanceOf(Date)]),
  // postalCodeType: PropTypes.number,
  /**
   * Determines the render method of question answer section.
   */
  type: _propTypes2.default.oneOf([
  _consts.QuestionType.INPUT,
  _consts.QuestionType.RADIO,
  _consts.QuestionType.SINGLEDROPDOWN,
  _consts.QuestionType.CHECKBOX,
  _consts.QuestionType.MULTIPLEDROPDOWN]),

  /**
                                            * Determines the format of INPUT type question.
                                            */
  format: _propTypes2.default.oneOf([
  _consts.InputType.FREE,
  _consts.InputType.PHONE,
  _consts.InputType.DATE,
  _consts.InputType.TIME,
  _consts.InputType.SSNTB,
  _consts.InputType.POSTAL,
  _consts.InputType.UPPERCASE,
  _consts.InputType.LOWERCASE,
  _consts.InputType.NUMBER,
  _consts.InputType.ALPHA,
  _consts.InputType.DURATION]),

  /**
                                 * The preset answers that only available for question types: RADIO,
                                 * SINGLEDROPDOWN, CHECKBOX and MULTIPLEDROPDOWN.
                                 */
  answers: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    /**
                                                                    * The display text of answer option.
                                                                    */
    text: _propTypes2.default.string.isRequired,
    /**
                                                  * The value of answer option.
                                                  */
    value: _propTypes2.default.oneOfType([
    _propTypes2.default.number.isRequired,
    _propTypes2.default.string.isRequired]) })),

  /**
                                                  * The callback function that is triggered when changes the answer value.
                                                  */
  onChange: _propTypes2.default.func,
  /**
                                       * The callback function that is triggered when clicks the post question icon.
                                       */
  onIconClick: _propTypes2.default.func };var


Question = function (_React$PureComponent) {(0, _inherits3.default)(Question, _React$PureComponent);



  function Question(props) {(0, _classCallCheck3.default)(this, Question);var _this = (0, _possibleConstructorReturn3.default)(this, (Question.__proto__ || (0, _getPrototypeOf2.default)(Question)).call(this,
    props));_this.



















    componentWillReceiveProps = function (nextProps) {
      if (!(0, _isEqual2.default)(nextProps.value, _this.props.value)) {
        _this.value = nextProps.value;
      }
    };_this.state = { value: _this.props.value };return _this;}(0, _createClass3.default)(Question, [{ key: 'componentDidMount', value: function componentDidMount() {(0, _defineProperties2.default)(this, { value: { get: function get() {return this.state.value;}, set: function set(val) {this.setState({ value: val });} } });} }, { key: 'onChange', value: function onChange(

    value) {var _props =
      this.props,onChange = _props.onChange,id = _props.id,path = _props.path;
      if ((0, _isFunction2.default)(onChange)) {
        onChange({ id: id, path: path, value: value });
      }
    } }, { key: 'onIconClick', value: function onIconClick()

    {var _props2 =
      this.props,onIconClick = _props2.onIconClick,id = _props2.id,path = _props2.path,required = _props2.required;
      if (required) {
        return;
      }
      (0, _isFunction2.default)(onIconClick) && onIconClick({ id: id, path: path });
    } }, { key: 'formatArrayValue', value: function formatArrayValue(

    val) {
      var myValue = (0, _isNil2.default)(val) ? [] : val;
      myValue = (0, _isArray2.default)(myValue) ? myValue : [myValue];
      return myValue.map(function (v) {return '' + v;});
    } }, { key: 'renderQuestionItem', value: function renderQuestionItem()

    {var _this2 = this;var _props3 =











      this.props,id = _props3.id,readonly = _props3.readonly,format = _props3.format,type = _props3.type,answers = _props3.answers,errorMsgs = _props3.errorMsgs,maxLength = _props3.maxLength,placeHolder = _props3.placeHolder,text = _props3.text,flexibleCalendar = _props3.flexibleCalendar,flexibleMenu = _props3.flexibleMenu;var
      value = this.state.value;
      var isError = (0, _isArray2.default)(errorMsgs) && errorMsgs.length > 0;
      var maxLen = (0, _isInteger2.default)(maxLength) ? parseInt(maxLength, 10) : '';

      switch (type) {
        case _consts.QuestionType.RADIO:
          return _react2.default.createElement(_Radio.RadioGroup, {
              className: (0, _classnames2.default)({ 'question-error': isError }),
              name: (0, _uniqueId2.default)(id + '-'),
              value: '' + value,
              disabled: readonly,
              onChange: function onChange(_ref) {var val = _ref.target.value;
                _this2.setState({ value: val }, function () {return _this2.onChange(val);});
              } },

            answers.map(function (answer, index) {return (
                _react2.default.createElement(_Radio2.default, { key: id + '_' + index, value: '' + answer.value },
                  answer.text));}));



        case _consts.QuestionType.SINGLEDROPDOWN:
          return _react2.default.createElement(_Dropdown2.default, {
            data: answers.map(function (answer) {return { text: answer.text, value: '' + answer.value };}),
            value: '' + value,
            flexibleMenu: flexibleMenu,
            disabled: readonly,
            onChange: function onChange(obj) {
              _this2.setState({ value: obj.value });
              _this2.onChange(obj.value);
            } });

        case _consts.QuestionType.CHECKBOX:
          return _react2.default.createElement(_Checkbox.CheckboxGroup, {
              className: (0, _classnames2.default)({ 'question-error': isError }),
              name: (0, _uniqueId2.default)(id + '-'),
              value: this.formatArrayValue(value),
              disabled: readonly,
              onChange: function onChange(val) {
                _this2.setState({ value: val });
                _this2.onChange(val);
              } },

            answers.map(function (answer, index) {return (
                _react2.default.createElement(_Checkbox2.default, { key: id + '_' + index, className: 'checkbox-item', value: '' + answer.value },
                  answer.text));}));



        case _consts.QuestionType.MULTIPLEDROPDOWN:
          return _react2.default.createElement(_Dropdown2.default, {
            data: answers.map(function (answer) {return { text: answer.text, value: '' + answer.value };}),
            value: this.formatArrayValue(value),
            disabled: readonly,
            flexibleMenu: flexibleMenu,
            placeholder: 'Select answers',
            showCheckbox: true,
            onChange: function onChange(obj) {
              _this2.setState({ value: obj.value });
              _this2.onChange(obj.value);
            } });

        case _consts.QuestionType.INPUT:
        default:
          switch (format) {
            case _consts.InputType.PHONE:
              return _react2.default.createElement(_Phone2.default, {
                value: value,
                disabled: readonly,
                ariaLabel: 'Phone ' + text,
                onChange: function onChange(val) {
                  _this2.setState({ value: val });
                  _this2.onChange(val);
                } });

            case _consts.InputType.DATE:
              return _react2.default.createElement(_InputDate2.default, {
                disabled: readonly,
                value: value,
                showClear: false,
                flexibleCalendar: flexibleCalendar,
                ariaLabel: 'Input date ' + text,
                onValueChange: function onValueChange(e) {
                  _this2.setState({ value: e.value && e.value.toDate() });
                  _this2.onChange(_i18n2.default.formatDate(e.value));
                } });

            case _consts.InputType.TIME:
              return _react2.default.createElement(_InputTime2.default, {
                disabled: readonly,
                value: _i18n2.default.parseTime(value),
                showClear: false,
                ariaLabel: 'Input time ' + text,
                onValueChange: function onValueChange(e) {
                  _this2.setState({ value: e.value && e.value.toDate() });
                  _this2.onChange(_i18n2.default.formatTime(e.value));
                } });

            case _consts.InputType.SSNTB:
              return _react2.default.createElement(_Input2.default, {
                disabled: readonly,
                value: value,
                maxLength: 11,
                formula: /\d/,
                ariaLabel: 'SSN ' + text,
                onChange:
                function onChange(_ref2) {var val = _ref2.target.value;
                  _this2.setState({ value: val });
                },
                onBlur: function onBlur(_ref3) {var val = _ref3.target.value;return _this2.onChange(val);} });

            case _consts.InputType.POSTAL:
              return _react2.default.createElement(_Input2.default, {
                maxLength: 10,
                disabled: readonly,
                value: value,
                ariaLabel: 'Postal ' + text,
                onChange:
                function onChange(_ref4) {var val = _ref4.target.value;
                  _this2.setState({ value: val });
                },
                onBlur: function onBlur(_ref5) {var val = _ref5.target.value;return _this2.onChange(val);} });

            case _consts.InputType.UPPERCASE:
              return _react2.default.createElement(_Input2.default, {
                disabled: readonly,
                maxLength: maxLen,
                placeholder: placeHolder,
                value: value,
                ariaLabel: 'Input upper case box ' + text,
                onChange:
                function onChange(_ref6) {var val = _ref6.target.value;
                  _this2.setState({ value: val.toLocaleUpperCase() });
                },
                onBlur:
                function onBlur(_ref7) {var val = _ref7.target.value;
                  _this2.onChange(val);
                } });

            case _consts.InputType.LOWERCASE:
              return _react2.default.createElement(_Input2.default, {
                maxLength: maxLen,
                disabled: readonly,
                placeholder: placeHolder,
                value: value,
                ariaLabel: 'Input lower case box ' + text,
                onChange:
                function onChange(_ref8) {var val = _ref8.target.value;
                  _this2.setState({ value: val.toLocaleLowerCase() });
                },
                onBlur:
                function onBlur(_ref9) {var val = _ref9.target.value;
                  _this2.onChange(val);
                } });

            case _consts.InputType.NUMBER:
              return _react2.default.createElement(_Input2.default, {
                maxLength: maxLen,
                disabled: readonly,
                placeholder: placeHolder,
                value: value,
                formula: /\d/,
                ariaLabel: 'Input number case box ' + text,
                onChange:
                function onChange(_ref10) {var val = _ref10.target.value;
                  _this2.setState({ value: val });
                },
                onBlur:
                function onBlur(_ref11) {var val = _ref11.target.value;
                  _this2.onChange(val);
                } });

            case _consts.InputType.ALPHA:
              return _react2.default.createElement(_Input2.default, {
                maxLength: maxLen,
                disabled: readonly,
                placeholder: placeHolder,
                value: value,
                formula: /[a-zA-Z]/,
                ariaLabel: 'Input alpha case box ' + text,
                onChange:
                function onChange(_ref12) {var val = _ref12.target.value;
                  _this2.setState({ value: val });
                },
                onBlur: function onBlur(_ref13) {var val = _ref13.target.value;return _this2.onChange(val);} });

            case _consts.InputType.DURATION:
              return _react2.default.createElement(_Duration2.default, {
                disabled: readonly,
                value: value,
                ariaLabel: 'Input duration box ' + text,
                onChange:
                function onChange(duration) {
                  _this2.setState({ value: duration });
                  _this2.onChange(duration);
                } });

            case _consts.InputType.FREE:
            default:
              return _react2.default.createElement(_Input2.default, {
                maxLength: maxLen,
                disabled: readonly,
                placeholder: placeHolder,
                value: value,
                ariaLabel: 'Input box ' + text,
                onChange:
                function onChange(_ref14) {var postalCodeVal = _ref14.target.value;
                  _this2.setState({ value: postalCodeVal });
                },
                onBlur: function onBlur(_ref15) {var val = _ref15.target.value;return _this2.onChange(val);} });}}



    } }, { key: 'render', value: function render()

    {var _this3 = this;var _props4 =


      this.props,isShown = _props4.isShown,id = _props4.id,required = _props4.required,hint = _props4.hint,hightlight = _props4.hightlight,errorMsgs = _props4.errorMsgs,icon = _props4.icon,text = _props4.text,isBoldBorder = _props4.isBoldBorder,path = _props4.path,questionLabelClass = _props4.questionLabelClass,questionContainerClass = _props4.questionContainerClass;
      var subQuestion = path.indexOf('subQuestion') >= 0;
      return (
        _react2.default.createElement('div', {
            className: (0, _classnames2.default)('question', 'aaui-flex',
            {
              'u-hidden': !isShown,
              'sub-question': subQuestion,
              'question-error': (0, _isArray2.default)(errorMsgs) && errorMsgs.length > 0,
              'is-bold-border': isBoldBorder }),


            key: 'question_' + id },

          _react2.default.createElement('div', { className: (0, _classnames2.default)('afx-col', 'question-label', questionLabelClass || 'afx-xl-6-12') },
            _react2.default.createElement('div', { className: 'question-label__name' },
              _react2.default.createElement('span', { className: '' + (required ? 'icon icon-asterisk' : 'icon icon-circle') }),
              _react2.default.createElement(_SafeText.SafeText, {
                dangerMode: true,
                className: (0, _classnames2.default)({
                  hightlight: !!hightlight,
                  'question-label__name-required': required }),

                tagName: 'span',
                text: text })),


            _react2.default.createElement('div', { className: 'question-label__hint' },
              _react2.default.createElement(_SafeText.SafeText, { dangerMode: true, tagName: 'span', text: hint }))),


          _react2.default.createElement('div', { className: (0, _classnames2.default)('afx-col', 'question-answer-container', questionContainerClass || 'afx-xl-5-12') },
            _react2.default.createElement('div', { className: 'question-answer' },
              this.renderQuestionItem(),
              (0, _isArray2.default)(errorMsgs) && errorMsgs.map(function (errorMsg, i) {return (
                  _react2.default.createElement('div', { key: i, className: 'question-answer__error' },
                    _react2.default.createElement('span', { className: 'icon icon-times-circle' }),
                    _react2.default.createElement(_SafeText.SafeText, { dangerMode: true, tagName: 'span', text: errorMsg })));}))),




          _react2.default.createElement('div', { className: (0, _classnames2.default)('afx-col', 'afx-xl-1-12', 'question-icon') },

            icon &&
            _react2.default.createElement('span', {
              className: (0, _classnames2.default)('icon', icon, 'link', {
                'is-disabled': required }),

              onClick: function onClick() {return _this3.onIconClick();} }))));





    } }]);return Question;}(_react2.default.PureComponent);Question.displayName = 'Question';Question.propTypes = QuestionPropTypes;exports.default = Question;