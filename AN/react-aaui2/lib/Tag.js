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

var _utils = require('./shared/utils');

var _keyCodes = require('./shared/keyCodes');

var _keyCodes2 = _interopRequireDefault(_keyCodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tag = function (_PureComponent) {
  (0, _inherits3.default)(Tag, _PureComponent);

  function Tag(props) {
    (0, _classCallCheck3.default)(this, Tag);

    var _this = (0, _possibleConstructorReturn3.default)(this, _PureComponent.call(this, props));

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
        case _keyCodes2.default.ESCAPE:
          e.preventDefault();
          _this.setState({
            isInputCancel: true,
            isTabEnter: false
          }, function () {
            target.blur();
          });
          break;
        case _keyCodes2.default.TAB:
        case _keyCodes2.default.ENTER:
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
        rest = (0, _objectWithoutProperties3.default)(_props, ['className', 'editMode', 'onClose', 'value', 'isNew']);
    var isInput = this.state.isInput;

    var classes = (0, _classnames2.default)('tag-input', className);

    if (!editMode) {
      return _react2.default.createElement(
        'span',
        { className: 'badge' },
        value
      );
    }

    return _react2.default.createElement(
      'span',
      (0, _extends3.default)({ className: classes }, (0, _utils.omit)(rest, ['onChange', 'onCancel'])),
      isInput ? _react2.default.createElement('input', {
        className: 'input',
        ref: this.setInputRef,
        placeholder: isNew ? value : undefined,
        defaultValue: isNew ? undefined : value,
        onKeyDown: this.handleKeyDown,
        onBlur: this.handleBlur
      }) : _react2.default.createElement(
        'span',
        { className: 'badge badge--with-close-icon' },
        _react2.default.createElement(
          'span',
          { onClick: this.toInput },
          value
        ),
        _react2.default.createElement('i', { className: 'icon-close-thin', onClick: onClose })
      )
    );
  };

  return Tag;
}(_react.PureComponent);

Tag.displayName = 'AUITag';
Tag.propTypes = {
  isNew: _propTypes.bool,
  editMode: _propTypes.bool,
  className: _propTypes.string,
  value: _propTypes.string,
  onChange: _propTypes.func,
  onCancel: _propTypes.func,
  onClose: _propTypes.func
};
Tag.defaultProps = {
  editMode: false,
  onChange: _utils.noop,
  onCancel: _utils.noop,
  onClose: _utils.noop
};
exports.default = Tag;
module.exports = exports['default'];