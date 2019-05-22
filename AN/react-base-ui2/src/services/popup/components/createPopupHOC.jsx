import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import isFunction from 'lodash/isFunction';
import mapValues from 'lodash/mapValues';
import throttle from 'lodash/throttle';
import { KeyCode, Effect } from '../../../consts';
import Responsive from '../../responsive';
import { Globalize } from '../../i18n';
import { cls, browser } from '../../../utils';
import mirror from './mirror';
import PositionCalculator from './PositionCalculator';
import * as Edge from './consts/Edge';


/**
 * High order component that wraps the popup UI component.
 * When calling the IPopupService.popup method, we got this HOC.
 *
 * This HOC is also available in the parameter of connector functions,
 * so that user can implement custom behavior that connect the popup content with the app's logic.
 *
 * We consider every popup behaviors can only be any of the two:
 * 1) Indicator, for example, tooltip
 * 2) Value input assistant, for example, calendar or dropdownlist
 *
 * This HOC mainly provides two methods, cancel and change.
 *
 * @interface
 */
class IPopupHOC {

  /**
   * Cancel the pop up behaviors.
   * onBeforeCancel and onAfterCancel will be called.
   */
  /* istanbul ignore next */ cancel() {
  }

  /**
   * Popup UI would like to change some value.
   * onBeforeChange and onAfterChange will be called.
   */
  /* istanbul ignore next */ change(value) {
    return value;
  }

  /**
   * Gets the wrapped component.
   */
  /* istanbul ignore next */ getWrappedComponent() {

  }
}

IPopupHOC.dummy = 'Document only';


