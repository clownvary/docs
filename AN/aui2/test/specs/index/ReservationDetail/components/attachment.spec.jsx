import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import FileGallery from 'react-base-ui/lib/components/FileGallery';
import FileUpload from 'react-base-ui/lib/components/FileUpload';
import AttachmentManage from 'index/ReservationDetail/components/AttachmentManage';

const getAttachedFiles = (number = 1) => {
  const attachedFiles = [];
  for (let i = 0; i < number; i++) {
    attachedFiles.push({
      display_name: `121B342B 18k${i}`,
      file_type: 'png',
      uploadedfile_id: 'CA8E0D8D07',
      upload_date: '2018 Mar 19 2:54 PM',
      file_size: '17.49kb'
    });
  }
  return attachedFiles;
};

const props = {
  attachedFiles: fromJS(getAttachedFiles()),
  fetchAttachments: jest.fn(),
  deleteAttachment: jest.fn(() => Promise.resolve({ })),
  attachmentReadonly: false,
  permitStatus: { value: 3 }
};

const getNewFileList = (number = 12) => {
  const newFileList = [];
  for (let i = 0; i < number; i++) {
    newFileList.push({ name: `fileName-${i}.png` });
  }
  return newFileList;
};

const setup = initProps => mount(<AttachmentManage {...initProps} />);

it('AttachmentManage should render without errors', () => {
  const component = setup(props);
  expect(component).toBeTruthy();
  expect(component.find('.an-file-gallery')).toHaveLength(1);
  expect(component.find('.an-file-gallery-item-name')).toHaveLength(1);
  expect(component.find('.an-file-gallery-item-name').at(0).text()).toEqual('121B342B 18k0.png');

  const openModalButton = component.find('.attachment-header span').at(1);
  openModalButton.simulate('click');
  const FileGalleryCom = component.find(FileGallery);
  FileGalleryCom.node.props.deleteFile(1);
  expect(FileGalleryCom).toHaveLength(1);
  expect(component.find(FileUpload)).toHaveLength(1);

  component.node.onBeforeUpload(getNewFileList(10));
  const newProps = { ...props, attachedFiles: fromJS(getAttachedFiles(9)) };
  component.setProps(newProps);
  component.node.onBeforeUpload(getNewFileList(10));
  expect(component.find('.icon-times-circle')).toHaveLength(1);
});

it('AttachmentManage event methods should without errors', () => {
  const newProps = { ...props, attachedFiles: fromJS([]) };
  const component = setup(newProps);
  component.node.onBeforeUpload(getNewFileList());
  component.node.onBeforeUpload(getNewFileList(10));
  component.node.onBeforeUpload(getNewFileList(9));

  const newFileListOne = [
    { name: 'fileName.zip', uid: 1, size: 100 },
    { name: 'fileName.zip', uid: 2, size: 100 },
    { name: 'fileName1.png', uid: 3, size: 10000000 },
    { name: 'fileName2.png', uid: 3, size: 100 }
  ];
  component.node.onBeforeUpload(newFileListOne);
  const fileListInfo = {
    fileList: [{
      response: {
        headers: {
          response_code: '1291',
          response_message: 'error message'
        }
      }
    }]
  };
  component.node.handleChange(fileListInfo);
  component.node.onDeleteAttachment(0);
  component.node.onClose();
});

