import React from 'react';
import FileGallery from 'src/components/FileGallery';
import FileGalleryMd from 'doc/api/components/FileGallery/FileGallery.md';
import DemoPage from '../../App/components/DemoPage';

const data = [
  { name: 'Free Textbooks for Management', url: 'http://sdfasf' },
  { name: 'Free Textbooks with a long long long long long n3223sdfsadf sadf', url: 'http://sdfasf' },
  { name: 'Free Te23xtbooks for Management 32', url: 'http://sdfasf' },
  { name: 'Free Text32books for Management 233', url: 'http://sdfasf' }
];

export default class Page extends DemoPage {
  static meta = {
    name: 'FileGallery',
    icon: 'icon-list',
    documents: [FileGalleryMd],
    description: 'This example demonstrates the features of FileGallery.'
  }

  constructor(props) {
    super(props);

    this.state = { ...this.state, items: data };
  }

  deleteFile = (fileIndex) => {
    const { items } = this.state;

    this.setState({ items: items.filter((item, index) => index !== fileIndex) });
  }

  renderContent() {
    return (
      <FileGallery items={this.state.items} deleteFile={this.deleteFile} />
    );
  }
}
