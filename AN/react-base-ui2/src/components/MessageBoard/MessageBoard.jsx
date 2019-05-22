import bind from 'lodash/bind';
import find from 'lodash/find';
import pull from 'lodash/pull';
import uniq from 'lodash/uniq';
import isString from 'lodash/isString';
import without from 'lodash/without';
import concat from 'lodash/concat';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MessagePad from './MessagePad';
import emitter from './emitter';


class MessageBoard extends Component {
  static displayName = 'MessageBoard';

  static propTypes = {
    autoEnable: PropTypes.bool
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);

    this.add = bind(this.add, this);
    this.clear = bind(this.clear, this);
    this.onClose = bind(this.onClose, this);

    this.state = {
      groups: []
    };
  }

  componentDidMount() {
    const { autoEnable = true } = this.props;
    if (autoEnable) {
      this.enable();
    }
  }

  componentWillUnmount() {
    const { autoEnable = true } = this.props;
    if (autoEnable) {
      this.disable();
    }
  }

  onClose(id) {
    /* istanbul ignore next */
    let groups = this.state.groups || [];
    groups = groups.filter(group => group.id !== id);

    this.setState({
      groups
    });
  }

  enable() {
    /* istanbul ignore else */
    if (!emitter.isOn('add/notify', this.add)) {
      emitter.on('add/notify', this.add);
      emitter.on('clear/notify', this.clear);
    }
  }

  disable() {
    emitter.off('add/notify', this.add);
    emitter.off('clear/notify', this.clear);
  }

  _add(message, options = {}) {
    if (options.dismissable) {
      message.dismissable = true;
    }

    const type = message.type;
    /* istanbul ignore next */
    const groups = cloneDeep(this.state.groups || []);
    const found = find(groups, g => g.type === type);
    /* istanbul ignore else */
    if (!found) {
      groups.push(message);
    } else {
      if (!options.appendMode) {
        found.details = [];
      }
      found.details = concat(found.details, message.details);
      /* istanbul ignore else */
      if (options.noDuplicated) {
        found.details = uniq(found.details);
      }
    }

    this.setState({
      groups
    });
  }

  add(message, options = {}) {
    setTimeout(() => {
      this._add(message, options);
    }, 0);
  }

  _clear(type = '', details = []) {
    let groups = [];
    if (type) {
      /* istanbul ignore next */
      groups = cloneDeep(this.state.groups || []);
      const found = find(groups, g => g.type === type);
      /* istanbul ignore else */
      if (found) {
        /* istanbul ignore if */
        if (!isEmpty(details)) {
          if (isString(details)) {
            details = [details];
          }
          found.details = without(found.details, ...details);
        } else {
          found.details = [];
        }

        /* istanbul ignore else */
        if (isEmpty(found.details)) {
          groups = pull(groups, found);
        }
      }
    }

    this.setState({
      groups
    });
  }

  clear(type = '', details = []) {
    setTimeout(() => {
      this._clear(type, details);
    }, 0);
  }

  renderMessage(message) {
    return (
      <MessagePad
        message={message}
        onClose={this.onClose}
      />
    );
  }

  render() {
    const groups = this.state.groups;

    return (
      <div className={classNames('message-board', this.props.className)}>
        {groups && groups.map(message => this.renderMessage(message))}
      </div>
    );
  }
}

export default MessageBoard;
