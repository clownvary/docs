'use strict';

exports.__esModule = true;

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

var _utils = require('../shared/utils');

var _types = require('../shared/types');

var _keyCodes = require('../shared/keyCodes');

var _keyCodes2 = _interopRequireDefault(_keyCodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  className: _propTypes.string,
  style: _propTypes.object,
  selected: _propTypes.string,
  defaultSelected: _propTypes.string,
  onChange: _propTypes.func,
  children: _propTypes.node
};

var Tabs = function (_PureComponent) {
  (0, _inherits3.default)(Tabs, _PureComponent);

  function Tabs(props) {
    (0, _classCallCheck3.default)(this, Tabs);

    var _this = (0, _possibleConstructorReturn3.default)(this, _PureComponent.call(this, props));

    _this.getSelected = function () {
      return _this.state.selected;
    };

    _this.childrenForEach = function (callback) {
      return _react2.default.Children.forEach(_this.props.children, callback);
    };

    _this.select = function (name) {
      if (_this.props.selected === undefined) {
        _this.setState({
          selected: name
        }, function () {
          _this.props.onChange(name);
        });
      } else {
        _this.props.onChange(name);
      }
    };

    _this.handleKeyDown = function (e) {
      e.persist();

      var childrenName = [];
      _this.childrenForEach(function (child) {
        if (child.type === Tabs.Container) {
          childrenName.push(child.props.name);
        }
      });

      var len = childrenName.length;
      var currentIndex = childrenName.indexOf(_this.getSelected());
      switch (e.keyCode) {
        case _keyCodes2.default.LEFTARROW:
          _this.select(childrenName[currentIndex === 0 ? len - 1 : currentIndex - 1]);
          break;
        case _keyCodes2.default.RIGHTARROW:
          _this.select(childrenName[currentIndex === len - 1 ? 0 : currentIndex + 1]);
          break;
        default:
          break;
      }
    };

    _this.state = {
      selected: 'selected' in props ? props.selected : props.defaultSelected
    };
    return _this;
  }

  Tabs.prototype.getChildContext = function getChildContext() {
    return {
      auiTabsAPI: {
        select: this.select,
        getSelected: this.getSelected
      }
    };
  };

  Tabs.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    (0, _defineProperties2.default)(this, {
      selected: {
        get: function get() {
          return this.state.selected;
        },
        set: function set(v) {
          this.props.selected === undefined && this.setState({ selected: v });
        }
      }
    });

    if (this.state.selected == null) {
      this.childrenForEach(function (child) {
        if (child.type === Tabs.Container) {
          _this2.setState({
            selected: child.props.name
          });
        }
      });
    }
  };

  Tabs.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var defaultSelected = nextProps.defaultSelected !== this.props.defaultSelected ? nextProps.defaultSelected : this.state.selected;
    var newState = {
      selected: nextProps.selected !== this.props.selected ? nextProps.selected : defaultSelected
    };

    newState.selected !== this.state.selected && this.setState(newState);
  };

  Tabs.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        style = _props.style,
        children = _props.children;


    return _react2.default.createElement(
      'div',
      {
        className: className || '',
        style: style,
        onKeyDown: this.handleKeyDown
      },
      children
    );
  };

  return Tabs;
}(_react.PureComponent);

Tabs.displayName = 'AUITabs';
Tabs.propTypes = propTypes;
Tabs.defaultProps = {
  onChange: _utils.identity
};
Tabs.childContextTypes = {
  auiTabsAPI: _types.tabsAPIShape
};
exports.default = Tabs;
module.exports = exports['default'];