import React from 'react';
import { bool, string } from 'prop-types';
import isFunction from 'lodash/isFunction';

// import { outerWidth, outerHeight } from '../../utils/dom';
import { attachResizeEvent, detachResizeEvent } from '../../services/responsive';
import Scroll from '../../services/scroll';

/**
 * Default PropTypes of ScrollerPane.
 */
const ScrollerPanePropTypes = {
  horizontal: bool,
  vertical: bool,
  group: string
};

/** Default Props for ScrollerPane */
const ScrollerPaneProps = {
  horizontal: false,
  vertical: false,
  group: ''
};


class ScrollerPane extends React.PureComponent {
  static displayName = 'ScrollerPane';
  static defaultProps = ScrollerPaneProps;
  static propTypes = ScrollerPanePropTypes;

  constructor() {
    super();

    this.onResize = this.onResize.bind(this);
  }

  componentDidMount() {
    const { group, onResize, master = false, onScroll } = this.props;
    if (group) {
      Scroll.addToGroup(group, this.pane, false, master, onScroll);
    }

    if (this.pane && isFunction(onResize)) {
      attachResizeEvent(this.pane, this.onResize);
      const size = this.getSize();
      this.onResize(size, false);
    }
  }

  getSize() {
    const size = {
      width: this.pane.clientWidth,
      height: this.pane.clientHeight
    };

    return size;
  }

  componentWillUnmount() {
    const { group, onResize } = this.props;
    if (group) {
      Scroll.removeFromGroup(group, this.pane);
    }

    if (this.pane && isFunction(onResize)) {
      detachResizeEvent(this.pane, this.onResize);
    }
  }

  onResize(size, isBody) {
    const { onResize } = this.props;
    if (this.pane && isFunction(onResize)) {
      const scrollbarSize = Scroll.getScrollbarSize(this.pane);
      if (scrollbarSize) {
        onResize({
          size,
          scrollbarSize,
          isBody
        });
      }
    }
  }

  focus() {
    this.pane.focus();
  }

  render() {
    const {
      horizontal,
      vertical,
      style = {},
      children
    } = this.props;

    style.overflowX = horizontal ? 'auto' : 'hidden';
    style.overflowY = vertical ? 'auto' : 'hidden';

    return (
      <div
        className="an-scroller-pane"
        style={style}
        ref={(c) => { this.pane = c; }}
        tabIndex={-1}
      >
        {children}
      </div>
    );
  }

}

export default ScrollerPane;
