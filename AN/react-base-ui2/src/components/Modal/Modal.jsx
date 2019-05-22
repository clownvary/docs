import React, { PureComponent } from 'react';
import classnames from 'classnames';
import {
  string,
  bool,
  object,
  func,
  array,
  element,
  oneOfType
} from 'prop-types';
import { isIos } from '../../utils/browser';
import * as KeyCode from '../../consts/KeyCode';
import scopeTab from './scopeTab';

const propTypes = {
  /**
   * A list of class names to pass along to the container element of component.
   */
  className: string,
  /**
   * The callback function that is triggered when the modal closes.
   */
  onClose: func,
  /**
   * The text value of modal title.
   */
  title: string,
  /**
   * The inline style for modal container element.
   */
  style: object,
  /**
   * Determines the display state of modal.
   */
  shown: bool,
  /**
   * The child nodes for modal component.
   */
  children: oneOfType([array, object, func, element])
};

const defaultProps = {
  shown: false
};

export default class Modal extends PureComponent {
  static displayName = 'Modal';
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  componentDidMount = () => {
    if (this.props.shown) {
      this.fixBody();
      this.fixScroll();
      this.autoFocus();
    }
    this.focusAfterRender = true;
    this.handleTab = scopeTab(this.root);
  }

  componentDidUpdate = ({ shown }) => {
    if (shown !== this.props.shown) {
      if (this.props.shown) {
        this.fixBody();
        this.fixScroll();
        this.originFocusEl = document.activeElement;
        /* istanbul ignore else */
        if (this.focusAfterRender) {
          this.autoFocus();
        }
      } else {
        this.unfixBody();
        this.unFixScroll();
        this.originFocusEl && this.originFocusEl.focus();
        this.focusAfterRender = true;
        clearTimeout(this.removeTimer);
      }
    }
    this.updateTabHandler();
  }

  componentWillUnmount() {
    this.unfixBody();
    this.unFixScroll();
  }

  updateTabHandler() {
    this.handleTab = scopeTab(this.root);
  }

  autoFocus = () => {
    this.removeTimer = setTimeout(() => {
      this.focusContent();
      this.focusAfterRender = false;
    }, 100);
  }

  handleTouchMove = (event) => {
    event.preventDefault();
  }

  fixScroll = () => {
    if (isIos()) {
      this.unFixScroll();
      this.root.addEventListener('touchmove', this.handleTouchMove, false);
    }
  }
  unFixScroll = () => {
    if (isIos()) {
      this.root.removeEventListener('touchmove', this.handleTouchMove, false);
    }
  }

  fixBody = () => {
    const bodyStyles = document.body.style;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    this.bodyOverflowX = bodyStyles.overflowX;
    this.bodyOverflowY = bodyStyles.overflowY;
    this.bodyPaddingRight = bodyStyles.paddingRight;

    bodyStyles.overflowX = bodyStyles.overflowY = 'hidden';

    /* istanbul ignore else */
    if (scrollbarWidth > 0) {
      const paddingRight = getComputedStyle(document.body).paddingRight;
      this.root.style.paddingRight = bodyStyles.paddingRight = `${parseInt(
        paddingRight,
        10,
      ) + parseInt(scrollbarWidth, 0)}px`;
    }
  }

  unfixBody = () => {
    const bodyStyles = document.body.style;
    bodyStyles.overflowX = this.bodyOverflowX;
    bodyStyles.overflowY = this.bodyOverflowY;
    bodyStyles.paddingRight = this.bodyPaddingRight;
    this.root.style.paddingRight = '';
  }

  focusContent = () => {
    if (!this.contentHasFocus()) {
      this.closeIcon.focus();
    }
  }

  contentHasFocus = () =>
    document.activeElement === this.root ||
    this.root.contains(document.activeElement)

  handleModalKeydown = (e) => {
    switch (e.keyCode) {
      case KeyCode.ESCAPE:
        this.props.onClose(e);
        break;
      case KeyCode.TAB:
        this.handleTab(e);
        break;
      default:
        break;
    }
  }

  handleCloseIconKeydown = (e) => {
    switch (e.keyCode) {
      case KeyCode.SPACE:
      case KeyCode.ENTER:
        this.props.onClose(e);
        e.preventDefault();
        break;
      default:
        break;
    }
  }

  bindRootRef = (ref) => {
    this.root = ref;
  }

  bindBoxRef = (ref) => {
    this.box = ref;
  }

  bindCloseIconRef = (ref) => {
    this.closeIcon = ref;
  }

  render = () => {
    const {
      className,
      style,
      title,
      shown,
      onClose,
      children,
      ...rest
    } = this.props;
    const classes = classnames(
      {
        modal: true,
        'is-open': shown
      },
      className,
    );

    return (
      <div {...rest} className="modal-wrap" role="dialog">
        <div
          className={classes}
          style={style}
          ref={this.bindRootRef}
          onKeyDown={this.handleModalKeydown}
        >
          <section className="modal-box" ref={this.bindBoxRef}>
            <header className="modal-header">
              <h3 className="modal-title">{title}</h3>
              <span
                role="button"
                className="icon icon-close modal-close"
                tabIndex="0"
                aria-label="close-dialog"
                ref={this.bindCloseIconRef}
                onClick={onClose}
                onKeyDown={this.handleCloseIconKeydown}
              />
            </header>
            {children}
          </section>
        </div>
        <div className="modal-mask" />
      </div>
    );
  }
}
