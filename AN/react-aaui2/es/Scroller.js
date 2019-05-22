import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import { PureComponent } from 'react';
import { func, number } from 'prop-types';

var Scroller = function (_PureComponent) {
  _inherits(Scroller, _PureComponent);

  function Scroller() {
    _classCallCheck(this, Scroller);

    var _this = _possibleConstructorReturn(this, _PureComponent.call(this));

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
}(PureComponent);

Scroller.propTypes = {
  children: func,
  threshold: number
};
Scroller.defaultProps = {
  threshold: 50
};
export default Scroller;