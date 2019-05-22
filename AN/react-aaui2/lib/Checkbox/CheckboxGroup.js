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

var _Checkbox = require('./Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _utils = require('../shared/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CheckboxGroup = function (_PureComponent) {
  (0, _inherits3.default)(CheckboxGroup, _PureComponent);

  function CheckboxGroup(props) {
    (0, _classCallCheck3.default)(this, CheckboxGroup);

    var _this = (0, _possibleConstructorReturn3.default)(this, _PureComponent.call(this, props));

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

    var classes = (0, _classnames2.default)('checkbox-group', className);
    var children = this.props.children;

    if (data) {
      children = data.map(function (_ref, index) {
        var text = _ref.text,
            value = _ref.value,
            rest = (0, _objectWithoutProperties3.default)(_ref, ['text', 'value']);
        return _react2.default.createElement(
          _Checkbox2.default,
          (0, _extends3.default)({ key: index, value: value }, rest),
          text
        );
      });
    }

    return _react2.default.createElement(
      'div',
      { className: classes },
      children
    );
  };

  return CheckboxGroup;
}(_react.PureComponent);

CheckboxGroup.displayName = 'AUICheckboxGroup';
CheckboxGroup.propTypes = {
  disabled: _propTypes.bool,
  size: _propTypes.string,
  name: _propTypes.string,
  className: _propTypes.string,
  onChange: _propTypes.func,
  data: (0, _propTypes.arrayOf)((0, _propTypes.shape)({
    text: _propTypes.string.isRequired,
    value: _propTypes.any.isRequired // eslint-disable-line
  })),
  children: _propTypes.node,
  value: _propTypes.array, // eslint-disable-line
  defaultValue: _propTypes.array // eslint-disable-line
};
CheckboxGroup.defaultProps = {
  onChange: _utils.identity
};
CheckboxGroup.childContextTypes = {
  auiCheckboxGroup: _propTypes.object
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

exports.default = CheckboxGroup;
module.exports = exports['default'];