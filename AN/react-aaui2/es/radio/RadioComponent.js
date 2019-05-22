import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _Object$defineProperties from 'babel-runtime/core-js/object/define-properties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PureComponent } from 'react';
import { bool, string, object, func, node, oneOf, any } from 'prop-types';
import classNames from 'classnames';

import { identity } from '../shared/utils';

var Radio = function (_PureComponent) {
  _inherits(Radio, _PureComponent);

  function Radio(props) {
    _classCallCheck(this, Radio);

    var _this = _possibleConstructorReturn(this, _PureComponent.call(this, props));

    _initialiseProps.call(_this);

    var checked = 'checked' in props ? props.checked : props.defaultChecked;

    _this.state = {
      checked: !!checked
    };
    return _this;
  }

  Radio.prototype.componentDidMount = function componentDidMount() {
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

  Radio.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({
        checked: !!nextProps.checked
      });
    }
  };

  Radio.prototype.render = function render() {
    var _classNames;

    /* eslint-disable no-unused-vars */
    var _props = this.props,
        size = _props.size,
        children = _props.children,
        className = _props.className,
        style = _props.style,
        disabled = _props.disabled,
        defaultChecked = _props.defaultChecked,
        rest = _objectWithoutProperties(_props, ['size', 'children', 'className', 'style', 'disabled', 'defaultChecked']);

    var checked = this.state.checked;

    var radioWrapperClasses = classNames({
      'radio-wrapper': true
    }, className);
    var radioClasses = classNames((_classNames = {
      radio: true,
      'radio--checked': checked,
      'radio--disabled': disabled
    }, _classNames['radio--' + size] = size, _classNames));

    /* eslint-disable jsx-a11y/label-has-for */
    return React.createElement(
      'label',
      { className: radioWrapperClasses, style: style },
      React.createElement(
        'span',
        { className: radioClasses },
        React.createElement('input', _extends({
          ref: this.setWrappedComponentInstance,
          className: 'radio__input',
          disabled: disabled,
          type: 'radio',
          'aria-hidden': true
        }, rest, {
          checked: checked,
          onChange: this.handleChange
        })),
        React.createElement('span', {
          className: 'radio__inner',
          role: 'radio',
          'aria-disabled': disabled,
          'aria-checked': checked
        }),
        React.createElement(
          'span',
          null,
          children
        )
      )
    );
  };

  return Radio;
}(PureComponent);

Radio.propTypes = {
  disabled: bool,
  checked: bool,
  defaultChecked: bool,
  className: string,
  style: object, // eslint-disable-line
  onChange: func,
  children: node,
  size: oneOf(['sm', '', 'lg']),
  value: any // eslint-disable-line
};
Radio.defaultProps = {
  size: '',
  defaultChecked: false,
  onChange: identity
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

    onChange(e);
  };

  this.handleChange = function (e) {
    var disabled = _this2.props.disabled;


    if (disabled) {
      return;
    }

    _this2.triggerOnChange(e);
  };
};

export default Radio;