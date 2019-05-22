import React from 'react';
import Breadcrumb from 'src/components/Breadcrumb';
import BreadcrumbItem from 'src/components/Breadcrumb/Item';
import BreadscrumbMd from 'doc/api/components/Breadcrumb/Breadscrumb.md';
import DemoPage from '../../App/components/DemoPage';
import pickProps from '../../App/utils/pickProps';
import initSettings from './initSettings';

export default class Page extends DemoPage {
  static meta = {
    name: 'Breadcrumb',
    documents: [BreadscrumbMd],
    icon: 'icon-angle-double-right',
    description: 'This example demonstrates the features of Breadcrumb.'
  }

  getInitSettings() {
    return initSettings;
  }

  renderContent() {
    const { settings } = this.state;
    const props = pickProps(settings, ['separator']);

    return (
      <div>
        <Breadcrumb {...props}>
          <BreadcrumbItem href="/anetdev02">anetdev02</BreadcrumbItem>
          <BreadcrumbItem href="/anetdev02/servlet">servlet</BreadcrumbItem>
          <BreadcrumbItem>servlet</BreadcrumbItem>
        </Breadcrumb>
      </div>
    );
  }
}
