import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PureComponent } from 'react';
import { string, bool, node } from 'prop-types';

import Panel from './AccordionPanel';
import KEY_CODES from '../shared/keyCodes';

var Accordion = function (_PureComponent) {
  _inherits(Accordion, _PureComponent);

  function Accordion() {
    var _temp, _this, _ret;

    _classCallCheck(this, Accordion);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.state = {
      status: {},
      focusableChildren: []
    }, _this.setStatus = function (key, active) {
      var status = _extends({}, _this.state.status);

      if (_this.props.multiSelectable) {
        status[key] = active;
      } else {
        React.Children.forEach(_this.props.children, function (child, k) {
          status[k] = false;
        });
        status[key] = active;
      }
      _this.setState({
        status: status
      });
    }, _this.handleInitChildren = function (index, children) {
      if (children) {
        _this.setState({
          focusableChildren: [].concat(_this.state.focusableChildren, [children])
        });
      } else {
        _this.setState({
          focusableChildren: [].concat(_this.state.focusableChildren)
        });
      }
    }, _this.handleChildChangeFocus = function (index, active, keyCode, children, disabled) {
      var focusableChildren = _this.state.focusableChildren;
      var currentIndex = focusableChildren.indexOf(children);
      var maxIndex = focusableChildren.length - 1;

      switch (keyCode) {
        case KEY_CODES.ENTER:
        case KEY_CODES.SPACE:
          if (!disabled) {
            _this.setStatus(index, active);
          }
          break;
        case KEY_CODES.DOWNARROW:
          children.blur();
          focusableChildren[currentIndex + 1 >= maxIndex ? maxIndex : currentIndex + 1].focus();
          break;
        case KEY_CODES.UPARROW:
          children.blur();
          focusableChildren[currentIndex - 1 <= 0 ? 0 : currentIndex - 1].focus();
          break;
        default:
          break;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Accordion.prototype.render = function render() {
    var _this2 = this;

    var status = this.state.status;

    var items = [];

    React.Children.map(this.props.children, function (child, key) {
      var item = React.cloneElement(child, {
        key: key,
        index: key,
        active: status[key] !== undefined ? status[key] : child.props.active,
        transition: _this2.props.transition,
        onInitChildren: _this2.handleInitChildren,
        setStatus: _this2.setStatus,
        onChangeFocus: _this2.handleChildChangeFocus
      });

      items.push(item);
    });
    return React.createElement(
      'div',
      { className: 'accordion-group ' + (this.props.className || '') },
      items
    );
  };

  return Accordion;
}(PureComponent);

Accordion.propTypes = {
  className: string,
  children: node,
  multiSelectable: bool,
  transition: string
};
Accordion.defaultProps = {
  multiSelectable: false,
  transition: 'height 0.2s ease'
};
export default Accordion;


Accordion.Panel = Panel;