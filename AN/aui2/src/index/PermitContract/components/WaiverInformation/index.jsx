import React from 'react';
import { findDOMNode } from 'react-dom';
import UIComponent from 'shared/components/UIComponent';
import CollapsePanel from 'react-base-ui/lib/components/CollapsePanel';
import createColResizable from 'react-base-ui/lib/helper/colResizable';
import Waiver from './Waiver';
import Information from './Information';
import './index.less';

class WaiverInformation extends UIComponent {

  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  handleExpand = () => {
    if (this._refs.infoTable) {
      createColResizable(findDOMNode(this._refs.infoTable));
    }
    if (this._refs.waiverTable) {
      createColResizable(findDOMNode(this._refs.waiverTable));
    }
  }

  toggleState = () => this.setState({ expanded: !this.state.expanded });

  render() {
    const { waivers, infos } = this.props;
    const title = 'Waivers and Information';
    const ariaLabel = `${title} ${this.state.expanded ? 'collapse' : 'expand'} detail clickable arrow`;
    return (
      <CollapsePanel
        title={title}
        ariaLabel={ariaLabel}
        expanded={this.state.expanded}
        className="section-container waiver-information"
        onExpand={() => { this.handleExpand(); this.toggleState(); }}
        onCollapse={this.toggleState}
      >
        {infos && infos.length > 0 && (
          <div>
            <Information infos={infos} ref={(t) => { this._refs.infoTable = t; }} />
          </div>
        )}
        {waivers && waivers.length > 0 && (
          <div>
            <Waiver waivers={waivers} ref={(t) => { this._refs.waiverTable = t; }} />
          </div>
        )}
      </CollapsePanel>
    );
  }
}

export default WaiverInformation;
