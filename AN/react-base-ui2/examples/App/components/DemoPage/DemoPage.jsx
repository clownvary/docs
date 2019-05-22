import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';
import { Tabs, Tab } from 'src/components/Tabs';
import SettingsPanel from '../SettingsPanel';

export default class DemoPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onSettingChange = this.onSettingChange.bind(this);
    this.state = {
      settings: this.getInitSettings(),
      selectTabId: 'example'
    };
  }

  onSettingChange(e) {
    const { settings } = e;
    this.setState({
      settings: cloneDeep(settings)
    });
  }

  getInitSettings() {
    return {};
  }

  log(s) {
    if (this.settingPanel) {
      this.settingPanel.log(s);
    }
  }

  updateSetting(name, value) {
    const { settings } = this.state;
    const spec = settings[name];
    if (spec) {
      spec.value = value;
      this.settingPanel && this.settingPanel.updateField(spec);
    }
  }

  renderSettingsPanel() {
    const { settings } = this.state;
    return (
      <SettingsPanel
        settings={settings}
        onChange={this.onSettingChange}
        ref={(c) => { this.settingPanel = c; }}
      />
    );
  }

  renderContent() {

  }

  render() {
    const { className, showSettingsPanel = true, pageSpec } = this.props;
    const { name, description = '', help = '', align = '', documents = [] } = pageSpec;
    const helpAnchor = help || name;
    const helpUrl = `https://gitlab.dev.activenetwork.com/ActiveNet/react-base-ui/blob/master/doc/api.md#${helpAnchor.replace(' ', '')}`;

    return (
      <div className={classNames('an-demopage', className)}>
        <div className="an-demopage__doc">
          <h1>{name}</h1>
          <span>{description}</span>
          <a href={helpUrl} target="_blank" rel="noopener noreferrer">
            <i className="icon-help-circle-outline help">
              <span>Read more...</span>
            </i>
          </a>
        </div>
        <div className="an-demopage__body">
          <div className="content">
            <Tabs className="an-demopage__tabs" selectedId={this.state.selectTabId}>
              <Tab id="example" panelClass={align} title="Example">{this.renderContent()}</Tab>
              <Tab id="doc" title="Doc">
                {
                  documents.map((d, index) => (
                    <ReactMarkdown key={`${name}_${index}`} className="markdown-body" transformLinkUri={null} escapeHtml={false} source={d} />
                  ))
                }
              </Tab>
            </Tabs>
          </div>
        </div>
        {showSettingsPanel && <div className="an-demopage__settings">
          {this.renderSettingsPanel()}
        </div>
        }
      </div>
    );
  }

}
