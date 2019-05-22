import React from 'react';
import { mount } from 'enzyme';
import DropdownMenu from 'src/components/FileGallery/DropdownMenu';

const props = {
  item: { name: '', url: 'http://sdfasf' },
  fileIndex: 1,
  download: jest.fn(),
  deleteFile: jest.fn()
};

const setup = initProps => mount(<DropdownMenu {...initProps} />);


it('DropdownMenu should render without errors', () => {
  const component = setup(props);

  expect(component).toBeTruthy();
  component.instance().onMenuSelected({ value: 'Delete' });
  expect(props.deleteFile).toHaveBeenCalledTimes(1);
  component.instance().onMenuSelected({ value: 'Download' });
  expect(props.download).toHaveBeenCalledTimes(1);
  component.unmount();
});

it('DropdownMenu readonly equal to true should render without errors', () => {
  const component = setup({ ...props, readonly: true });

  expect(component).toBeTruthy();
});
