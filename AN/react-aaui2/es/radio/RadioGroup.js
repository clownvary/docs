import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PureComponent } from 'react';
import { bool, string, func, object, node, arrayOf, shape, any } from 'prop-types';
import classNames from 'classnames';

import Radio from './Radio';
import { identity } from '../shared/utils';

var RadioGroup = function (_PureComponent) {
  _inherits(RadioGroup, _PureComponent);

  function RadioGroup(props) {
    _classCallCheck(this, RadioGroup);

    var _this = _possibleConstructorReturn(this, _PureComponent.call(this, props));

    _initialiseProps.call(_this);

    var value = void 0;
    if ('value' in props) {
      value = props.value;
    } else if ('defaultValue' in props) {
      value = props.defaultValue;
    }

    _this.state = {
      value: value
    };
    return _this;
  }

  RadioGroup.prototype.getChildContext = function getChildContext() {
    return {
      auiRadioGroup: {
        onChange: this.onChange,
        value: this.state.value,
        disabled: this.props.disabled,
        size: this.props.size,
        name: this.props.name
      }
    };
  };

  RadioGroup.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value
      });
    }
  };

  RadioGroup.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        data = _props.data;

    var classes = classNames('radio-group', className);
    var children = this.props.children;

    if (data) {
      children = data.map(function (_ref, index) {
        var text = _ref.text,
            value = _ref.value,
            rest = _objectWithoutProperties(_ref, ['text', 'value']);

        return React.createElement(
          Radio,
          _extends({ key: index, value: value }, rest),
          text
        );
      });
    }

    return React.createElement(
      'div',
      { className: classes },
      children
    );
  };

  return RadioGroup;
}(PureComponent);

RadioGroup.displayName = 'AUIRadioGroup';
RadioGroup.propTypes = {
  disabled: bool,
  size: string,
  name: string,
  className: string,
  onChange: func,
  data: arrayOf(shape({
    text: string.isRequired,
    value: any.isRequired // eslint-disable-line
  })),
  children: node,
  value: any, // eslint-disable-line
  defaultValue: any // eslint-disable-line
};
RadioGroup.defaultProps = {
  onChange: identity
};
RadioGroup.childContextTypes = {
  auiRadioGroup: object
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.onChange = function (e) {
    var value = e.target.value;
    var onChange = _this2.props.onChange;


    if (!('value' in _this2.props)) {
      _this2.setState({
        value: value
      });
    }

    onChange(e);
  };
};

export default RadioGroup;