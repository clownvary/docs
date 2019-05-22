import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import findIndex from 'lodash/findIndex';
import { confirm } from '../../services/dialog';
import AjaxUploader from './AjaxUploader';
import UploadList from './UploadList';
import Modal from '../Modal';
import DefaultCSSPrefix from '../../consts/DefaultCSSPrefix';

function fileToObject(file) {
  return {
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
    name: file.filename || file.name,
    size: file.size,
    type: file.type,
    uid: file.uid,
    response: file.response,
    error: file.error,
    errorMessage: file.errorMessage,
    percent: 0,
    originFileObj: file
  };
}

function getFileItem(file, fileList) {
  const matchKey = file.uid !== undefined ? 'uid' : 'name';
  return fileList.filter(item => item[matchKey] === file[matchKey])[0];
}

function getFileIndex(file, fileList) {
  /* istanbul ignore next */
  const matchKey = file.uid !== undefined ? 'uid' : 'name';
  return findIndex(fileList, item => item[matchKey] === file[matchKey]);
}

function removeFileItem(file, fileList) {
  const matchKey = file.uid !== undefined ? 'uid' : 'name';
  const removed = fileList.filter(item => item[matchKey] !== file[matchKey]);
  /* istanbul ignore next */
  if (removed.length === fileList.length) {
    return null;
  }
  return removed;
}

const { bool, string, object, oneOfType, func, element } = PropTypes;

/**
 * Default PropTypes for FileUpload
 */
const FileUploadPropTypes = {
  /**
   * The prefix of file upload component element class name.
   */
  prefixCls: string,
  /**
   * The title of file upload modal. It's could be a react element.
   */
  modalTitle: oneOfType([string, element]),
  /**
   * A list of class names to pass along to the file upload modal container.
   */
  modalClassName: string,
  /**
   * The inline style for file upload container element.
   */
  style: object,
  /**
   * A list of class names to pass along to the file upload container element.
   */
  className: string,
  /**
   * Determines displaying the upload file list.
   */
  showUploadList: bool,
  /**
   * Determines enable select the upload file by dragging.
   */
  drag: bool,
  /**
   * The Upload file list configs which contains showRemoveIcon, errorMessage, className.
   */
  uploadListConfig: object,
  /**
   * Determines enable upload multiple files.
   */
  multiple: bool,
  /**
   * Determines disable state of file upload component.
   */
  disabled: bool,
  /**
   * The heads of upload file http request.
   */
  headers: object,
  /**
   * Determines the types of files that the file upload accepts.
   */
  accept: string,
  /**
   * Determines the file name which was sent to server.
   */
  name: string,
  /**
   * Determines the URL where to send the upload file to.
   */
  action: string,
  /**
   * Determines the upload file dom element id.
   */
  uploadElemId: string,
  /**
   * Determines the upload form data. It could be function to do post process works.
   */
  data: oneOfType([object, func]),
  /**
   * The function to return child nodes for file upload component
   */
  renderContent: func,
  /**
   * Determines withCredentials attribute when uploading file by xhr.
   */
  withCredentials: bool
};

const FileUploadProps = {
  prefixCls: `${DefaultCSSPrefix}-upload`,
  modalTitle: 'Upload Files',
  modalClassName: '',
  style: {},
  className: '',
  showUploadList: true,
  headers: {},
  drag: false,
  name: 'file',
  multiple: false,
  action: '',
  data: {},
  accept: '',
  disabled: false,
  renderContent: null
};

export default class FileUpload extends React.Component {
  static displayName = 'FileUpload';
  static propTypes = FileUploadPropTypes;
  static defaultProps = FileUploadProps;

  constructor(props) {
    super(props);

    this.state = {
      fileList: props.fileList || props.defualtFileList || [],
      dragState: 'drop'

    };
  }

  componentWillReceiveProps(nextProps) {
    /* istanbul ignore next */
    if ('fileList' in nextProps) {
      this.setState({
        fileList: nextProps.fileList || []
      });
    }
  }

  onStart = (file) => {
    const nextFileList = this.state.fileList;
    const targetItem = fileToObject(file);

    targetItem.status = 'uploading';
    nextFileList.unshift(targetItem);

    this.onChange({
      file: targetItem,
      fileList: nextFileList
    });
  }

  onSuccess = (response, file) => {
    try {
      if (typeof response === 'string') {
        response = JSON.parse(response);
      }
    } catch (e) { /* do nothing */ }

    const { fileList } = this.state;
    const targetItem = getFileItem(file, fileList);
    // removed
    if (!targetItem) {
      return;
    }

    targetItem.status = 'done';
    targetItem.response = response;

    const targetIndex = getFileIndex(file, fileList);
    fileList[targetIndex] = targetItem;

    this.onChange({
      file: targetItem,
      fileList
    });
  }

