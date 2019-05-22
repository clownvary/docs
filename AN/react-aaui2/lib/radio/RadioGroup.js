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

var _Radio = require('./Radio');

var _Radio2 = _interopRequireDefault(_Radio);

var _utils = require('../shared/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RadioGroup = function (_PureComponent) {
  (0, _inherits3.default)(RadioGroup, _PureComponent);

  function RadioGroup(props) {
    (0, _classCallCheck3.default)(this, RadioGroup);

    var _this = (0, _possibleConstructorReturn3.default)(this, _PureComponent.call(this, props));

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

    var classes = (0, _classnames2.default)('radio-group', className);
    var children = this.props.children;

    if (data) {
      children = data.map(function (_ref, index) {
        var text = _ref.text,
            value = _ref.value,
            rest = (0, _objectWithoutProperties3.default)(_ref, ['text', 'value']);
        return _react2.default.createElement(
          _Radio2.default,
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

  return RadioGroup;
}(_react.PureComponent);

RadioGroup.displayName = 'AUIRadioGroup';
RadioGroup.propTypes = {
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
  value: _propTypes.any, // eslint-disable-line
  defaultValue: _propTypes.any // eslint-disable-line
};
RadioGroup.defaultProps = {
  onChange: _utils.identity
};
RadioGroup.childContextTypes = {
  auiRadioGroup: _propTypes.object
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

exports.default = RadioGroup;
module.exports = exports['default'];