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

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var string = _propTypes2.default.string,
    func = _propTypes2.default.func;

var propTypes = {
  className: string,
  value: string,
  onChange: func
};
var defaultProps = {
  className: 'input'
};

var TextArea = function (_PureComponent) {
  (0, _inherits3.default)(TextArea, _PureComponent);

  function TextArea(props) {
    (0, _classCallCheck3.default)(this, TextArea);

    var _this = (0, _possibleConstructorReturn3.default)(this, _PureComponent.call(this, props));

    _this.handleChange = function (e) {
      e.persist();

      _this.setState({
        value: e.target.value
      }, function () {
        if (_this.props.onChange) {
          _this.props.onChange(e);
        }
      });
    };

    _this.state = {
      value: props.value
    };
    return _this;
  }

  TextArea.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value
      });
    }
  };

  TextArea.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        rest = (0, _objectWithoutProperties3.default)(_props, ['className']);


    return _react2.default.createElement('textarea', (0, _extends3.default)({}, rest, {
      className: className,
      value: this.state.value,
      onChange: this.handleChange
    }));
  };

  return TextArea;
}(_react.PureComponent);

exports.default = TextArea;


TextArea.displayName = 'AAUITextArea';
TextArea.propTypes = propTypes;
TextArea.defaultProps = defaultProps;
module.exports = exports['default'];