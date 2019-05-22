import _Object$defineProperties from 'babel-runtime/core-js/object/define-properties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PureComponent } from 'react';
import { string, object, func, node } from 'prop-types';

import { identity } from '../shared/utils';

import { tabsAPIShape } from '../shared/types';
import KEY_CODES from '../shared/keyCodes';

var propTypes = {
  className: string,
  style: object,
  selected: string,
  defaultSelected: string,
  onChange: func,
  children: node
};

var Tabs = function (_PureComponent) {
  _inherits(Tabs, _PureComponent);

  function Tabs(props) {
    _classCallCheck(this, Tabs);

    var _this = _possibleConstructorReturn(this, _PureComponent.call(this, props));

    _this.getSelected = function () {
      return _this.state.selected;
    };

    _this.childrenForEach = function (callback) {
      return React.Children.forEach(_this.props.children, callback);
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
        case KEY_CODES.LEFTARROW:
          _this.select(childrenName[currentIndex === 0 ? len - 1 : currentIndex - 1]);
          break;
        case KEY_CODES.RIGHTARROW:
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

    _Object$defineProperties(this, {
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


    return React.createElement(
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
}(PureComponent);

Tabs.displayName = 'AUITabs';
Tabs.propTypes = propTypes;
Tabs.defaultProps = {
  onChange: identity
};
Tabs.childContextTypes = {
  auiTabsAPI: tabsAPIShape
};
export default Tabs;