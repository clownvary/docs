'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _defineProperties = require('babel-runtime/core-js/object/define-properties');

var _defineProperties2 = _interopRequireDefault(_defineProperties);

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

var _utils = require('../shared/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Checkbox = function (_PureComponent) {
  (0, _inherits3.default)(Checkbox, _PureComponent);

  function Checkbox(props) {
    (0, _classCallCheck3.default)(this, Checkbox);

    var _this = (0, _possibleConstructorReturn3.default)(this, _PureComponent.call(this, props));

    _initialiseProps.call(_this);

    var checked = 'checked' in props ? props.checked : props.defaultChecked;

    _this.state = {
      checked: !!checked
    };
    return _this;
  }

  Checkbox.prototype.componentDidMount = function componentDidMount() {
    (0, _defineProperties2.default)(this, {
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
        rest = (0, _objectWithoutProperties3.default)(_props, ['toggle', 'size', 'children', 'className', 'style', 'disabled']);
    var checked = this.state.checked;

    var checkboxWrapperClasses = (0, _classnames2.default)({
      'checkbox-wrapper': true,
      toggle: toggle,
      'toggle--empty': !children && toggle
    }, className);
    var checkboxClasses = (0, _classnames2.default)((_classNames = {
      checkbox: !toggle,
      'checkbox--checked': !toggle && checked,
      'checkbox--disabled': !toggle && disabled
    }, _classNames['checkbox--' + size] = size, _classNames));

    return _react2.default.createElement(
      'label',
      { className: checkboxWrapperClasses, style: style },
      _react2.default.createElement(
        'span',
        { className: checkboxClasses },
        _react2.default.createElement('input', (0, _extends3.default)({
          ref: this.setWrappedComponentInstance,
          className: 'checkbox__input',
          disabled: disabled,
          type: 'checkbox',
          'aria-hidden': true
        }, rest, {
          checked: checked,
          onChange: this.handleChange
        })),
        toggle ? _react2.default.createElement('span', { className: 'toggle__text' }) : _react2.default.createElement('span', {
          className: 'checkbox__inner',
          role: 'checkbox',
          'aria-disabled': disabled,
          'aria-checked': checked
        }),
        children && _react2.default.createElement(
          'span',
          { className: 'checkbox__text' },
          children
        )
      )
    );
  };

  return Checkbox;
}(_react.PureComponent);

Checkbox.displayName = 'AUICheckbox';
Checkbox.propTypes = {
  disabled: _propTypes.bool,
  checked: _propTypes.bool,
  defaultChecked: _propTypes.bool,
  toggle: _propTypes.bool,
  size: _propTypes.string,
  className: _propTypes.string,
  style: _propTypes.object, // eslint-disable-line
  onChange: _propTypes.func,
  children: _propTypes.node,
  value: _propTypes.any // eslint-disable-line
};
Checkbox.defaultProps = {
  onChange: _utils.identity,
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

exports.default = Checkbox;
module.exports = exports['default'];