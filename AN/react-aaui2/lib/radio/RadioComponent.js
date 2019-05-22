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

var Radio = function (_PureComponent) {
  (0, _inherits3.default)(Radio, _PureComponent);

  function Radio(props) {
    (0, _classCallCheck3.default)(this, Radio);

    var _this = (0, _possibleConstructorReturn3.default)(this, _PureComponent.call(this, props));

    _initialiseProps.call(_this);

    var checked = 'checked' in props ? props.checked : props.defaultChecked;

    _this.state = {
      checked: !!checked
    };
    return _this;
  }

  Radio.prototype.componentDidMount = function componentDidMount() {
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
        rest = (0, _objectWithoutProperties3.default)(_props, ['size', 'children', 'className', 'style', 'disabled', 'defaultChecked']);
    var checked = this.state.checked;

    var radioWrapperClasses = (0, _classnames2.default)({
      'radio-wrapper': true
    }, className);
    var radioClasses = (0, _classnames2.default)((_classNames = {
      radio: true,
      'radio--checked': checked,
      'radio--disabled': disabled
    }, _classNames['radio--' + size] = size, _classNames));

    /* eslint-disable jsx-a11y/label-has-for */
    return _react2.default.createElement(
      'label',
      { className: radioWrapperClasses, style: style },
      _react2.default.createElement(
        'span',
        { className: radioClasses },
        _react2.default.createElement('input', (0, _extends3.default)({
          ref: this.setWrappedComponentInstance,
          className: 'radio__input',
          disabled: disabled,
          type: 'radio',
          'aria-hidden': true
        }, rest, {
          checked: checked,
          onChange: this.handleChange
        })),
        _react2.default.createElement('span', {
          className: 'radio__inner',
          role: 'radio',
          'aria-disabled': disabled,
          'aria-checked': checked
        }),
        _react2.default.createElement(
          'span',
          null,
          children
        )
      )
    );
  };

  return Radio;
}(_react.PureComponent);

Radio.propTypes = {
  disabled: _propTypes.bool,
  checked: _propTypes.bool,
  defaultChecked: _propTypes.bool,
  className: _propTypes.string,
  style: _propTypes.object, // eslint-disable-line
  onChange: _propTypes.func,
  children: _propTypes.node,
  size: (0, _propTypes.oneOf)(['sm', '', 'lg']),
  value: _propTypes.any // eslint-disable-line
};
Radio.defaultProps = {
  size: '',
  defaultChecked: false,
  onChange: _utils.identity
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

exports.default = Radio;
module.exports = exports['default'];