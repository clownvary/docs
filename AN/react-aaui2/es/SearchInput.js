import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PureComponent } from 'react';
import { number, string, func, oneOf } from 'prop-types';
import classNames from 'classnames';

import Button from './Button';
import { noop, omit, debounce } from './shared/utils';
import keyCodes from './shared/keyCodes';

var TRIGGER_NAMES = ['button', 'input', 'enter'];
var BUTTON = TRIGGER_NAMES[0],
    INPUT = TRIGGER_NAMES[1],
    ENTER = TRIGGER_NAMES[2];

var propTypes = {
  delay: number,
  value: string,
  className: string,
  placeholder: string,
  searchBtnText: string,
  size: oneOf(['', 'lg']),
  trigger: oneOf(TRIGGER_NAMES),
  onChange: func,
  onSearch: func
};
var defaultProps = {
  delay: 500,
  value: '',
  placeholder: 'Enter your search here...',
  searchBtnText: 'Search',
  size: '',
  trigger: BUTTON,
  onChange: noop,
  onSearch: noop
};

var SearchInput = function (_PureComponent) {
  _inherits(SearchInput, _PureComponent);

  function SearchInput(props) {
    _classCallCheck(this, SearchInput);

    var _this = _possibleConstructorReturn(this, _PureComponent.call(this, props));

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

      if ((trigger === ENTER || trigger === BUTTON) && e.keyCode === keyCodes.ENTER) {
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

    _this.debouncedOnChange = debounce(_this.triggerSearch, props.delay);
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
        rest = _objectWithoutProperties(_props, ['className', 'placeholder', 'searchBtnText', 'size', 'trigger']);

    var value = this.state.value;

    var hasFeedback = !!value;
    var classes = classNames((_classNames = {
      'search-box': true
    }, _classNames['search-box--' + size] = size, _classNames), className);
    var inputGroupClasses = classNames({
      'search-box__input-addon-group': true,
      'search-box__input-addon-group--has-feedback': hasFeedback
    });

    return React.createElement(
      'div',
      { className: classes },
      React.createElement(
        'div',
        { className: inputGroupClasses },
        React.createElement('i', { className: 'icon-search' }),
        React.createElement('input', _extends({}, omit(rest, ['onSearch', 'delay']), {
          className: 'input',
          type: 'search',
          value: value,
          placeholder: placeholder,
          onChange: this.handleChange,
          onKeyDown: this.handleKeyDown
        })),
        hasFeedback && React.createElement('span', {
          className: 'icon-close input-feedback active',
          onClick: this.handleCloseIconClick
        })
      ),
      trigger === BUTTON && React.createElement(
        Button,
        { noSubmit: true, type: 'primary', onClick: this.handleButtonClick },
        searchBtnText
      )
    );
  };

  return SearchInput;
}(PureComponent);

SearchInput.displayName = 'AUISearchInput';
SearchInput.propTypes = propTypes;
SearchInput.defaultProps = defaultProps;
export default SearchInput;