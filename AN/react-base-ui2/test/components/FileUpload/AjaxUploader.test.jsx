import React from 'react';
import { mount } from 'enzyme';
import AjaxUploader from 'src/components/FileUpload/AjaxUploader';

const props = {
  prefixCls: 'an-upload-drag',
  action: 'http://test-url',
  onBeforeUpload: files => files,
  uploadElemId: 'test-upload',
  onRemove: jest.fn(),
  onStart: jest.fn(),
  withCredentials: true,
  headers: {},
  data: () => ({ name: 'testData' })
};

const setup = initProps => mount(<AjaxUploader {...initProps} />);

describe('src/components/FileUpload/AjaxUploader', () => {
  it('AjaxUploader should render without errors', () => {
    const component = setup(props);
    component.instance().onClick({ target: { getAttribute: () => '' } });
    component.instance().onClick({ target: { getAttribute: () => 'test-upload' } });
    component.instance().onKeyDown({ key: 'Enter', target: { getAttribute: () => 'test-upload' } });
    component.instance().onKeyDown({ key: 'T', target: { getAttribute: () => 'test-upload' } });
    component.instance().onChange({ target: { files: [{}] } });

    component.instance().onFileDrop({ type: 'dragover', dataTransfer: { files: [{}] }, preventDefault: () => {} });
    component.instance().onFileDrop({ dataTransfer: { files: [{}] }, preventDefault: () => {} });
    component.instance().post({ uid: 'adc' });

    expect(component.find('.an-upload-drag-container')).toHaveLength(1);
    expect(component.find('input')).toHaveLength(1);
    component.unmount();
  });

  it('AjaxUploader onBeforeUpload is null should render without errors', () => {
    const component = setup({ ...props, onBeforeUpload: '', data: '' });
    component.instance().post({ uid: 'adc' });
    component.instance().onChange({ target: { files: [{}] } });
  });
});

