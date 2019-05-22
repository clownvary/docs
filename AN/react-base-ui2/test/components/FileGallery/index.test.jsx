import React from 'react';
import { mount } from 'enzyme';
import FileGallery from 'src/components/FileGallery';
import DropdownMenu from 'src/components/FileGallery/DropdownMenu';

const data = [
  { name: '', url: 'http://sdfasf' },
  { name: 'Free Textbooks with a long long long long long n3223sdfsadf sadf', url: 'http://sdfasf' },
  { name: 'Free Te23xtbooks for Management 32', url: 'http://sdfasf' },
  { name: 'Free Text32books for Management 233', url: 'http://sdfasf' }
];

const props = {
  readonly: false,
  items: data,
  deleteFile: jest.fn()
};

const setup = initProps => mount(<FileGallery {...initProps} />);

it('FileGallery should render without errors', () => {
  const component = setup({ items: '' });

  expect(component).toBeTruthy();
  expect(component.find('.an-file-gallery')).toHaveLength(0);
});

it('FileGallery should render without errors', () => {
  const component = setup(props);

  expect(component.find('.an-file-gallery')).toHaveLength(1);
  const DropdownMenuComponent = component.find(DropdownMenu);
  DropdownMenuComponent.node.props.deleteFile();
  DropdownMenuComponent.node.props.download({ url: 'http://sdfasf' });
  expect(props.deleteFile).toHaveBeenCalledTimes(1);
});
