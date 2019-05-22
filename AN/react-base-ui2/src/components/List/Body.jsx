import React from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';
import throttle from 'lodash/throttle';

import { ListType } from './consts';
import SingleColumnView from './SingleColumnList';
import MultipleColumnsView from './MultipleColumnsList';

const BodyPropTypes = {
  data: PropTypes.array.isRequired,
  config: PropTypes.object.isRequired,
  selectedIndex: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  onScrollToBottom: PropTypes.func.isRequired
};

class Body extends React.PureComponent {
  static displayName = 'Body';
  static propsType = BodyPropTypes;

  componentDidMount() {
    const { config: { asyncable }, onScrollToBottom } = this.props;
    this.bindScroll(asyncable, onScrollToBottom);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.config.asyncable !== this.props.config.asyncable) {
      this.bindScroll(nextProps.config.asyncable, nextProps.onScrollToBottom);
    }
  }

  bindScroll(asyncable, onScrollToBottom) {
    if (asyncable && isFunction(onScrollToBottom)) {
      this.body.onscroll = throttle(() => {
        const { clientHeight, scrollHeight, scrollTop } = this.body;
        if (scrollHeight - clientHeight - 50 <= scrollTop) {
          onScrollToBottom();
        }
      }, 400);
    } else {
      this.body.onscroll = null;
    }
  }

  render() {
    const {
      data,
      config,
      renderer,
      selectedIndex,
      activeIndex,
      ...rest
    } = this.props;

    const {
      prefix,
      listType,
      maxHeight
    } = config;

    const newProps = {
      ...rest,
      config,
      data,
      renderer,
      selectedIndex,
      activeIndex
    };

    return (
      <div
        ref={(body) => { this.body = body; }}
        className={`${prefix}list__body`}
        style={{ maxHeight }}
      >
        {
          listType === ListType.SINGLE &&
          <SingleColumnView
            {...newProps}
          />
        }

        {
          listType === ListType.MULTIPLE &&
          <MultipleColumnsView
            {...newProps}
          />
        }
      </div>
    );
  }
}

export default Body;
