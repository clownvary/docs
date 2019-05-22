import React from 'react';
import Dropdown from 'src/components/Dropdown';
import DropdownMd from 'doc/api/components/Dropdown/Dropdown.md';
import DemoPage from '../../App/components/DemoPage';
import pickProps from '../../App/utils/pickProps';
import initSettings from './initSettings';

const data = [
  { text: 'Junior College', value: 'college' },
  { text: 'Bachelor\'s degree which meets the boundary', value: 'bachelor' },
  { text: 'Master\'s degree', value: 'master' },
  { text: 'Doctor\'s degree', value: 'doctor' }
];

export default class Page extends DemoPage {
  static meta = {
    name: 'Dropdown',
    icon: 'icon-list',
    documents: [DropdownMd],
    description: 'This example demonstrates the features of Dropdown.'
  }

  getInitSettings() {
    return initSettings;
  }

  onDropdownChange = (value) => {
    this.log(`onChange ${value}`);
  }

  onMenuHide = (isValueChanged) => {
    this.log(`onMenuHide ${isValueChanged}`);
  }

  renderContent() {
    const { settings } = this.state;
    const props = pickProps(settings);
    return (
      <div>
        <Dropdown
          style={{ width: 220 }}
          data={data}
          onChange={e => this.onDropdownChange(e.value)}
          onMenuHide={e => this.onMenuHide(e)}
          {...props}
        />
        &nbsp;
        <Dropdown
          style={{ width: 220 }}
          data={data}
          onChange={e => this.onDropdownChange(e.value)}
          onMenuHide={e => this.onMenuHide(e)}
          {...props}
        />
      </div>
    );
  }
}
