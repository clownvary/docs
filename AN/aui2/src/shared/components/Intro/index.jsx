import React from 'react';
import ReactDOM from 'react-dom';
import UIComponent from 'shared/components/UIComponent';
import Button from 'react-base-ui/lib/components/Button';

import './index.less';
import Step from './step';

export default class Intro extends UIComponent {
  constructor(props) {
    super(props);
    this.setState = { update: false };
  }

  render() {
    // please keep 'steps, hide, ready, onClickCallback' here, otherwise attrs will have this prop
    // it's a unknown prop for DOM, and will has a warning in browser
    // eslint-disable-next-line no-unused-vars
    const { steps, hide, ready, onClickCallback, ...attrs } = this.props;

    return React.DOM.div(attrs);
  }

  componentDidMount() {
    this.intro = document.createElement('div');
    document.body.appendChild(this.intro);
    this._render();
    window.addEventListener('resize', this.onWindowResize);
  }

  componentDidUpdate() {
    const { hide, ready } = this.props;
    /* istanbul ignore else */
    if (!hide && ready) {
      // hide body's scroll-bar
      document.body.style.overflow = 'hidden';
    }

    this._render();
  }

  componentWillUnmount() {
    this.unmount();
  }

  onWindowResize = () => {
    this._render();
  }

  onClickCallback = () => {
    // enable body's scroll-bar
    document.body.style.overflow = 'auto';

    const { onClickCallback } = this.props;
    /* istanbul ignore else */
    if (onClickCallback) {
      onClickCallback();
    }
  }

  _render = () => {
    const { hide, ready, steps } = this.props;
    const update = this.update;
    this.update = !this.update;

    ReactDOM.render(<div className={`intro ${(!hide && ready) ? '' : 'u-hidden'}`}>
      <div className="intro-overlay" />
      {
        steps.map((step, i) => {
          const target = document.querySelector(step.element);
          if (!target) {
            return null;
          }
          return <Step step={{ ...step, target }} key={i} update={update} />;
        })
      }{this.renderControl()}</div>, this.intro);
  }

  unmount = () => {
    ReactDOM.unmountComponentAtNode(this.intro);
    document.body.removeChild(this.intro);
    window.removeEventListener('resize', this.onWindowResize);
  }

  renderControl = () => {
    const { children, closeButtonText } = this.props;
    if (children) {
      return <div className="intro-control-btn" onClick={this.onClickCallback}>{children}</div>;
    }
    return (<Button
      className="intro-control-btn" type="strong"
      onClick={this.onClickCallback}
    >{closeButtonText || 'Got It'}</Button>);
  }
}

Intro.defaultProps = {
  steps: [],
  onClickCallback() {
    this.unmount();
  }
};
