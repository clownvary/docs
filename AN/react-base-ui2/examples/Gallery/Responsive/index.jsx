import React from 'react';
import ReactDOM from 'react-dom';
import responsiveService, {
  withResponsiveProvider,
  attachResizeEvent,
  detachResizeEvent
} from 'src/services/responsive';
import CollapsePanel from 'src/components/CollapsePanel';
import { Form, Group } from '../../App/components/Form';
import DemoPage from '../../App/components/DemoPage';


// Global responsive configuration
responsiveService.setConfig({
  rangeNames: ['lg', 'md', 'sm', 'xs'],
  breakpoints: [1200, 960, 768]
});


class Page extends DemoPage {

  static meta = {
    name: 'Responsive',
    icon: 'icon-retweet',
    description: 'This example demonstrates the features of Responsive.'
  };

  constructor(props) {
    super(props);

    this.state.panelSize = {
      width: 0,
      height: 0
    };
  }

  componentDidMount() {
    const panelDom = ReactDOM.findDOMNode(this.panel);
    attachResizeEvent(panelDom, this.onPanelResize, this);
    this.onMount(() => this.setState({
      panelSize: {
        width: panelDom.offsetWidth,
        height: panelDom.offsetHeight
      }
    }));
  }

  componentWillUnmount() {
    detachResizeEvent(this.panel, this.onPanelResize, this);
  }

  onMount(updatePanelSizeState) {
    updatePanelSizeState();
  }

  onPanelResize(size) {
    this.setState({
      panelSize: size
    });
  }

  renderContent() {
    const { responsive: {
      rangeName,
      screenWidth,
      orientation
    } } = this.props;

    const { panelSize } = this.state;
    return (
      <div>
        <Form title="Screen Information">
          <Group>
            <span className="field-label">Range Name:</span>
            <span className="field bold">{rangeName}</span>
          </Group>
          <Group>
            <span className="field-label">Width:</span>
            <span className="field bold">{`${screenWidth}px`}</span>
          </Group>
          <Group>
            <span className="field-label">Orientation:</span>
            <span className="field bold">{orientation || 'N/A on Desktop'}</span>
          </Group>
          <Group>
            <span className="field-label">Panel Size:</span>
            <span className="field bold">{`${panelSize.width}(px) - ${panelSize.height}(px)`}</span>
          </Group>
        </Form>
        <CollapsePanel
          className="demo-panel"
          title="Demo of Dynamic Height"
          ref={(c) => { this.panel = c; }}
        >
          <p>Responsive service has sensitive to the size change of specified element.</p>
          <p>Try expanding or collapsing the panel.</p>
        </CollapsePanel>
      </div>
    );
  }
}

const PageWithResponsive = withResponsiveProvider(Page);
PageWithResponsive.meta = {
  name: 'Responsive',
  icon: 'icon-retweet',
  description: 'This example demonstrates the features of Responsive.'
};

export default PageWithResponsive;
