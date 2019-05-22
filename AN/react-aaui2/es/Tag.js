import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PureComponent } from 'react';
import { string, func, bool } from 'prop-types';
import classNames from 'classnames';

import { omit, noop } from './shared/utils';
import KEY_CODES from './shared/keyCodes';

var Tag = function (_PureComponent) {
  _inherits(Tag, _PureComponent);

  function Tag(props) {
    _classCallCheck(this, Tag);

    var _this = _possibleConstructorReturn(this, _PureComponent.call(this, props));

    _this.setInputRef = function (input) {
      _this.input = input;
    };

    _this.toInput = function (e) {
      e && e.stopPropagation && e.stopPropagation();

      _this.setState({
        isInput: true,
        isInputCancel: false
      }, function () {
        var input = _this.input;

        if (input) {
          input.focus();
          input.select();
        }
      });
    };

    _this.handleKeyDown = function (e) {
      var target = e.target;

      switch (e.keyCode) {
        case KEY_CODES.ESCAPE:
          e.preventDefault();
          _this.setState({
            isInputCancel: true,
            isTabEnter: false
          }, function () {
            target.blur();
          });
          break;
        case KEY_CODES.TAB:
        case KEY_CODES.ENTER:
          e.preventDefault();

          _this.setState({
            isTabEnter: true
          }, function () {
            target && target.blur();
          });
          break;
        default:
          break;
      }
    };

    _this.handleBlur = function (e) {
      var value = e.target.value;

      _this.setState({
        isInput: false
      }, function () {
        if (!_this.state.isInputCancel) {
          _this.props.onChange(value, _this.state.isTabEnter);
        } else {
          _this.props.onCancel();
        }
      });
    };

    _this.state = {
      isInput: false,
      isTabEnter: false
    };
    return _this;
  }

  Tag.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        editMode = _props.editMode,
        onClose = _props.onClose,
        value = _props.value,
        isNew = _props.isNew,
        rest = _objectWithoutProperties(_props, ['className', 'editMode', 'onClose', 'value', 'isNew']);

    var isInput = this.state.isInput;

    var classes = classNames('tag-input', className);

    if (!editMode) {
      return React.createElement(
        'span',
        { className: 'badge' },
        value
      );
    }

    return React.createElement(
      'span',
      _extends({ className: classes }, omit(rest, ['onChange', 'onCancel'])),
      isInput ? React.createElement('input', {
        className: 'input',
        ref: this.setInputRef,
        placeholder: isNew ? value : undefined,
        defaultValue: isNew ? undefined : value,
        onKeyDown: this.handleKeyDown,
        onBlur: this.handleBlur
      }) : React.createElement(
        'span',
        { className: 'badge badge--with-close-icon' },
        React.createElement(
          'span',
          { onClick: this.toInput },
          value
        ),
        React.createElement('i', { className: 'icon-close-thin', onClick: onClose })
      )
    );
  };

  return Tag;
}(PureComponent);

Tag.displayName = 'AUITag';
Tag.propTypes = {
  isNew: bool,
  editMode: bool,
  className: string,
  value: string,
  onChange: func,
  onCancel: func,
  onClose: func
};
Tag.defaultProps = {
  editMode: false,
  onChange: noop,
  onCancel: noop,
  onClose: noop
};
export default Tag;