  onProgress = (e, file) => {
    const { fileList } = this.state;
    const targetItem = getFileItem(file, fileList);
    if (!targetItem) {
      return;
    }
    targetItem.percent = e.percent;

    const targetIndex = getFileIndex(file, fileList);
    fileList[targetIndex].percent = e.percent;

    this.onChange({
      event: e,
      file: targetItem,
      fileList: this.state.fileList
    });
  }

  onError = (error, response, file) => {
    const { fileList } = this.state;
    const targetItem = getFileItem(file, fileList);
    // removed
    if (!targetItem) {
      return;
    }
    targetItem.error = error;
    targetItem.response = response;
    targetItem.status = 'error';

    this.onChange({
      file: targetItem,
      fileList
    });
  }

  onChange = (info) => {
    /* istanbul ignore if */
    if (!('fileList' in this.props)) {
      this.setState({ fileList: info.fileList });
    }

    const { onChange } = this.props;
    /* istanbul ignore next */
    if (onChange) {
      onChange(info);
    }
  }

  onFileDrop = (e) => {
    this.setState({
      dragState: e.type
    });
  }

  onClose = () => {
    const { onClose, cancelModalContent } = this.props;
    const { fileList } = this.state;

    /* istanbul ignore next */
    if (findIndex(fileList, { status: 'uploading' }) !== -1) {
      const defaultOptions = {
        title: 'Cancel Upload',
        showCancel: true,
        cancelText: 'No',
        confirmText: 'Yes'
      };

      confirm(
        (<div>
          <p>{cancelModalContent || 'you sure you want to cancel the upload?'} </p>
        </div>
        ),
        { ...defaultOptions }
      ).then(() => {
        this.upload.abort();
        onClose && onClose();
      });
    } else {
      onClose && onClose();
    }
  }

  handleManualRemove = (file) => {
    const { onRemove } = this.props;

    this.upload.abort(file);

    file.status = 'removed';
    const removedFileList = removeFileItem(file, this.state.fileList);

    /* istanbul ignore if */
    if (removedFileList) {
      this.onChange({
        file,
        fileList: removedFileList
      });
    }

    onRemove && onRemove(file);
  }

  saveUpload = (node) => {
    this.upload = node;
  }

  renderUploadList = () => {
    const { uploadListConfig } = this.props;
    const { showRemoveIcon, errorMessage, className } = uploadListConfig;

    return (
      <UploadList
        items={this.state.fileList}
        onRemove={this.handleManualRemove}
        showRemoveIcon={showRemoveIcon}
        errorMessage={errorMessage}
        className={className}
      />
    );
  }

  render() {
    const { prefixCls, className, showUploadList, modalClassName, drag,
      visible, modalTitle, style, multiple, disabled, headers, accept, name, action,
      data, withCredentials, uploadElemId, onBeforeUpload, renderContent
    } = this.props;

    const uploadProps = {
      prefixCls,
      uploadElemId,
      multiple,
      disabled,
      headers,
      accept,
      name,
      action,
      data,
      withCredentials,
      onStart: this.onStart,
      onError: this.onError,
      onProgress: this.onProgress,
      onSuccess: this.onSuccess,
      onBeforeUpload,
      renderContent
    };

    /* istanbul ignore next */
    const uploadList = showUploadList ? this.renderUploadList() : null;

    let uploadConentNode;

    if (drag) {
      const dragCls = classNames(prefixCls, {
        [`${prefixCls}-drag`]: true,
        [`${prefixCls}-drag-uploading`]: this.state.fileList.some(file => file.status === 'uploading'),
        [`${prefixCls}-drag-hover`]: this.state.dragState === 'dragover',
        [`${prefixCls}-disabled`]: disabled
      });

      uploadConentNode = (
        <div className={className} style={style}>
          <div
            className={dragCls}
            onDrop={this.onFileDrop}
            onDragOver={this.onFileDrop}
            onDragLeave={this.onFileDrop}
          >
            <AjaxUploader {...uploadProps} ref={this.saveUpload} />
          </div>
          {uploadList}
        </div>
      );
    } else {
      const uploadButtonCls = classNames(prefixCls, {
        [`${prefixCls}-select`]: true,
        [`${prefixCls}-disabled`]: disabled,
        hidden: !renderContent
      });
      /* istanbul ignore next */
      if (renderContent) {
        uploadConentNode = (
          <div className={className} style={style}>
            <div className={uploadButtonCls}>
              <AjaxUploader {...uploadProps} ref={this.saveUpload} />
            </div>
            {uploadList}
          </div>
        );
      }
    }

    return (
      <Modal
        className={`modal-upload-file ${modalClassName}`}
        title={modalTitle}
        shown={visible}
        onClose={this.onClose}
      >
        <div className="modal-body ">
          {uploadConentNode}
        </div>
      </Modal>
    );
  }
}
