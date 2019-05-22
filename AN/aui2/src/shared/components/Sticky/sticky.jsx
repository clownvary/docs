import PropTypes from 'prop-types';
import React from 'react';
import UIComponent from 'shared/components/UIComponent';

export default class Sticky extends UIComponent {
  static propTypes = {
    className: PropTypes.string,
    topOffset: PropTypes.number,
    // Sticky state will be triggered when the top of the element is topOffset pixels
    // from the top of the closest <StickyContainer />
    bottomOffset: PropTypes.number,
    // Sticky state will be triggered when the bottom of the element is bottomOffset pixels
    // from the bottom of the closest <StickyContainer />.
    children: PropTypes.node,
    style: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    stickyStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    stickyClassName: PropTypes.string,
    onStuck: PropTypes.func,
    onDetached: PropTypes.func
  };

  static defaultProps = {
    className: '',
    style: {},
    stickyStyle: {},
    topOffset: 0,
    bottomOffset: 0,
    stickyClassName: 'sticky-element',
    scrollXFollow: false
  };

  static contextTypes = {
    sticky: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = {
      stickyStyle: {}
    };
  }
  componentDidMount() {
    this.stickyContainer = this.context.sticky || {};
    window.addEventListener('resize', this.resize);
    window.addEventListener('scroll', this.recomputeState);
    this.recomputeState();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.topOffset !== this.props.topOffset) {
      this.recomputeState();
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
    window.removeEventListener('scroll', this.recomputeState);
  }
  render() {
    const {
      className,
      children,
      stickyClassName,
      style,
      stickyStyle: stickyStyleOfProps
    } = this.props;
    const {
      stickyStyle: stickyStyleOfState
    } = this.state;

    const stickyStyle = Object.assign({}, stickyStyleOfState, stickyStyleOfProps);

    return (<div className={`sticky ${className}`} style={style}>
      <div ref={e => (this._refs.placeholder = e)} />
      {React.Children.map(children, child => React.cloneElement(child, {
        ref: 'children',
        style: stickyStyle,
        className: `${child.props.className || ''} ${stickyClassName}`
      }))}
    </div>);
  }
  getOffset() {
    return this.refs.children.getBoundingClientRect();
  }
  getPlaceholderOffset() {
    return this._refs.placeholder.getBoundingClientRect();
  }
  getDistanceFromBottom() {
    const { node } = this.stickyContainer;
    const { topOffset } = this.props;

    /* istanbul ignore else */
    if (!node) {
      return window.innerHeight - topOffset - this.getOffset().height;
    }
    return node.getBoundingClientRect().bottom;
  }

  recomputeState = () => {
    const { topOffset, bottomOffset, scrollXFollow, onStuck, onDetached } = this.props;
    const { width, left, height } = this.getOffset();
    let top = this.getPlaceholderOffset().top;
    const distanceFromBottom = this.getDistanceFromBottom();
    const bottomBreakPoint = bottomOffset + height;
    const { stickyStyle = {} } = this.state;

    if (top >= topOffset ||
      distanceFromBottom < bottomBreakPoint) { // no need sticky
      if (Object.keys(stickyStyle).length > 0) {
        this.setState({
          stickyStyle: {}
        });
        onDetached && onDetached({});
      }
      this._refs.placeholder.style.height = '0';
      return false;
    }

    /* istanbul ignore else */
    if (top < topOffset) {
      top = topOffset < 0 ? 0 : topOffset;
    }
    this._refs.placeholder.style.height = `${height}px`;

    if (this.baseLeft === undefined) {
      this.baseLeft = left;
    }
    const scrolledLeft = scrollXFollow ? this.baseLeft - window.pageXOffset : left;
    if (width !== stickyStyle.width || top !== stickyStyle.top || scrolledLeft !== stickyStyle.left || stickyStyle.position !== 'fixed') {
      const newStickyStyle = {
        width,
        top,
        left: scrolledLeft,
        position: 'fixed'
      };
      this.setState({
        stickyStyle: newStickyStyle
      });

      onStuck && onStuck(newStickyStyle);
    }
    return true;
  }

  resize = () => {
    this._refs.placeholder.style.height = '0';
    this.setState({ stickyStyle: {} }, this.recomputeState);
  };
}

