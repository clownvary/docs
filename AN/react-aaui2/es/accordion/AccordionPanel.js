import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PureComponent } from 'react';
import { func, bool, number, string, node } from 'prop-types';

import { noop } from '../shared/utils';
import KEY_CODES from '../shared/keyCodes';

var AccordionPanel = function (_PureComponent) {
  _inherits(AccordionPanel, _PureComponent);

  function AccordionPanel() {
    var _temp, _this, _ret;

    _classCallCheck(this, AccordionPanel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.setAccordionBodyContainer = function (container) {
      _this._container = container;
    }, _this.setWrappedComponentInstance = function (content) {
      _this._content = content;
    }, _this.setWrappedFocusInstance = function (focusNode) {
      _this._focusNode = focusNode;
    }, _this.startTransition = function () {
      if (_this._isTransitionEnd) {
        _this._isTransitionEnd = false;
        if (_this.props.active && _this._container) {
          _this._height = _this._container.offsetHeight;
          _this._container.style.height = _this._height + 'px';
        }
        return true;
      }
      return false;
    }, _this.endTransition = function () {
      _this._isTransitionEnd = true;
    }, _this.validateTransition = function (action) {
      if (_this.props.transition.trim()) {
        if (_this.startTransition()) {
          window.requestAnimationFrame(function () {
            action();
          });
        }
      } else {
        action();
      }
    }, _this.handleClick = function (index) {
      return function (e) {
        e.preventDefault();
        if (!_this.props.disabled) {
          _this.validateTransition(function () {
            _this.props.setStatus(index, !_this.props.active);
          });
        }
      };
    }, _this.handleKeyDown = function (e) {
      var _this$props = _this.props,
          index = _this$props.index,
          active = _this$props.active,
          disabled = _this$props.disabled;
      var ENTER = KEY_CODES.ENTER,
          SPACE = KEY_CODES.SPACE,
          UPARROW = KEY_CODES.UPARROW,
          DOWNARROW = KEY_CODES.DOWNARROW;

      var operationKeyCodes = [ENTER, SPACE, UPARROW, DOWNARROW];

      e.persist();
      if (operationKeyCodes.indexOf(e.keyCode) !== -1) {
        e.preventDefault();
      }
      var changeFocus = function changeFocus() {
        _this.props.onChangeFocus(index, !active, e.keyCode, _this._focusNode, disabled);
      };
      if (e.keyCode === ENTER || e.keyCode === SPACE) {
        _this.validateTransition(changeFocus);
      } else {
        changeFocus();
      }
    }, _this.handleTransitionEnd = function () {
      if (_this.props.active) {
        _this._container.style.height = 'auto';
      }
      _this.endTransition();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  AccordionPanel.prototype.componentDidMount = function componentDidMount() {
    if (this._content && this.props.transition) {
      this._height = this._content.offsetHeight;
    }
    this._isTransitionEnd = true;
    this.props.onInitChildren(this.props.index, this.props.disabled ? undefined : this._focusNode);
  };

  AccordionPanel.prototype.render = function render() {
    var _props = this.props,
        active = _props.active,
        children = _props.children,
        index = _props.index,
        complete = _props.complete,
        className = _props.className,
        title = _props.title,
        disabled = _props.disabled,
        openIcon = _props.openIcon,
        closeIcon = _props.closeIcon,
        completeIcon = _props.completeIcon;

    var transition = this.props.transition.trim();

    var iconClassName = void 0;
    if (complete) {
      iconClassName = completeIcon;
    } else {
      iconClassName = active ? closeIcon : openIcon;
    }

    var containerHeight = void 0;
    if (active) {
      containerHeight = transition ? this._height : 'auto';
    } else {
      containerHeight = 0;
    }

    return React.createElement(
      'div',
      {
        className: 'accordion ' + (active ? 'accordion--show' : '') + ' ' + (disabled ? 'accordion--disabled' : '') + ' ' + (complete ? 'accordion--complete' : '') + ' ' + (className || '')
      },
      React.createElement(
        'div',
        {
          ref: this.setWrappedFocusInstance,
          onKeyDown: this.handleKeyDown,
          tabIndex: disabled ? undefined : 0,
          className: 'accordion__header'
        },
        React.createElement(
          'div',
          { className: 'accordion__header-text' },
          title
        ),
        React.createElement(
          'div',
          { className: 'accordion__header-icon' },
          React.createElement(
            'a',
            { onClick: this.handleClick(index) },
            React.createElement('i', { className: iconClassName })
          )
        )
      ),
      React.createElement(
        'div',
        {
          className: 'accordion__body-container',
          style: {
            transition: '' + (transition || 'none'),
            overflow: 'hidden',
            height: containerHeight
          },
          ref: this.setAccordionBodyContainer,
          onTransitionEnd: this.handleTransitionEnd
        },
        React.createElement(
          'div',
          {
            className: 'accordion__body',
            ref: this.setWrappedComponentInstance
          },
          children
        )
      )
    );
  };

  return AccordionPanel;
}(PureComponent);

AccordionPanel.propTypes = {
  className: string,
  children: node,
  onInitChildren: func,
  setStatus: func,
  index: number,
  transition: string,
  active: bool,
  title: string,
  openIcon: node,
  closeIcon: node,
  completeIcon: node,
  disabled: bool,
  complete: bool,
  onChangeFocus: func
};
AccordionPanel.defaultProps = {
  openIcon: 'icon-plus',
  closeIcon: 'icon-minus',
  completeIcon: 'icon-check',
  onInitChildren: noop,
  setStatus: noop,
  onChangeFocus: noop
};
export default AccordionPanel;