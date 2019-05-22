import React from 'react';
import { attachPopupMenu, clearPopupMenu } from 'src/services/menu';
import DemoPage from '../../App/components/DemoPage';


const items = [
  { text: 'apple', value: 'apple' },
  { text: 'book', value: 'book' },
  { text: 'cat', value: 'cat' },
  { text: 'dog', value: 'dog' },
  { text: 'egg', value: 'egg' }
];

export default class Page extends DemoPage {
  constructor() {
    super();

    this.onMenuSelected = this.onMenuSelected.bind(this);
  }

  static meta = {
    name: 'PopupMenu',
    icon: 'icon-bars',
    align: 'center',
    description: 'This example demonstrates the features of PopupMenu.'
  };

  onMenuSelected(e) {
    this.log(`${e.text} is selected in context ${e.id}`);
  }

  componentDidMount() {
    attachPopupMenu(
      'AddIcon',
      {
        data: items,
        onSelected: this.onMenuSelected
      },
      {
        target: this.addIcon
      }
    );
  }

  componentWillUnmount() {
    clearPopupMenu(this.addIcon);
  }

  getInitSettings() {
    return {};
  }

  renderContent() {
    return (
      <div>
        <span className="label row-label">Click Add</span>
        <i className="icon icon-plus row-icon" ref={(c) => { this.addIcon = c; }} />
      </div>
    );
  }
}
