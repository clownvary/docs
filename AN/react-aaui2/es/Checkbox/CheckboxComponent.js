import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _Object$defineProperties from 'babel-runtime/core-js/object/define-properties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PureComponent } from 'react';
import { bool, string, object, func, node, any } from 'prop-types';
import classNames from 'classnames';

import { identity } from '../shared/utils';

var Checkbox = function (_PureComponent) {
  _inherits(Checkbox, _PureComponent);

  function Checkbox(props) {
    _classCallCheck(this, Checkbox);

    var _this = _possibleConstructorReturn(this, _PureComponent.call(this, props));

    _initialiseProps.call(_this);

    var checked = 'checked' in props ? props.checked : props.defaultChecked;

    _this.state = {
      checked: !!checked
    };
    return _this;
  }

  Checkbox.prototype.componentDidMount = function componentDidMount() {
    _Object$defineProperties(this, {
      checked: {
        get: function get() {
          return this.input.checked;
        },
        set: function set(v) {
          this.input.checked = !!v;
          this.setState({
            checked: !!v
          });
        }
      }
    });
  };

  Checkbox.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({
        checked: !!nextProps.checked
      });
    }
  };

  Checkbox.prototype.render = function render() {
    var _classNames;

    var _props = this.props,
        toggle = _props.toggle,
        size = _props.size,
        children = _props.children,
        className = _props.className,
        style = _props.style,
        disabled = _props.disabled,
        rest = _objectWithoutProperties(_props, ['toggle', 'size', 'children', 'className', 'style', 'disabled']);

    var checked = this.state.checked;

    var checkboxWrapperClasses = classNames({
      'checkbox-wrapper': true,
      toggle: toggle,
      'toggle--empty': !children && toggle
    }, className);
    var checkboxClasses = classNames((_classNames = {
      checkbox: !toggle,
      'checkbox--checked': !toggle && checked,
      'checkbox--disabled': !toggle && disabled
    }, _classNames['checkbox--' + size] = size, _classNames));

    return React.createElement(
      'label',
      { className: checkboxWrapperClasses, style: style },
      React.createElement(
        'span',
        { className: checkboxClasses },
        React.createElement('input', _extends({
          ref: this.setWrappedComponentInstance,
          className: 'checkbox__input',
          disabled: disabled,
          type: 'checkbox',
          'aria-hidden': true
        }, rest, {
          checked: checked,
          onChange: this.handleChange
        })),
        toggle ? React.createElement('span', { className: 'toggle__text' }) : React.createElement('span', {
          className: 'checkbox__inner',
          role: 'checkbox',
          'aria-disabled': disabled,
          'aria-checked': checked
        }),
        children && React.createElement(
          'span',
          { className: 'checkbox__text' },
          children
        )
      )
    );
  };

  return Checkbox;
}(PureComponent);

Checkbox.displayName = 'AUICheckbox';
Checkbox.propTypes = {
  disabled: bool,
  checked: bool,
  defaultChecked: bool,
  toggle: bool,
  size: string,
  className: string,
  style: object, // eslint-disable-line
  onChange: func,
  children: node,
  value: any // eslint-disable-line
};
Checkbox.defaultProps = {
  onChange: identity,
  defaultChecked: false
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.setWrappedComponentInstance = function (input) {
    _this2.input = input;
  };

  this.triggerOnChange = function (e) {
    var onChange = _this2.props.onChange;

    var checked = e.target.checked;

    if (!('checked' in _this2.props)) {
      _this2.setState({
        checked: checked
      });
    }

    // If you want to access the event properties in an asynchronous way,
    // you should call `event.persist()`` on the event,
    // which will remove the synthetic event from the pool
    // and allow references to the event to be retained by user code.
    e.persist && e.persist();

    // The `value` prop is consumed by `CheckboxGroup`
    onChange(e, { value: _this2.props.value });
  };

  this.handleChange = function (e) {
    var disabled = _this2.props.disabled;


    if (disabled) {
      return;
    }

    _this2.triggerOnChange(e);
  };
};

export default Checkbox;