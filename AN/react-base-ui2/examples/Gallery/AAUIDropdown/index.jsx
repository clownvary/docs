import React from 'react';
import { AAUIDropdown } from 'src/components/Dropdown';
import AAUIDropdownMd from 'doc/api/components/Dropdown/AAUIDropdown.md';
import DemoPage from '../../App/components/DemoPage';
import pickProps from '../../App/utils/pickProps';
import initSettings from './initSettings';

const data = [
  { text: 'Junior College', value: 'college' },
  { text: 'Bachelor\'s degree', value: 'bachelor' },
  { text: 'Master\'s degree', value: 'master' },
  { text: 'Master\'s degree1', value: 'master1' },
  { text: 'Master\'s degree2', value: 'master2' },
  {
    text: 'Customer render',
    value: 'customer',
    disabled: true
  }
];

export default class Page extends DemoPage {

  static meta = {
    name: 'AAUI Dropdown',
    icon: 'icon-list-m',
    documents: [AAUIDropdownMd],
    description: 'This example demonstrates the features of AAUIDropdown.'
  }

  getInitSettings() {
    return initSettings;
  }

  onDropdownChange = (value) => {
    this.log(value);
  }


  renderContent() {
    const { settings } = this.state;
    const props = pickProps(settings);
    return (
      <div>
        <p>has footer</p>
        <AAUIDropdown
          style={{ width: 320 }}
          data={data}
          value={-1}
          onChange={dropdownBbj => this.onDropdownChange(dropdownBbj.value)}
          maxHeight={300}
          renderFooter={() => <a>+ Add New Family Member</a>}
          renderItem={(item, status) => (
            <div>
              <a>{item.text}</a>
              <a>status: {status.selected},{status.disabled}</a>
            </div>
          )}
          {...props}
        />

        <p>no footer</p>
        <AAUIDropdown
          style={{ width: 320 }}
          data={data}
          value={-1}
          onChange={dropdownBbj => this.onDropdownChange(dropdownBbj.value)}
          maxHeight={300}
          renderItem={(item, status) => (
            <div>
              <a>{item.text}</a>
              <a>status: {status.selected},{status.disabled}</a>
            </div>
          )}
          {...props}
        />
      </div>
    );
  }
}
