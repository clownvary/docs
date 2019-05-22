import React from 'react';
import findIndex from 'lodash/findIndex';
import indexOf from 'lodash/indexOf';
import Button from 'src/components/Button';
import FileUpload from 'src/components/FileUpload';
import FileUploadMd from 'doc/api/components/FileUpload/FileUpload.md';
import { count } from 'react-base-ui/src/utils/dataAccess';
import DemoPage from '../../App/components/DemoPage';
import { Form } from '../../App/components/Form';

export default class Page extends DemoPage {
  static meta = {
    name: 'FileUpload',
    icon: 'icon-file-m',
    documents: [FileUploadMd],
    description: 'This example demonstrates the features of FileUpload.'
  }

  constructor(props) {
    super(props);

    this.state = { ...this.state, ...{ visible: false, fileList: [], errorMessage: '' } };
    this.content = this.content.bind(this);
  }


  handleChange = (info) => {
    let fileList = info.fileList;
    fileList = fileList.map((file) => {
      if (file.response) {
        file.errorInfo = file.response.msg;
      }
      return file;
    });

    this.setState({ fileList });
  }

  getFileItems() {
    const fileItems = [{ name: 'permit', url: 'www.anet.com' }].map(item => ({
      name: item.name,
      url: item.url
    }));

    return fileItems;
  }

  onBeforeUpload = (newFileList) => {
    const { fileList: nowFileList } = this.state;
    const list = nowFileList.filter(fileItem => fileItem.status !== 'error');
    const fileItems = this.getFileItems();
    const nowFileListConut = count(list);
    const newFileListCount = count(newFileList);
    const attachedFilesCount = count(fileItems);

    if ((nowFileListConut + attachedFilesCount === 0 && newFileListCount > 10) ||
      (attachedFilesCount + nowFileListConut) >= 10) {
      this.setState({ errorMessage: 'You can upload only 10 files at most.' });
      return false;
    } else if ((attachedFilesCount > 0 || nowFileListConut > 0) &&
      (attachedFilesCount + nowFileListConut + newFileListCount) > 10) {
      const availableCount = 10 - attachedFilesCount - nowFileListConut;
      this.setState({
        errorMessage: `You can upload only 10 files at most, please choose no more than ${availableCount} ${availableCount === 1 ? 'file' : 'files'} to upload.`
      });
      return false;
    }

    const availableFileList = [];
    this.setState({ errorMessage: '' });

    newFileList.forEach((file) => {
      if (findIndex(nowFileList.concat(fileItems), { name: file.name }) !== -1) {
        nowFileList.unshift({
          uid: file.uid,
          name: file.name,
          status: 'error',
          errorInfo: 'A record already exists with this name. Please choose another name.'
        });
        return false;
      }

      const availableFileType = ['pdf', 'docx', 'doc', 'png', 'jpg', 'jpeg'];

      const fileName = file.name;
      const fileType = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();

      if (indexOf(availableFileType, fileType) === -1) {
        nowFileList.unshift({
          uid: file.uid,
          name: file.name,
          status: 'error',
          errorInfo: 'Cannot upload file because the file type is not allowed.'
        });
        return false;
      }

      if (file.size / 1024 / 1024 > 1) {
        nowFileList.unshift({
          uid: file.uid,
          name: file.name,
          status: 'error',
          errorInfo: 'This file is larger than max size allowed of 1MB'
        });

        return false;
      }

      availableFileList.push(file);
      return true;
    });

    this.setState({ fileList: [...nowFileList] });

    return availableFileList;
  }

  renderUploadError() {
    const { errorMessage, fileList } = this.state;
    if (errorMessage && !fileList.length) {
      return (
        <div className="an-permit-upload-error">
          <span className="icon icon-times-circle" />
          <span>You can upload only 10 files at most</span>
        </div>
      );
    }

    return null;
  }
  content(triggerUpload) {
    return (<div>
      {this.renderUploadError()}
      <div className="an-permit-upload-description">
        <i className="icon icon-cloud-upload" />

        <p className="description-note">Note：The attached files will be removed from the
          permit 90 days after the last reservationdate or when the
          permit is canceled or denied.
          </p>
        <p className="description-drop-note">Drop files here to upload</p>
        <p className="description-or">or</p>
        <Button type="strong" onClick={e => triggerUpload(e)} >Browse</Button>
      </div>
    </div>);
  }

  renderContent() {
    const { visible, fileList, errorMessage } = this.state;
    const uploadInitSeting = {
      action: '//jsonplaceholder.typicode.com/posts/',
      onChange: this.handleChange,
      multiple: true,
      drag: true,
      name: 'file3443434',
      data: { test: 'data', age: 30 },
      uploadElemId: 'upload_permit_files',
      cancelModalContent: 'you sure you want to cancel the upload?',
      visible,
      onClose: () => this.setState({ visible: false }),
      uploadListConfig: {
        className: 'permit-upload-list',
        errorMessage
      },
      onBeforeUpload: this.onBeforeUpload,
      renderContent: this.content
    };

    return (
      <Form title="Upload">
        <Button
          onClick={() => this.setState({ visible: true, fileList: [], errorMessage: '' })}
        >
          upload
        </Button>
        <FileUpload className={`an-permit-upload ${fileList.length ? 'has-upload-list' : ''}`} {...uploadInitSeting} fileList={fileList} />
      </Form>
    );
  }
}
