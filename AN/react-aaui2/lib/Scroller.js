'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _propTypes = require('prop-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Scroller = function (_PureComponent) {
  (0, _inherits3.default)(Scroller, _PureComponent);

  function Scroller() {
    (0, _classCallCheck3.default)(this, Scroller);

    var _this = (0, _possibleConstructorReturn3.default)(this, _PureComponent.call(this));

    _this.state = {
      scrolled: false
    };

    _this.onScroll = function () {
      var threshold = _this.props.threshold;

      var scrollHeight = Math.max(document.documentElement.scrollTop, window.pageYOffset, document.body.scrollTop);

      _this.setState(function () {
        return {
          scrolled: scrollHeight > threshold
        };
      });
    };

    _this.boundOnScroll = _this.onScroll.bind(_this);
    return _this;
  }

  Scroller.prototype.componentDidMount = function componentDidMount() {
    window.addEventListener('scroll', this.boundOnScroll);
  };

  Scroller.prototype.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('scroll', this.boundOnScroll);
  };

  Scroller.prototype.render = function render() {
    var scrolled = this.state.scrolled;
    var children = this.props.children;


    return children(scrolled);
  };

  return Scroller;
}(_react.PureComponent);

Scroller.propTypes = {
  children: _propTypes.func,
  threshold: _propTypes.number
};
Scroller.defaultProps = {
  threshold: 50
};
exports.default = Scroller;
module.exports = exports['default'];