import React from 'react';
import map from 'lodash/map';
import { APICache } from 'src/services/cache';
import DemoPage from '../../App/components/DemoPage';
import pickProps from '../../App/utils/pickProps';
import initSettings from './initSettings';

export default class Page extends DemoPage {
  static meta = {
    name: 'APICache',
    icon: 'icon-magic',
    description: 'This example demonstrates the features of cache service.'
  }

  constructor() {
    super();

    this.apiCache = new APICache(7);
    const data = map(Array(234), (d, i) => ({
      text: `Text${i}`,
      value: `Value_${i}`
    }));

    this.apiCache.init(data);
  }

  getInitSettings() {
    return initSettings;
  }

  renderContent() {
    const { settings } = this.state;
    const props = pickProps(settings);
    const { pageNumber } = props;

    const data = this.apiCache.getPage(pageNumber);

    return (
      <div>
        <h5>Total Records: {this.apiCache.totalRecords}</h5>
        <h5>Page Size: {this.apiCache.pageSize}</h5>
        <h5>Pages: {this.apiCache.pageCount}</h5>
        <h5>Current Page: {pageNumber}</h5>
        <ul>
          {data.map((row, index) => (
            <li key={index}>
              <span>{row.value} : {row.text}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
