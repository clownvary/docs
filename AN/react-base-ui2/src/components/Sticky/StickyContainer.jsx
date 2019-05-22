/* The MIT License (MIT)
 * FROM  https://github.com/captivationsoftware/react-sticky
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import EventEmitter from '../../common/EventEmitter';
import requestAnimationFrame from '../../utils/requestAnimationFrame';

/**
 * @description
 * Container component used to monitor browser event and post it to child subscribers.
 *
 * @class
 */
export default class StickyContainer extends PureComponent {

  /** child context type of Sticky */
  static childContextTypes = {
    addListener: PropTypes.func,
    removeListener: PropTypes.func,
    getContainerNode: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.emitter = new EventEmitter();
  }

  getChildContext() {
    return {
      addListener: this.addListener,
      removeListener: this.removeListener,
      getContainerNode: this.getContainerNode
    };
  }

  componentDidMount() {
    this.events.forEach(event => window.addEventListener(event, this.notifyChange));
  }

  componentWillUnmount() {
    this.events.forEach(event => window.removeEventListener(event, this.notifyChange));
  }

  getContainerNode = () => this.node

  addListener = (handler) => {
    this.emitter.on('scroll/notify', handler);
  }

  removeListener = (handler) => {
    this.emitter.off('scroll/notify', handler);
  }

  notifyChange = () => {
    if (!this.framePending) {
      requestAnimationFrame(() => {
        this.framePending = false;
        const { top, bottom } = this.node.getBoundingClientRect();

        this.emitter.emit('scroll/notify', {
          distanceFromTop: top,
          distanceFromBottom: bottom
        });
      });
      this.framePending = true;
    }
  }

  events = [
    'resize',
    'scroll',
    'touchmove',
    'pageshow',
    'load'
  ]

  render() {
    return (
      <div
        {...this.props}
        ref={(node) => { this.node = node; }}
      />
    );
  }
}
