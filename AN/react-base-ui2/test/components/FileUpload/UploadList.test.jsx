import React from 'react';
import { mount } from 'enzyme';
import UploadList from 'src/components/FileUpload/UploadList';

const props = {
  showRemoveIcon: true,
  errorMessage: 'errorMessage',
  items: [{
    lastModified: 1520389059000,
    lastModifiedDate: '2018-03-07T02:17:39.000Z',
    name: 'image.png',
    size: 151648,
    type: 'image/png',
    uid: 'an-upload6',
    response: {
      headers: {
        response_code: '0000',
        response_message: 'Successful'
      },
      body: {
        status: 'success'
      }
    },
    percent: 80,
    originFileObj: {
      uid: 'an-upload6'
    },
    status: 'uploading'
  }, {
    uid: 'an-upload5',
    name: 'iscroll.js',
    status: 'error',
    errorInfo: 'Cannot upload file because the file type is not allowed.'
  }, {
    uid: 'an-upload4',
    name: '高性能JavaScript.pdf',
    status: 'error',
    errorInfo: 'This file is larger than max size allowed of 1MB.'
  }, {
    uid: 'an-upload52323',
    name: 'iscroll2323.js',
    status: 'error',
    errorInfo: ''
  }, {
    uid: 'an-upload5233333dd23',
    name: 'iscroll23222323.js',
    status: 'done',
    errorInfo: ''
  }, {
    uid: 'an-upload5233333dd24',
    name: 'iscroll23222323.js',
    status: 'uploading',
    errorInfo: ''
  }],
  onRemove: jest.fn(),
  deleteFile: jest.fn()
};

const setup = initProps => mount(<UploadList {...initProps} />);

describe('src/components/FileUpload/UploadList', () => {
  it('UploadList should render without errors', () => {
    const component = setup(props);

    expect(component).toBeTruthy();
    component.find('.icon-close').first().simulate('click');
    expect(props.onRemove).toHaveBeenCalledTimes(1);
  });

  it('UploadList items is [] should render without errors', () => {
    const component = setup({ ...props, items: [] });
    expect(component.find('div')).toHaveLength(0);

    const component1 = setup({ ...props, errorMessage: '' });
    expect(component1.find('.an-upload-list-error')).toHaveLength(0);
  });
});

