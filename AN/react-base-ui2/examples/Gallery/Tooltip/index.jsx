import React from 'react';
import Tooltip from 'src/components/Tooltip';
import { Dock, Trigger, Theme } from 'src/consts';
import DemoPage from '../../App/components/DemoPage';
import pickProps from '../../App/utils/pickProps';
import initSettings, { onBuild, tooltipBuilded } from './initSettings';

/* eslint-disable max-len */
export default class Page extends DemoPage {
  static meta = {
    name: 'Tooltip',
    icon: 'icon-stack-exchange',
    description: 'This example demonstrates the features of Tooltip.'
  }

  constructor(props) {
    super(props);
    this.onOpen = this.onOpen.bind(this);
    this.onResize = this.onResize.bind(this);
  }

  getInitSettings() {
    return initSettings;
  }

  onOpen() {
    this.log('Tooltip opened after the Tooltip component mounted.');
  }

  onResize() {
    this.log('Tooltip resized.');
  }

  onSettingChange(e) {
    super.onSettingChange(e);

    // Close the tooltip which is instantiated by calling APIs
    Tooltip.close();

    if (tooltipBuilded) {
      // Update the global tooltip settins and rebuild the tooltips which use the global settings.
      onBuild(e.settings);
    }
  }

  renderContent() {
    const { settings } = this.state;
    const {
      className,
      theme,
      showShadow,
      style,
      dockStyle,
      content
    } = pickProps(
      settings,
      ['className', 'content', 'dockStyle', 'showShadow', 'theme', 'style']
    );
    const tooltipTargetStyle = {
      backgroundColor: 'rgba(64, 176, 220, .7)',
      height: '100px',
      width: '100px',
      display: 'inline-block',
      marginRight: '10px',
      verticalAlign: 'middle',
      color: '#fff',
      padding: '5px',
      borderRadius: '5px'
    };

    return (
      <div className="tooltip-sample-page">
        Tooltip component relative to the document.
        <Tooltip
          className={className}
          theme={theme}
          showShadow={showShadow}
          style={style}
          dockStyle={dockStyle}
          content={content}
          onOpen={this.onOpen}
          onResize={this.onResize}
        />

        <h5>Click the buttons of the Actions section in the SETTINGS panel to build the Tooltips for the following elements.</h5>
        <div>
          <span
            id="testTooltipAPI"
            className="tooltip-sample tooltip-selector"
            style={tooltipTargetStyle}
          >
            Customer selector
          </span>
          <span
            className="tooltip-sample"
            style={tooltipTargetStyle}
            data-tooltip
          >
            Default selector
          </span>
          <span
            className="tooltip-sample"
            style={tooltipTargetStyle}
            data-tooltip
            data-tooltip-trigger={Trigger.CLICK}
            data-tooltip-content="Customer Tooltip Content the arrow=RIGHT_TOP"
            data-tooltip-dockstyle={Dock.RIGHT_TOP}
            data-tooltip-distance="0"
            data-tooltip-theme={Theme.DARK}
          >
            Click to show tooltip
          </span>
          <span
            style={tooltipTargetStyle}
            className="tooltip-sample"
            data-tooltip
            data-tooltip-trigger={Trigger.FOCUS}
            tabIndex={0}
          >
            Focus to show tooltip
          </span>
        </div>
      </div>
    );
  }

}
