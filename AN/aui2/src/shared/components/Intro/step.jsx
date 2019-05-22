import React from 'react';
import UIComponent from 'shared/components/UIComponent';
import IntroArrow from 'shared/components/IntroArrow';

const timeout = 300;

export default class Step extends UIComponent {
  constructor(props) {
    super(props);
    this.timer = 0;
    this.state = {
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      display: 'none'
    };
  }

  render() {
    const { step } = this.props;

    return (
      <div className="intro-step-wrapper" style={this.state}>
        <div className={`intro-step ${step.className || ''}`}>
          <div className={`intro-tooltip intro-tooltip-${step.position}`}>
            {step.text}
            <IntroArrow />
          </div>
        </div>
        <div className="intro-step-mask" />
      </div>
    );
  }

  static getOffset(elem) {
    if (!elem.getClientRects().length) {
      return { top: 0, left: 0 };
    }

    const rect = elem.getBoundingClientRect();

    // Make sure element is not hidden (display: none)
    /* istanbul ignore else */
    if (rect.width || rect.height) {
      const doc = elem.ownerDocument;
      /* istanbul ignore next */
      const win = doc === doc.window ? doc : doc.nodeType === 9 && doc.defaultView;
      const docElem = doc.documentElement;
      return {
        top: (rect.top + win.pageYOffset) - docElem.clientTop,
        left: (rect.left + win.pageXOffset) - docElem.clientLeft
      };
    }

    return rect;
  }

  setPosition = (target) => {
    const { left: prevLeft, top: prevTop } = Step.getOffset(target);
    this.timer = setTimeout(() => {
      const { left, top } = Step.getOffset(target);
      const padding = 2;

      if (left === prevLeft && top === prevTop) {
        this.setState({
          left: left - padding,
          top: top - padding,
          width: target.offsetWidth + (padding * 2),
          height: target.offsetHeight + (padding * 2),
          display: 'block'
        });
      } else {
        this.setPosition(target);
      }
    }, timeout);
  }

  componentDidMount() {
    const { target } = this.props.step;
    target.className += ' intro-showElement';

    /* istanbul ignore if */
    if (window.getComputedStyle && window.getComputedStyle(target, null).getPropertyValue('display') === 'inline') {
      target.className += ' intro-display-inline-block';
    }
    this.setPosition(target);
  }

  componentWillUpdate() {
    this.setPosition(this.props.step.target);
  }

  componentWillUnmount() {
    const target = this.props.step.target;

    clearTimeout(this.timer);

    target.className = target.className.split(' ').reduce((prevC, currentC) => {
      if (currentC.indexOf('intro-showElement') !== -1 || currentC.indexOf('intro-display-inline-block') !== -1) {
        return prevC;
      }
      return `${prevC} ${currentC}`;
    });
  }
}
