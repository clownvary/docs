import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PureComponent } from 'react';
import { bool, string, func, object, node, array, arrayOf, shape, any } from 'prop-types';
import classNames from 'classnames';

import Checkbox from './Checkbox';
import { identity } from '../shared/utils';

var CheckboxGroup = function (_PureComponent) {
  _inherits(CheckboxGroup, _PureComponent);

  function CheckboxGroup(props) {
    _classCallCheck(this, CheckboxGroup);

    var _this = _possibleConstructorReturn(this, _PureComponent.call(this, props));

    _initialiseProps.call(_this);

    var value = [];
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

  CheckboxGroup.prototype.getChildContext = function getChildContext() {
    return {
      auiCheckboxGroup: {
        onChange: this.onChange,
        value: this.state.value,
        disabled: this.props.disabled,
        size: this.props.size,
        name: this.props.name
      }
    };
  };

  CheckboxGroup.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value
      });
    }
  };

  CheckboxGroup.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        data = _props.data;

    var classes = classNames('checkbox-group', className);
    var children = this.props.children;

    if (data) {
      children = data.map(function (_ref, index) {
        var text = _ref.text,
            value = _ref.value,
            rest = _objectWithoutProperties(_ref, ['text', 'value']);

        return React.createElement(
          Checkbox,
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

  return CheckboxGroup;
}(PureComponent);

CheckboxGroup.displayName = 'AUICheckboxGroup';
CheckboxGroup.propTypes = {
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
  value: array, // eslint-disable-line
  defaultValue: array // eslint-disable-line
};
CheckboxGroup.defaultProps = {
  onChange: identity
};
CheckboxGroup.childContextTypes = {
  auiCheckboxGroup: object
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.onChange = function (e, _ref2) {
    var optionValue = _ref2.value;

    // Should construct one new array for re-rendering
    var value = [].concat(_this2.state.value);
    var onChange = _this2.props.onChange;

    var index = value.indexOf(optionValue);

    if (index === -1) {
      // If NOT found, then add it
      value.push(optionValue);
    } else {
      // If found, then delete it
      value.splice(index, 1);
    }

    if (!('value' in _this2.props)) {
      _this2.setState({
        value: value
      });
    }

    onChange(value);
  };
};

export default CheckboxGroup;