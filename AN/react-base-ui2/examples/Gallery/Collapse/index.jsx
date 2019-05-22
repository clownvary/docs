import React from 'react';
import Collapse from 'src/components/Collapse';
import Steps from 'src/components/Steps';
import TextArea from 'src/components/TextArea';
import Button from 'src/components/Button';
import CollapseMd from 'doc/api/components/Collapse/Collapse.md';
import PanelMd from 'doc/api/components/Collapse/Panel.md';
import DemoPage from '../../App/components/DemoPage';
import { Form, Group } from '../../App/components/Form';
import pickProps from '../../App/utils/pickProps';
import initSettings from './initSettings';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

export default class Page extends DemoPage {
  static meta = {
    name: 'Collapse',
    icon: 'icon-chevron-down',
    documents: [CollapseMd, PanelMd],
    description: 'This example demonstrates the features of Collapse.'
  }

  constructor(props) {
    super(props);

    this.state = Object.assign({}, this.state, { activeKey: ['1'], twoActiveKey: ['0'] });
  }

  getInitSettings() {
    return initSettings;
  }

  onChange = (activeKey) => {
    // this.setState({
    //   activeKey: [...activeKey]
    // });

    this.log(activeKey);
  }

  twoOnChange = (twoActiveKey) => {
    this.setState({
      twoActiveKey: [...twoActiveKey]
    });

    this.log(twoActiveKey);
  }


  renderHeader({ onToggleClick }) {
    return (
      <div>
        <span
          className="self-button"
          onClick={() => onToggleClick()}
        >
          click
        </span>
        self setting title,
        <span style={{ marginLeft: 30 }}>delete</span>
      </div>
    );
  }

  renderFrom() {
    return (
      <Form title="User Entries">
        <Group>
          <span className="field-label">First Name:</span>
          <span className="field">
            <input />
          </span>
        </Group>
        <Group>
          <span className="field-label">Last Name:</span>
          <span className="field">
            <input />
          </span>
        </Group>
        <Group>
          <span className="field-label">Address:</span>
          <span className="field">
            <input />
          </span>
        </Group>
      </Form>
    );
  }

  getDataSource() {
    return [
      {
        Header: this.renderHeader,
        content: text,
        ariaLableCollapse: 'Section 1 expand detail clickable arrow',
        ariaLableExpand: 'Section 1 Collapse detail clickable arrow'
      },
      {
        Header: 'Rec Alcohol Permit-Area II',
        content: text,
        ariaLableCollapse: 'Section 2 expand detail clickable arrow',
        ariaLableExpand: 'Section 2 Collapse detail clickable arrow'
      },
      {
        Header: 'Permit Approval - CUPF to Parks',
        content: text,
        disabled: true,
        ariaLableCollapse: 'Section 3 expand detail clickable arrow',
        ariaLableExpand: 'Section 3 Collapse detail clickable arrow'
      },
      {
        Header: 'A CC site Manager  Approval',
        content: this.renderFrom(),
        ariaLableCollapse: 'Section 4 expand detail clickable arrow',
        ariaLableExpand: 'Section 4 Collapse detail clickable arrow'
      }
    ];
  }

  getStepsDataSource() {
    return [
      {
        title: this.renderStepItemTitle(),
        status: 'finish'
      },
      {
        title: this.renderStepItemTitleTwo(),
        status: 'process'
      },
      {
        title: 'In process',
        status: 'process',
        description: this.renderStepItemForm()
      },
      {
        title: 'Central Division Manager Approval',
        description: 'Comment: It was a humorously perilous business for both of us. For, before we proceed further, it must be said that the monkey-rope was fast at both ends; fast to Queequeg\'s broad canvas belt, and fast to my narrow leather one.'
      }
    ];
  }

  renderStepItemTitle() {
    return (
      <div className="step-item-title aaui-flex afx-xl-mg-12">
        <span className="afx-col afx-xl-6-12">A CC site Manager  Approval</span>
        <span className="afx-col afx-xl-4-12">Li Jessie</span>
      </div>
    );
  }

  renderStepItemTitleTwo() {
    return (
      <div className="step-item-title aaui-flex afx-xl-mg-12">
        <span className="afx-col afx-xl-6-12">A CC site Manager  Approval</span>
        <span className="change-custom afx-col afx-xl-4-12">Li Jessie <i className="icon icon-exchange" /> zaeck</span>
      </div>
    );
  }

  renderSteps() {
    return <Steps direction="vertical" dataSource={this.getStepsDataSource()} />;
  }

  renderStepItemForm() {
    return (
      <div>
        <TextArea
          className="input"
          rows="4"
          placeholder="Leave a comment…"
        />
        <div className="step-item-button-group">
          <Button>Deny</Button>
          <Button type="primary">Approve</Button>
        </div>
      </div>
    );
  }

  renderCollapseHeader({ onToggleClick }) {
    return (
      <div className="self-collapse-header" onClick={e => e.stopPropagation()}>
        <div className="icon-box">
          <i className="icon-check-thin" />
        </div>
        <div className="header-content aaui-flex afx-xl-mg-12">
          <span className="header-content-title afx-col afx-xl-6-12">
            Permit Approval - CUPF to Parks
            <i
              className="icon icon-chevron-down"
              tabIndex="0"
              onClick={() => onToggleClick()}
            />
          </span>
          <span className="custom-title afx-col afx-xl-4-12">Birthday part</span>
          <span className="afx-col afx-xl-2-12 delete-container"><i className="icon icon-delete-m" /></span>
        </div>
      </div>
    );
  }

  getCollapaseData() {
    return [{
      header: this.renderCollapseHeader(),
      content: this.renderSteps()
    }];
  }

  renderContent() {
    const { settings, twoActiveKey } = this.state;
    const props = pickProps(settings, ['multiple', 'isPanelHeaderFocusable']);

    return (
      <div className="collapse-example">
        <div>
          <Collapse
            className="collapse-test"
            multiple={props.multiple}
            onChange={this.twoOnChange}
            activeKey={twoActiveKey}
            isPanelHeaderFocusable={props.isPanelHeaderFocusable}
          >
            <Collapse.Panel Header={this.renderCollapseHeader}>
              {this.renderSteps()}
            </Collapse.Panel>
          </Collapse>
        </div>

        <Collapse
          multiple={props.multiple}
          dataSource={this.getDataSource()}
          onChange={this.onChange}
          activeKey={this.state.activeKey}
          isPanelHeaderFocusable={props.isPanelHeaderFocusable}
        />
      </div>

    );
  }
}