const createPopupHOC = WrappedComponent => class extends Component {

  static propTypes = {
    popupOptions: PropTypes.shape({})
  }

  static childContextTypes = {
    intl: intlShape
  }

  constructor(props) {
    super(props);

    const { popupOptions: {
      dockStyle,
      effect = Effect.NONE
    } } = props;

    this.state = {
      show: true,
      popupPosition: {},
      dockStyle,
      animation: effect === Effect.NONE ? '' : `an-${effect}-enter`
    };

    this.onKeyDown = this.onKeyDown.bind(this);
    this.onViewChange = this.onViewChange.bind(this);
    this.onScrollHandler = throttle(() => this.updatePosition(true), 40);
  }

  getChildContext() {
    return {
      intl: Globalize.intl
    };
  }

  isAlive() {
    return this.state.show;
  }

  getItemAt(dockStyle) {
    const at = dockStyle.split(' ');
    at[0] = mirror(at[0]);
    return at.join(' ');
  }

  getMainOffset(dockStyle, distance) {
    distance = Math.max(0, distance);
    let x = 0;
    let y = 0;

    if (distance) {
      const at = dockStyle.split(' ');
      switch (at[0]) {
        case Edge.TOP:
          y = -distance;
          break;
        case Edge.LEFT:
          x = -distance;
          break;
        case Edge.RIGHT:
          x = distance;
          break;
        case Edge.BOTTOM:
          y = distance;
          break;
        default:
      }
    }
    return { x, y, mirror: true };
  }

  tryFocus() {
    const { popupOptions: {
      focus
    } } = this.props;

    if (focus) {
      this.lastFocus = document.activeElement;
      const wc = findDOMNode(this.wrappedComponent);
      /* istanbul ignore else */
      if (wc) {
        window.setTimeout(() => wc.focus(), 0);
      }
    }
  }

  onViewChange() {
    this.cancel();
  }

  onOpen() {
    const { popupOptions: {
      onAfterOpen,
      closeWhenViewChange
    } } = this.props;

    if (onAfterOpen && isFunction(onAfterOpen)) {
      onAfterOpen();
    }

    window.document.addEventListener('keydown', this.onKeyDown);
    if (closeWhenViewChange) {
      Responsive.addEventListener('orientationchange', this.onViewChange, this);
      if (browser.mobile) {
        window.document.addEventListener('scroll', this.onScrollHandler);
      }
    }

    this.updatePosition(false);
    this.tryFocus();
  }

  onClose() {
    const { popupOptions:
      {
        onAfterClose,
        focus,
        closeWhenViewChange
      } } = this.props;

    window.document.removeEventListener('keydown', this.onKeyDown);
    if (closeWhenViewChange) {
      Responsive.removeEventListener('orientationchange', this.onViewChange, this);
      if (browser.mobile) {
        window.document.removeEventListener('scroll', this.onScrollHandler);
      }
    }

    if (onAfterClose && isFunction(onAfterClose)) {
      onAfterClose();
    }

    if (focus && this.lastFocus && this.lastFocus !== document.activeElement) {
      typeof this.lastFocus.focus === 'function' && this.lastFocus.focus();
    }

    this.lastFocus = null;
  }

  onKeyDown(e) {
    const { popupOptions: { closeByEscape } } = this.props;
    if (e.keyCode === KeyCode.ESCAPE && closeByEscape) {
      this.cancel();
    }
  }

  updatePosition(isScrolling = false) {
    if (!this.popupItem) return;

    const { popupOptions: {
      target = window,
      position,
      noCollision,
      stick,
      distance
    } } = this.props;

    let { popupOptions: {
      dockStyle
    } } = this.props;

    const mainOffset = this.getMainOffset(dockStyle, distance);

    const positionCalculator = new PositionCalculator({
      main: this.popupItem,
      mainAt: this.getItemAt(dockStyle),
      target,
      targetAt: dockStyle,
      position,
      flip: noCollision,
      stick: isScrolling ? 'none' : stick,
      mainOffset
    });

    const result = positionCalculator.calc();
    if (result.fliped) {
      dockStyle = result.targetAt;
    }

    const popupPosition = {
      left: result.pos.left || 0,
      top: result.pos.top || 0
    };

    this.setState({
      popupPosition,
      dockStyle
    });
  }

  cancel(force = false) {
    const { popupOptions: {
      onBeforeCancel,
      onAfterCancel,
      effect = Effect.NONE
    } } = this.props;
    const { popupEvents: { onPopupCancel } } = this.props;

    if (force) {
      if (onPopupCancel && isFunction(onPopupCancel)) {
        onPopupCancel();
        return;
      }
    }

    if (onBeforeCancel && isFunction(onBeforeCancel)) {
      if (!onBeforeCancel()) {
        return;
      }
    }

    this.setState({
      show: false,
      animation: effect === Effect.NONE ? '' : `an-${effect}-exit`
    },
      () => {
        if (onAfterCancel && isFunction(onAfterCancel)) {
          onAfterCancel();
        }
        if (onPopupCancel && isFunction(onPopupCancel)) {
          setTimeout(() => { onPopupCancel(); }, effect === Effect.NONE ? 0 : 200);
        }
      });
  }

  change(value) {
    const { popupOptions: {
      onBeforeChange,
      onAfterChange,
      effect = Effect.NONE
    } } = this.props;
    const { popupEvents: { onPopupChange } } = this.props;

    if (onBeforeChange && isFunction(onBeforeChange)) {
      if (!onBeforeChange(value)) {
        return;
      }
    }

    this.setState({
      show: false,
      animation: effect === Effect.NONE ? '' : `an-${effect}-exit`
    },
      () => {
        if (onAfterChange && isFunction(onAfterChange)) {
          onAfterChange(value);
        }
        if (onPopupChange && isFunction(onPopupChange)) {
          setTimeout(() => { onPopupChange(value); }, effect === Effect.NONE ? 0 : 200);
        }
      });
  }

  onDeskClick() {
    const { popupOptions: { closeByClick } } = this.props;
    if (closeByClick) {
      this.cancel();
    }
  }

  onResize() {
    this.updatePosition(false);
  }

  getWrappedComponent() {
    return this.wrappedComponent;
  }

  getTarget() {
    const { popupOptions: { target } } = this.props;
    return target;
  }

  render() {
    const {
      connectors = {},
      popupOptions = {},
      initProps,
      ...rest
    } = this.props;

    const {
      showMask,
      showShadow,
      className,
      closeByClick
    } = popupOptions;

    const {
      popupPosition = { left: '-2000px', top: '-2000px' },
      dockStyle,
      animation
    } = this.state;

    const bindedConnectors = mapValues(connectors, cnn => (...args) => {
      const func = cnn(this);
      func(...args);

      if (isFunction(initProps[cnn.name])) {
        initProps[cnn.name](...args);
      }
    });

    return (
      <div >
        {(closeByClick || showMask) &&
          <div
            className={cls`
            ${showMask ? 'an-popup-desk an-popup-mask' : 'an-popup-desk'}
          `}
            onMouseDown={e => e.preventDefault()}
            onClick={e => this.onDeskClick(e)}
          />
        }
        <div
          className={cls`
              an-popup-wrapper
              ${animation}
              ${showShadow ? 'an-popup-shadow' : ''}
              ${className}`
          }
          style={{ ...popupPosition }}
          ref={(elem) => { this.popupItem = elem; }}
        >
          <WrappedComponent
            {...rest}
            {...initProps}
            {...bindedConnectors}
            dockStyle={dockStyle}
            ref={(c) => { this.wrappedComponent = c; }}
            onResize={() => this.onResize()}
          />
        </div>
      </div>
    );
  }
};

export default createPopupHOC;
