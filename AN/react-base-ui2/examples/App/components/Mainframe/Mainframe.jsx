import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const CANCEL_DISTANCE_ON_SCROLL = 20;

export const MainframePropTypes = {
  // main content to render
  children: PropTypes.node.isRequired,

  // styles
  styles: PropTypes.shape({
    root: PropTypes.object,
    sidebar: PropTypes.object,
    content: PropTypes.object,
    overlay: PropTypes.object,
    dragHandle: PropTypes.object
  }),

  // sidebar content to render
  sidebar: PropTypes.node.isRequired,

  // boolean if sidebar should be docked
  docked: PropTypes.bool,

  // boolean if sidebar should slide open
  open: PropTypes.bool,

  // boolean if transitions should be disabled
  transitions: PropTypes.bool,

  // boolean if touch gestures are enabled
  touch: PropTypes.bool,

  // max distance from the edge we can start touching
  touchHandleWidth: PropTypes.number,

  // Place the sidebar on the right
  pullRight: PropTypes.bool,

  // Enable/Disable sidebar shadow
  shadow: PropTypes.bool,

  // distance we have to drag the sidebar to toggle open state
  dragToggleDistance: PropTypes.number,

  // callback called when the overlay is clicked
  onSetOpen: PropTypes.func,

  // Intial sidebar sidebarWidth when page loads
  sidebarWidth: PropTypes.number
};

export const MainframeDefaultProps = {
  docked: false,
  open: false,
  transitions: true,
  touch: true,
  touchHandleWidth: 20,
  pullRight: false,
  shadow: true,
  dragToggleDistance: 30,
  onSetOpen: () => {},
  styles: {},
  sidebarWidth: 0
};


export default class Mainframe extends React.PureComponent {
  static displayName = 'Mainframe';
  static defaultProps = MainframeDefaultProps;
  static propTypes = MainframePropTypes;

  constructor(props) {
    super(props);

    this.state = {
      // the detected sidebarWidth of the sidebar in pixels
      sidebarWidth: props.sidebarWidth,

      // keep track of touching params
      touchIdentifier: null,
      touchStartX: null,
      touchStartY: null,
      touchCurrentX: null,
      touchCurrentY: null,

      // if touch is supported by the browser
      dragSupported: typeof window === 'object' && 'ontouchstart' in window
    };

    this.overlayClicked = this.overlayClicked.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    this.saveBarWidth();
  }

  componentDidUpdate() {
    // filter out the updates when we're touching
    if (!this.isTouching()) {
      this.saveBarWidth();
    }
  }

  onTouchStart(ev) {
    // filter out if a user starts swiping with a second finger
    if (!this.isTouching()) {
      const touch = ev.targetTouches[0];
      this.setState({
        touchIdentifier: touch.identifier,
        touchStartX: touch.clientX,
        touchStartY: touch.clientY,
        touchCurrentX: touch.clientX,
        touchCurrentY: touch.clientY
      });
    }
  }

  onTouchMove(ev) {
    if (this.isTouching()) {
      for (let ind = 0; ind < ev.targetTouches.length; ind += 1) {
        // we only care about the finger that we are tracking
        if (ev.targetTouches[ind].identifier === this.state.touchIdentifier) {
          this.setState({
            touchCurrentX: ev.targetTouches[ind].clientX,
            touchCurrentY: ev.targetTouches[ind].clientY
          });
          break;
        }
      }
    }
  }

  onTouchEnd() {
    if (this.isTouching()) {
      // trigger a change to open if sidebar has been dragged beyond dragToggleDistance
      const touchWidth = this.touchSidebarWidth();

      if ((this.props.open &&
          (touchWidth < this.state.sidebarWidth - this.props.dragToggleDistance)) ||
          (!this.props.open && (touchWidth > this.props.dragToggleDistance))) {
        this.props.onSetOpen(!this.props.open);
      }

      this.setState({
        touchIdentifier: null,
        touchStartX: null,
        touchStartY: null,
        touchCurrentX: null,
        touchCurrentY: null
      });
    }
  }

  // This logic helps us prevents the user from sliding the sidebar horizontally
  // while scrolling the sidebar vertically. When a scroll event comes in, we're
  // cancelling the ongoing gesture if it did not move horizontally much.
  onScroll() {
    if (this.isTouching() && this.inCancelDistanceOnScroll()) {
      this.setState({
        touchIdentifier: null,
        touchStartX: null,
        touchStartY: null,
        touchCurrentX: null,
        touchCurrentY: null
      });
    }
  }

  // True if the on going gesture X distance is less than the cancel distance
  inCancelDistanceOnScroll() {
    let cancelDistanceOnScroll;

    if (this.props.pullRight) {
      cancelDistanceOnScroll = Math.abs(this.state.touchCurrentX - this.state.touchStartX) <
                                        CANCEL_DISTANCE_ON_SCROLL;
    } else {
      cancelDistanceOnScroll = Math.abs(this.state.touchStartX - this.state.touchCurrentX) <
                                        CANCEL_DISTANCE_ON_SCROLL;
    }
    return cancelDistanceOnScroll;
  }

  isTouching() {
    return this.state.touchIdentifier !== null;
  }

  overlayClicked() {
    if (this.props.open) {
      this.props.onSetOpen(false);
    }
  }

  saveBarWidth() {
    const sidebarWidth = this.sidebar.offsetWidth;

    if (sidebarWidth !== this.state.sidebarWidth) {
      this.setState({ sidebarWidth });
    }
  }

