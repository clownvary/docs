import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { DefaultCSSPrefix } from '../../consts';
import { addClass } from '../../utils/dom';

const defaultGetContainer = () => {
  const container = window.document.createElement('div');
  window.document.body.appendChild(container);
  return container;
};

const PortalPropTypes = {
  CSSPrefix: PropTypes.string,
  getContainer: PropTypes.func,
  savePortalRef: PropTypes.func,
  children: PropTypes.node.isRequired,
  onChildrenMount: PropTypes.func
};

const PortalDefaultProps = {
  CSSPrefix: DefaultCSSPrefix,
  getContainer: defaultGetContainer
};

export default class Portal extends React.Component {
  static propTypes = PortalPropTypes;
  static defaultProps = PortalDefaultProps;


  componentDidMount() {
    this.createContainer();
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    const { savePortalRef, children, onChildrenMount } = this.props;
    this.container && ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      <div ref={savePortalRef}>{children}</div>,
      this.container,
      onChildrenMount
    );
  }

  componentWillUnmount() {
    this.removeContainer();
  }

  createContainer() {
    const { CSSPrefix, getContainer } = this.props;
    const { portalClassName } = this.context;

    const container = getContainer();
    container && addClass(container, `${CSSPrefix}-portal`);
    container && portalClassName && addClass(container, portalClassName);
    this.container = container;
  }

  removeContainer() {
    if (this.container) {
      ReactDOM.unmountComponentAtNode(this.container);
      this.container.parentNode.removeChild(this.container);
      this.container = null;
    }
  }

  render() {
    return null;
  }
}
