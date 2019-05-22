import React from 'react';
import Tag from 'src/components/Tag';
import { TagType, TagSize } from 'src/components/Tag/consts';
import TagMD from 'doc/api/components/Tag/Tag.md';
import DemoPage from '../../App/components/DemoPage';

import './index.less';

export default class Page extends DemoPage {
  static meta = {
    name: 'Tag',
    icon: 'icon-tag',
    documents: [TagMD],
    description: 'This example demonstrates the features of Tag.'
  };

  renderContent() {
    return (
      <div>
        <div className="example-tag-container">
          <div><Tag closable size={TagSize.SMALL}>small</Tag></div>
          <div><Tag closable>default</Tag></div>
          <div><Tag closable size={TagSize.LARGE}>large</Tag></div>
          <div><Tag closable size={TagSize.EXTRA_LARGE}>extra large</Tag></div>
        </div>
        <div className="example-tag-container">
          <div><Tag>default</Tag></div>
          <div><Tag type={TagType.PENDING}>pending</Tag></div>
          <div><Tag type={TagType.ERROR}>error</Tag></div>
        </div>
      </div>
    );
  }
}