  // calculate the sidebarWidth based on current touch info
  touchSidebarWidth() {
    // if the sidebar is open and start point of drag is inside the sidebar
    // we will only drag the distance they moved their finger
    // otherwise we will move the sidebar to be below the finger.
    if (this.props.pullRight) {
      if (this.props.open && window.innerWidth - this.state.touchStartX < this.state.sidebarWidth) {
        if (this.state.touchCurrentX > this.state.touchStartX) {
          return (this.state.sidebarWidth + this.state.touchStartX) - this.state.touchCurrentX;
        }
        return this.state.sidebarWidth;
      }
      return Math.min(window.innerWidth - this.state.touchCurrentX, this.state.sidebarWidth);
    }

    if (this.props.open && this.state.touchStartX < this.state.sidebarWidth) {
      if (this.state.touchCurrentX > this.state.touchStartX) {
        return this.state.sidebarWidth;
      }
      return (this.state.sidebarWidth - this.state.touchStartX) + this.state.touchCurrentX;
    }
    return Math.min(this.state.touchCurrentX, this.state.sidebarWidth);
  }

  render() {
    const { styles: {
      root: rootStyle = {},
      sidebar: sidebarStyle = {},
      content: contentStyle = {},
      overlay: overlayStyle = {} },
      dragHandle: dragHandleStyle = {} } = this.props;
    const useTouch = this.state.dragSupported && this.props.touch;
    const isTouching = this.isTouching();

    let dragHandle;

    // sidebarStyle right/left
    if (this.props.pullRight) {
      sidebarStyle.right = 0;
      sidebarStyle.transform = 'translateX(100%)';
      sidebarStyle.WebkitTransform = 'translateX(100%)';
      if (this.props.shadow) {
        sidebarStyle.boxShadow = '-2px 2px 4px rgba(0, 0, 0, 0.15)';
      }
    } else {
      sidebarStyle.left = 0;
      sidebarStyle.transform = 'translateX(-100%)';
      sidebarStyle.WebkitTransform = 'translateX(-100%)';
      if (this.props.shadow) {
        sidebarStyle.boxShadow = '2px 2px 4px rgba(0, 0, 0, 0.15)';
      }
    }

    if (isTouching) {
      const percentage = this.touchSidebarWidth() / this.state.sidebarWidth;

      // slide open to what we dragged
      if (this.props.pullRight) {
        sidebarStyle.transform = `translateX(${(1 - percentage) * 100}%)`;
        sidebarStyle.WebkitTransform = `translateX(${(1 - percentage) * 100}%)`;
      } else {
        sidebarStyle.transform = `translateX(-${(1 - percentage) * 100}%)`;
        sidebarStyle.WebkitTransform = `translateX(-${(1 - percentage) * 100}%)`;
      }

      // fade overlay to match distance of drag
      overlayStyle.opacity = percentage;
      overlayStyle.visibility = 'visible';
    } else if (this.props.docked) {
      // show sidebar
      if (this.state.sidebarWidth !== 0) {
        sidebarStyle.transform = 'translateX(0%)';
        sidebarStyle.WebkitTransform = 'translateX(0%)';
      }

      // make space on the left/right side of the content for the sidebar
      if (this.props.pullRight) {
        contentStyle.right = `${this.state.sidebarWidth}px`;
      } else {
        contentStyle.left = `${this.state.sidebarWidth}px`;
      }
    } else if (this.props.open) {
      // slide open sidebar
      sidebarStyle.transform = 'translateX(0%)';
      sidebarStyle.WebkitTransform = 'translateX(0%)';

      // show overlay
      overlayStyle.opacity = 1;
      overlayStyle.visibility = 'visible';
    }

    if (isTouching || !this.props.transitions) {
      sidebarStyle.transition = 'none';
      sidebarStyle.WebkitTransition = 'none';
      contentStyle.transition = 'none';
      overlayStyle.transition = 'none';
    }

    const rootProps = {};
    if (useTouch) {
      if (this.props.open) {
        rootProps.onTouchStart = this.onTouchStart;
        rootProps.onTouchMove = this.onTouchMove;
        rootProps.onTouchEnd = this.onTouchEnd;
        rootProps.onTouchCancel = this.onTouchEnd;
        rootProps.onScroll = this.onScroll;
      } else {
        dragHandleStyle.width = this.props.touchHandleWidth;

        // dragHandleStyle right/left
        if (this.props.pullRight) {
          dragHandleStyle.right = 0;
        } else {
          dragHandleStyle.left = 0;
        }

        dragHandle = (
          <div
            style={dragHandleStyle}
            onTouchStart={this.onTouchStart} onTouchMove={this.onTouchMove}
            onTouchEnd={this.onTouchEnd} onTouchCancel={this.onTouchEnd}
          />);
      }
    }

    const {
      className,
      sidebar,
      children
    } = this.props;

    return (
      <div
        className={classNames('an-mainframe', className)}
        style={{ ...rootStyle }}
        role="navigation"
        {...rootProps}
      >
        <div
          className="an-mainframe__sidebar"
          style={{ ...sidebarStyle }}
          ref={(c) => { this.sidebar = c; }}
        >
          {sidebar}
        </div>
        <div
          className="an-mainframe__overlay"
          style={{ ...overlayStyle }}
          role="presentation"
          tabIndex="0"
          onClick={this.overlayClicked}
        />
        <div
          className="an-mainframe__content"
          style={{ ...contentStyle }}
        >
          {dragHandle}
          {children}
        </div>
      </div>
    );
  }
}
