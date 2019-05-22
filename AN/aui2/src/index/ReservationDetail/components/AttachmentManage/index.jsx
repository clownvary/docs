import React from 'react';
import findIndex from 'lodash/findIndex';
import indexOf from 'lodash/indexOf';
import FileUpload from 'react-base-ui/lib/components/FileUpload';
import FileGallery from 'react-base-ui/lib/components/FileGallery';
import Button from 'react-base-ui/lib/components/Button';
import { count } from 'react-base-ui/lib/utils/dataAccess';
import { confirm } from 'react-base-ui/lib/services/dialog';
import { isCancelled, isDenied } from '../../utils/permitStatus';
import URL from '../../urls';

import './index.less';

export default class AttachmentManage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showFileUploadModal: false,
      attachmentList: [],
      errorMessage: ''
    };
  }

  componentDidMount() {
    this.props.fetchAttachments();
  }

  onClose = () => {
    this.setState({ showFileUploadModal: false, attachmentList: [], errorMessage: '' });
    this.props.fetchAttachments();
  }

  onBeforeUpload = (newAttachmentList) => {
    const { attachmentList } = this.state;
    const list = attachmentList.filter(fileItem => fileItem.status !== 'error');
    const attachmentItems = this.getAttachmentItems();

    const nowAttachmentListConut = count(list);
    const newAttachmentListCount = count(newAttachmentList);
    const attachedListCount = count(attachmentItems);

    if ((nowAttachmentListConut + attachedListCount === 0 && newAttachmentListCount > 10) ||
      (attachedListCount + nowAttachmentListConut) >= 10) {
      this.setState({ errorMessage: 'You can upload only 10 files at most.' });
      return false;
    } else if ((attachedListCount > 0 || nowAttachmentListConut > 0) &&
      (attachedListCount + nowAttachmentListConut + newAttachmentListCount) > 10) {
      const availableCount = 10 - attachedListCount - nowAttachmentListConut;

      this.setState({
        errorMessage: `You can upload only 10 files at most, please choose no more than ${availableCount} ${availableCount === 1 ? 'file' : 'files'} to upload.`
      });
      return false;
    }

    this.setState({ errorMessage: '' });
    const availableAttachmentList = [];

    newAttachmentList.forEach((file) => {
      if (findIndex(attachmentList.concat(attachmentItems), { name: file.name }) !== -1) {
        attachmentList.unshift({
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
        attachmentList.unshift({
          uid: file.uid,
          name: file.name,
          status: 'error',
          errorInfo: 'Cannot upload file because the file type is not allowed.'
        });
        return false;
      }

      if (file.size / 1024 / 1024 > 1) {
        attachmentList.unshift({
          uid: file.uid,
          name: file.name,
          status: 'error',
          errorInfo: 'This file is larger than max size allowed of 1MB.'
        });

        return false;
      }

      availableAttachmentList.push(file);
      return true;
    });

    this.setState({ attachmentList });

    return availableAttachmentList;
  }

  onDeleteAttachment(index) {
    const { attachedFiles, deleteAttachment, removeAttachedFile } = this.props;
    const id = attachedFiles.getIn([index, 'uploadedfile_id']);

    deleteAttachment(id).then(() => {
      removeAttachedFile(id);
    });
  }

  getAttachmentItems() {
    const { attachedFiles } = this.props;
    const fileItems = attachedFiles.map(item => ({
      name: `${item.get('display_name')}.${item.get('file_type')}`,
      url: `${item.get('akamai_directory')}servlet/downloadFileWithAccess.sdi?attachment=true&uploadedfile_id=${item.get('uploadedfile_id')}`
    }));

    return fileItems.toJS();
  }

  handleChange = ({ fileList: attachmentList }) => {
    attachmentList = attachmentList.map((file) => {
      /* istanbul ignore else */
      if (file.response && file.response.headers.response_code !== '0000') {
        file.errorInfo = file.response.headers.response_message;
        file.status = 'error';
      }
      return file;
    });

    this.setState({ attachmentList });
  }

  showFileUploadModal = () => {
    this.setState({
      showFileUploadModal: !this.state.showFileUploadModal
    });
  }

  confirmDeleteAttachment = (index) => {
    const defaultOptions = {
      title: 'Delete File',
      showCancel: true,
      cancelText: 'Cancel',
      confirmText: 'Delete'
    };

    confirm(
      (<div>
        <p> Are you sure you want to delete this attachment? </p>
      </div>
      ),
      { ...defaultOptions }
    ).then(() => {
      this.onDeleteAttachment(index);
    });
  }

  renderUploadError() {
    const { errorMessage, attachmentList } = this.state;

    if (errorMessage && (count(attachmentList) === 0)) {
      return (
        <div className="an-permit-upload-error">
          <span className="icon icon-times-circle" />
          <span>{errorMessage}</span>
        </div>
      );
    }

    return null;
  }

  renderContent = triggerUpload => (
    <div>
      {this.renderUploadError()}
      <div className="an-permit-upload-description">
        <i className="icon icon-cloud-upload" />
        <p className="description-drop-note">Drop files here to upload</p>
        <p className="description-or">or</p>
        <Button type="strong" onClick={e => triggerUpload(e)}>Browse</Button>
      </div>
    </div>
  );

  render() {
    const { showFileUploadModal, attachmentList, errorMessage } = this.state;
    const { permitID, sdireqauth, attachmentReadonly,
      permitStatus: { value: permitStatusValue } } = this.props;
    const attachmentItems = this.getAttachmentItems();
    const uploadInitSetting = {
      action: URL.fileUpload,
      onChange: this.handleChange,
      multiple: true,
      drag: true,
      name: 'filename',
      data: { permit_id: permitID, sdireqauth },
      uploadElemId: 'upload_permit_files',
      visible: showFileUploadModal,
      onClose: this.onClose,
      cancelModalContent: 'Are you sure you want to cancel the upload?',
      uploadListConfig: {
        className: 'permit-upload-list',
        errorMessage
      },
      onBeforeUpload: this.onBeforeUpload,
      renderContent: this.renderContent
    };
    const isReadonly = attachmentReadonly ||
      (isCancelled(permitStatusValue) || isDenied(permitStatusValue));
    const attachmentItemsCount = count(attachmentItems);

    if (!attachmentItemsCount && isReadonly) {
      return null;
    }

    return (
      <div className="attachment">
        <div className="attachment-header">
          {!!attachmentItemsCount && <span className="attachment-header-title">Attachments</span>}
          {
            !isReadonly && (
              <span onClick={this.showFileUploadModal} className="add-attachment-button">
                <i className="icon icon-plus-circle" />
                Add attachment
              </span>
            )
          }

        </div>
        <FileGallery
          readonly={isReadonly}
          items={attachmentItems}
          deleteFile={this.confirmDeleteAttachment}
        />
        <FileUpload className={`an-permit-upload ${count(attachmentList) ? 'has-upload-list' : ''}`} {...uploadInitSetting} fileList={attachmentList} />
      </div>
    );
  }
}
