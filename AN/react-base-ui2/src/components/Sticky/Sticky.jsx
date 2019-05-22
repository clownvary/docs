/* The MIT License (MIT)
 * FROM  https://github.com/captivationsoftware/react-sticky
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isFunction from 'lodash/isFunction';
import { attachResizeEvent, detachResizeEvent } from '../../services/responsive';

/**
 * @description
 * Sticky will be triggered when element is 0 pixels from top (default).
 *
 * @class
 */
export default class Sticky extends Component {

  /** Default Props of Sticky */
  static defaultProps = {
    topOffset: 0,
    bottomOffset: 0,
    relative: false,
    onChange: () => {},
    fullScreen: false,
    disableCompensation: false
  }

  /**
   * ContextTypes of Sticky
   */
  static contextTypes = {
    addListener: PropTypes.func,
    removeListener: PropTypes.func,
    getContainerNode: PropTypes.func
  }

  static propTypes = {
    className: PropTypes.string,
    topOffset: PropTypes.number,
    bottomOffset: PropTypes.number,
    relative: PropTypes.bool,
    children: PropTypes.node.isRequired,
    onChange: PropTypes.func,
    fullScreen: PropTypes.bool,
    disableCompensation: PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.state = {
      isSticky: false,
      style: { }
    };
  }

  componentWillMount() {
    if (!this.context.addListener) throw new TypeError('Expected Sticky to be mounted within StickyContainer');

    this.context.addListener(this.handleContainerEvent);
  }

  componentDidMount() {
    attachResizeEvent(this.content, this.handleResizeEvent);
  }

  componentDidUpdate() {
    this.placeholder.style.paddingBottom = this.props.disableCompensation ? 0 : `${this.state.isSticky ? this.state.calculatedHeight : 0}px`;
  }

  componentWillUnmount() {
    this.context.removeListener(this.handleContainerEvent);
    detachResizeEvent(this.content, this.handleResizeEvent);
  }

  handleResizeEvent = () => {
    const contentClientRect = this.content.getBoundingClientRect();
    const calculatedHeight = contentClientRect.height;
    this.placeholder.style.paddingBottom = this.props.disableCompensation ? 0 : `${this.state.isSticky ? calculatedHeight : 0}px`;
  }

  handleContainerEvent = ({ distanceFromTop, distanceFromBottom }) => {
    const container = this.context.getContainerNode();

    const placeholderClientRect = this.placeholder.getBoundingClientRect();
    const contentClientRect = this.content.getBoundingClientRect();
    const calculatedHeight = contentClientRect.height;

    const bottomDifference = (distanceFromBottom - this.props.bottomOffset - calculatedHeight)
                               + this.props.topOffset;

    const wasSticky = !!this.state.isSticky;
    const isSticky = distanceFromTop <= -this.props.topOffset &&
                    distanceFromBottom > -this.props.bottomOffset;

    distanceFromBottom = (this.props.relative ?
                           container.scrollHeight - container.scrollTop : distanceFromBottom)
                         - calculatedHeight;

    let style = !isSticky ? { } : {
      top: bottomDifference > 0 ? -this.props.topOffset : bottomDifference + (-this.props.topOffset)
    };

    const assignStyle = this.props.fullScreen ? {
      left: 0,
      right: 0
    } : {
      left: placeholderClientRect.left,
      width: placeholderClientRect.width
    };

    style = isSticky ? Object.assign(style, assignStyle) : {};

    this.setState({
      isSticky,
      calculatedHeight,
      style
    });

    const stickyStatus = {
      isSticky,
      distanceFromTop,
      distanceFromBottom,
      calculatedHeight,
      style
    };

    if (isSticky !== wasSticky) {
      isFunction(this.props.onChange) && this.props.onChange(stickyStatus);
    }
  };

  render() {
    const className = classNames('an-sticky', {
      'is-sticky': this.state.isSticky,
      [this.props.className || '']: this.state.isSticky
    });

    return (
      <div>
        <div ref={(placeholder) => { this.placeholder = placeholder; }} />
        <div
          className={className}
          style={this.state.style}
          ref={(content) => { this.content = content; }}
        >
          { this.props.children }
        </div>
      </div>
    );
  }
}
