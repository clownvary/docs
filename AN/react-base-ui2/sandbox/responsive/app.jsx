import React from 'react';
import classNames from 'classnames';
import responsiveService, {
  withResponsiveProvider,
  attachResizeEvent,
  detachResizeEvent
} from 'src/services/responsive';

import Button from 'src/components/Button';
import '../base.less';
import '../layout.less';
import './app.less';

// Global responsive configuration
responsiveService.setConfig({
  rangeNames: ['lg', 'md', 'sm', 'xs'],
  breakpoints: [1200, 960, 768]
});

class App extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      panelSize: {
        width: 0,
        height: 0
      },
      expanded: false
    };
  }

  componentDidMount() {
    attachResizeEvent(this.panel, this.onPanelResize, this);
    this.onMount(() => this.setState({
      panelSize: {
        width: this.panel.offsetWidth,
        height: this.panel.offsetHeight
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

  onExpand() {
    this.setState({
      expanded: true
    });
  }

  onCollapse() {
    this.setState({
      expanded: false
    });
  }

  render() {
    const { responsive: {
      rangeName,
      screenWidth,
      orientation
    } } = this.props;

    const {
      expanded,
      panelSize
    } = this.state;

    return (
      <div className="responsive_demo">
        <div className="console">
          <span className="label">{rangeName}</span> <span className="label">{`${screenWidth}px`}</span> <span className="label">{orientation}</span>
        </div>
        <div
          className={classNames('resize', expanded ? 'expanded' : 'collapsed')}
          ref={(c) => { this.panel = c; }}
        >
          <div className="buttons">
            <Button type="primary" size="sm" onClick={() => { this.onExpand(); }}>Expand</Button>
            <Button type="primary" size="sm" onClick={() => { this.onCollapse(); }}>Collapse</Button>
          </div>
          {
            panelSize &&
            <div className="console">
              <span className="label">Width:{`${panelSize.width}px`}</span>
              <span className="label">Height:{`${panelSize.height}px`}</span>
            </div>
        }
        </div>
      </div>
    );
  }
}

export default withResponsiveProvider(App);
