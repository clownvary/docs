import React from 'react';
import map from 'lodash/map';
import { ClientSource } from 'src/common/data';
import ClientSourceMd from 'doc/api/common/data/ClientSource.md';
import DemoPage from '../../App/components/DemoPage';
import pickProps from '../../App/utils/pickProps';
import initSettings from './initSettings';

export default class Page extends DemoPage {
  static meta = {
    name: 'ClientSource',
    icon: 'icon-magic',
    documents: [ClientSourceMd],
    description: 'This example demonstrates the features of ClientSource class.'
  }

  constructor() {
    super();

    const data = map(Array(234), (d, i) => ({
      text: `Text${i}`,
      value: `Value_${i}`
    }));

    this.dataSource = new ClientSource(data, 10);
    this.state.loading = true;
    this.state.page = null;

    this.dataSource.getPage(1).then((page) => {
      this.setState({
        loading: false,
        page
      });
    });
  }

  getInitSettings() {
    return initSettings;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.loading !== nextState.loading) {
      return true;
    }
    const { filter, pageNumber } = pickProps(this.state.settings);
    const { filter: nextFilter, pageNumber: nextPageNumber } = pickProps(nextState.settings);

    if (filter !== nextFilter || pageNumber !== nextPageNumber) {
      if (filter !== nextFilter) {
        if (nextFilter) {
          const filterFunc = o => (o.text || '').toLowerCase().indexOf(nextFilter) >= 0;
          this.dataSource.filter(filterFunc);
        } else {
          this.dataSource.clearFilter();
        }
      }

      this.setState({ loading: true });
      this.dataSource.getPage(nextPageNumber).then((page) => {
        this.setState({
          loading: false,
          page
        });
      });

      return false;
    }

    return true;
  }

  renderContent() {
    const { loading, page } = this.state;

    return (
      <div>
        {loading ? (
          <h3>Loading</h3>
      ) : (
        <div>
          <h5>Total Records: {page.totalRecords}</h5>
          <h5>Page Size: {page.pageSize}</h5>
          <h5>Pages: {page.pageCount}</h5>
          <h5>Current Page: {page.pageNumber}</h5>
          {page.error && (<h5>Error: {page.error}</h5>)}
          <ul>
            {page.data.map((row, index) => (
              <li key={index}>
                <span>{row.value} : {row.text}</span>
              </li>
          ))}
          </ul>
        </div>
      )}
      </div>
    );
  }
}
