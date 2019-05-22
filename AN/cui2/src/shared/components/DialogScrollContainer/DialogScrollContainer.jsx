import React from 'react';
import PropTypes from 'prop-types';
import { isIos } from 'react-base-ui/lib/utils/browser';
import './index.less';

export class DialogScrollContainer extends React.PureComponent {

  static propTypes = {
    maxHeight: PropTypes.string
  }

  static defaultProps = {
    maxHeight: '300px'
  }

  constructor(props) {
    super(props);
    /* istanbul ignore else */
    if(isIos()) {
      this.touchStart = this._handleTouchStart.bind(this);
      this.touchMove = this._handleTouchMove.bind(this);
      this.touchEnd = this._handleTouchEnd.bind(this);
      this.scrollData = {
        posY: 0,
        maxScroll: 0
      };
    }
  }

  componentDidMount () {
    /* istanbul ignore next */
    this.fixScroll();
  }
  componentWillUnmount() {
    /* istanbul ignore next */
    this.unFixScroll();
  }

  _handleTouchStart = (event) => {
    const events = event.touches[0] || event;
    const elSroll = this.root;
    if (elSroll) {
      this.scrollData = {
        elScroll: elSroll,
        posY: events.pageY,
        maxScroll: elSroll.scrollHeight - elSroll.clientHeight
      };
    }
  }
  _handleTouchMove = (event) => {
    const data = this.scrollData;
    event.stopPropagation();
    if ((data.elScroll === event.target) || data.elScroll.contains(event.target)) {
      if (data.maxScroll <= 0) {
        event.preventDefault();
        return;
      }

      const scrollTop = data.elScroll.scrollTop;
      /* istanbul ignore next */
      const events = event.touches[0] || event;
      const distanceY = events.pageY - data.posY;
      if (distanceY > 0 && scrollTop === 0) {
        event.preventDefault();
        return;
      }
      /* istanbul ignore else */
      if (distanceY < 0 && (scrollTop + 1 >= data.maxScroll)) {
        event.preventDefault();
      }
    } else {
      event.preventDefault();
    }
  }
  _handleTouchEnd = () => {
    this.scrollData = {};
  }

  fixScroll = () => {
    /* istanbul ignore else */
    if (isIos()) {
      this.unFixScroll();
      this.root.addEventListener('touchstart', this.touchStart, false);
      this.root.addEventListener('touchmove', this.touchMove, false);
      this.root.addEventListener('touchend', this.touchEnd, false);
    }
  }
  unFixScroll = () => {
    /* istanbul ignore else */
    if (isIos()) {
      this.root.removeEventListener('touchstart', this.touchStart, false);
      this.root.removeEventListener('touchmove', this.touchMove, false);
      this.root.removeEventListener('touchend', this.touchEnd, false);
    }
  }

  bindRootRef = (ref) => {
    this.root = ref;
  }

  render() {
    const { maxHeight } = this.props
    return (
      <div className="an-dialog-scroll-container" style={{maxHeight}} ref={this.bindRootRef} >
      {this.props.children}
      </div>
    )
  }
}

export default DialogScrollContainer;
