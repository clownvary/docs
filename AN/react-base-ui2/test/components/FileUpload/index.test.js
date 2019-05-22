import React from 'react';
import { mount } from 'enzyme';
import FileUpload from 'src/components/FileUpload';
import AjaxUploader from 'src/components/FileUpload/AjaxUploader';
import UploadList from 'src/components/FileUpload/UploadList';
import Modal from 'src/components/Modal';

const props = {
  action: 'URL.fileUpload',
  multiple: true,
  drag: true,
  name: 'filename',
  uploadElemId: 'upload_permit_files',
  visible: true,
  cancelModalContent: 'Are you sure you want to cancel the upload?',
  uploadListConfig: {
    className: 'permit-upload-list',
    errorMessage: 'errorMessage'
  },
  fileList: [{
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
  }],
  onBeforeUpload: jest.fn(),
  onChange: jest.fn(),
  onClose: jest.fn(),
  onRemove: jest.fn()
};

const setup = (initProps, children) => mount(<FileUpload {...initProps} >{children}</FileUpload>);

describe('src/components/FileUpload', () => {
  it('FileUpload should render without errors', () => {
    const component = setup(props, 'children');
    component.instance().onFileDrop({ type: 'file' });

    component.find(AjaxUploader).node.props.onStart({
      lastModified: 23232323,
      lastModifiedDate: '2019-12-1',
      name: 'filename.png'
    });

    component.find(AjaxUploader).node.props.onError({}, {}, {});
    component.find(AjaxUploader).node.props.onError({}, {}, { uid: 'an-upload6' });

    component.find(AjaxUploader).node.props.onProgress({}, {});
    component.find(AjaxUploader).node.props.onProgress({}, { uid: 'an-upload6' });

    component.find(AjaxUploader).node.props.onSuccess({}, {});
    component.find(AjaxUploader).node.props.onSuccess(JSON.stringify({
      headers: {
        response_code: '0000',
        response_message: 'Successful'
      },
      body: {}
    }), { uid: 'an-upload6' });

    component.find(UploadList).node.props.onRemove({});
    component.find(UploadList).node.props.onRemove({
      uid: '323'
    });

    component.find(Modal).node.props.onClose({
      uid: '323'
    });

    component.setProps({ fileList: '' });
  });

  it('FileUpload drag is false should render without errors', () => {
    setup({ ...props, drag: false, fileList: [] }, 'children');
    setup({
      ...props,
      drag: false,
      fileList: [{
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
      }] },
      'children'
    );
  });
});

