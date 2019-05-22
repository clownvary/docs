import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Portal from '../Portal';
import { Icon } from '../SVG';
import easeInOutCubic from './easeInOutCubic';
import DefaultCSSPrefix from '../../consts/DefaultCSSPrefix';
import '../../svgs/arrow-up.svg';

const backToTopPropTypes = {
  backButtonRenderer: PropTypes.func,
  visibilityHeight: PropTypes.number,
  scrollDuration: PropTypes.number,
  onClick: PropTypes.func
};

const backToTopDefaultProps = {
  visibilityHeight: 200,
  scrollDuration: 400,
  backButtonRenderer: backButton => backButton
};

class BackToTop extends Component {
  static propTypes = backToTopPropTypes;
  static defaultProps = backToTopDefaultProps;

  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.handleScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  getDefaultBackButton = () => (
    <div className={`${DefaultCSSPrefix}-back-top__btn`} onClick={this.scrollToTop}>
      <Icon symbolPrefix="an-icon" name="arrow-up" focusable="false" size="sm" />
    </div>
  );

  getCurrentScrollTop = () =>
    window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;

  setScrollTop = (value) => {
    document.body.scrollTop = value;
    document.documentElement.scrollTop = value;
  };

  scrollToTop = (e) => {
    const { scrollDuration, onClick } = this.props;
    const scrollTop = this.getCurrentScrollTop();
    const startTime = Date.now();
    const frameFunc = () => {
      const timestamp = Date.now();
      const time = timestamp - startTime;
      this.setScrollTop(easeInOutCubic(time, scrollTop, 0, scrollDuration));
      if (time < scrollDuration) {
        window.requestAnimationFrame(frameFunc);
      } else {
        this.setScrollTop(0);
      }
    };
    window.requestAnimationFrame(frameFunc);

    onClick && onClick(e);
  };

  handleScroll = () => {
    const { visibilityHeight } = this.props;
    const scrollTop = this.getCurrentScrollTop();
    this.setState({
      visible: scrollTop > visibilityHeight
    });
  };

  render() {
    const { visible } = this.state;
    if (!visible) {
      return null;
    }

    const { className, backButtonRenderer, ...rest } = this.props;
    const buttonNode = backButtonRenderer(this.getDefaultBackButton(),
      { ...rest, onClick: this.scrollToTop }
    );
    return (
      <Portal>
        <div className={classNames(`${DefaultCSSPrefix}-back-top`, className)}>
          {buttonNode}
        </div>
      </Portal>
    );
  }
}

export default BackToTop;
