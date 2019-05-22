'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _utils = require('./shared/utils');

var _keyCodes = require('./shared/keyCodes');

var _keyCodes2 = _interopRequireDefault(_keyCodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TRIGGER_NAMES = ['button', 'input', 'enter'];
var BUTTON = TRIGGER_NAMES[0],
    INPUT = TRIGGER_NAMES[1],
    ENTER = TRIGGER_NAMES[2];

var propTypes = {
  delay: _propTypes.number,
  value: _propTypes.string,
  className: _propTypes.string,
  placeholder: _propTypes.string,
  searchBtnText: _propTypes.string,
  size: (0, _propTypes.oneOf)(['', 'lg']),
  trigger: (0, _propTypes.oneOf)(TRIGGER_NAMES),
  onChange: _propTypes.func,
  onSearch: _propTypes.func
};
var defaultProps = {
  delay: 500,
  value: '',
  placeholder: 'Enter your search here...',
  searchBtnText: 'Search',
  size: '',
  trigger: BUTTON,
  onChange: _utils.noop,
  onSearch: _utils.noop
};

var SearchInput = function (_PureComponent) {
  (0, _inherits3.default)(SearchInput, _PureComponent);

  function SearchInput(props) {
    (0, _classCallCheck3.default)(this, SearchInput);

    var _this = (0, _possibleConstructorReturn3.default)(this, _PureComponent.call(this, props));

    _this.triggerSearch = function (value) {
      _this.props.onSearch(value.trim());
    };

    _this.handleChange = function (e) {
      var value = e.target.value;
      var _this$props = _this.props,
          trigger = _this$props.trigger,
          onChange = _this$props.onChange;


      onChange(value);

      _this.setState({
        value: value
      }, function () {
        if (trigger === INPUT) {
          _this.debouncedOnChange(value);
        }
      });
    };

    _this.handleKeyDown = function (e) {
      var trigger = _this.props.trigger;
      var value = _this.state.value;

      // Enable `ENTER` by default if trigger is set as `BUTTON`

      if ((trigger === ENTER || trigger === BUTTON) && e.keyCode === _keyCodes2.default.ENTER) {
        e.preventDefault();

        _this.triggerSearch(value);
      }
    };

    _this.handleButtonClick = function () {
      var value = _this.state.value;


      _this.triggerSearch(value);
    };

    _this.handleCloseIconClick = function () {
      _this.setState({
        value: ''
      }, function () {
        _this.triggerSearch(_this.state.value);
      });
    };

    _this.state = {
      value: _this.props.value
    };

    _this.debouncedOnChange = (0, _utils.debounce)(_this.triggerSearch, props.delay);
    return _this;
  }

  SearchInput.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value
      });
    }
  };

  SearchInput.prototype.render = function render() {
    var _classNames;

    var _props = this.props,
        className = _props.className,
        placeholder = _props.placeholder,
        searchBtnText = _props.searchBtnText,
        size = _props.size,
        trigger = _props.trigger,
        rest = (0, _objectWithoutProperties3.default)(_props, ['className', 'placeholder', 'searchBtnText', 'size', 'trigger']);
    var value = this.state.value;

    var hasFeedback = !!value;
    var classes = (0, _classnames2.default)((_classNames = {
      'search-box': true
    }, _classNames['search-box--' + size] = size, _classNames), className);
    var inputGroupClasses = (0, _classnames2.default)({
      'search-box__input-addon-group': true,
      'search-box__input-addon-group--has-feedback': hasFeedback
    });

    return _react2.default.createElement(
      'div',
      { className: classes },
      _react2.default.createElement(
        'div',
        { className: inputGroupClasses },
        _react2.default.createElement('i', { className: 'icon-search' }),
        _react2.default.createElement('input', (0, _extends3.default)({}, (0, _utils.omit)(rest, ['onSearch', 'delay']), {
          className: 'input',
          type: 'search',
          value: value,
          placeholder: placeholder,
          onChange: this.handleChange,
          onKeyDown: this.handleKeyDown
        })),
        hasFeedback && _react2.default.createElement('span', {
          className: 'icon-close input-feedback active',
          onClick: this.handleCloseIconClick
        })
      ),
      trigger === BUTTON && _react2.default.createElement(
        _Button2.default,
        { noSubmit: true, type: 'primary', onClick: this.handleButtonClick },
        searchBtnText
      )
    );
  };

  return SearchInput;
}(_react.PureComponent);

SearchInput.displayName = 'AUISearchInput';
SearchInput.propTypes = propTypes;
SearchInput.defaultProps = defaultProps;
exports.default = SearchInput;
module.exports = exports['default'];