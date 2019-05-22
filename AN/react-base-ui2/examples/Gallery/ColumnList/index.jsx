import React from 'react';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import ColumnList from 'src/components/ColumnList';
import ClientSource from 'src/common/data';
import DemoPage from '../../App/components/DemoPage';
import pickProps from '../../App/utils/pickProps';
import initSettings from './initSettings';

import './index.less';

const dataSources = {
  arrayWithId: reduce(
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    (items, char) =>
      items.concat(map('12345', index => ({
        id: `${char}${index}`,
        text: `${char}${index}`,
        icon: 'icon-glass',
        checked: false
      }))),
    []
  ),
  arrayWithoutId: reduce(
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    (items, char) =>
      items.concat(map('12345', index => ({
        text: `${char}${index}`,
        icon: 'icon-smile',
        checked: false
      }))),
    []
  ),
  dataSourceCheckable: new ClientSource(reduce(
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    (items, char) =>
      items.concat(map('12345', index => ({
        id: `${char}${index}`,
        disabled: index === '5',
        text: `${char}${index}`,
        icon: 'icon-adjust',
        checked: false
      }))),
    []
  ), 5),
  dataSourceUncheckable: new ClientSource(reduce(
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    (items, char) =>
      items.concat(map('12345', index => ({
        id: `${char}${index}`,
        text: `${char}${index}`,
        icon: 'icon-cloud'
      }))),
    []
  ), 5)
};

export default class Page extends DemoPage {
  static meta = {
    name: 'ColumnList',
    icon: 'icon-list',
    align: 'center',
    description: 'This example demonstrates the features of List.'
  }

  getInitSettings() {
    return initSettings;
  }

  renderContent() {
    const { settings } = this.state;
    const config = pickProps(settings, Object.keys(initSettings));
    const dataSource = dataSources[config.data];

    return (
      <div className="list_demo">
        <ColumnList
          {...config}
          ref={(list) => { this.list = list; }}
          dataSource={dataSource}
        />
      </div>
    );
  }
}
