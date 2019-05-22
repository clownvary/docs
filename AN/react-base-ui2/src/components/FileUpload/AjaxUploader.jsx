import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import request from './request';
import attrAccept from './attrAccept';

const { bool, string, object, oneOfType, func } = PropTypes;

const propTypes = {
  prefixCls: string,
  multiple: bool,
  disabled: bool,
  headers: object,
  accept: string,
  name: string,
  action: string,
  uploadElemId: string,
  data: oneOfType([object, func]),
  withCredentials: bool,
  onBeforeUpload: func,
  renderContent: func
};

export default class AjaxUploader extends React.Component {
  static propTypes = propTypes;
  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.abort();
  }

  onFileDrop = (e) => {
    if (e.type === 'dragover') {
      e.preventDefault();
      return;
    }

    const files = Array.prototype.slice.call(e.dataTransfer.files).filter(
      file => attrAccept(file, this.props.accept)
    );
    this.uploadFiles(files);

    e.preventDefault();
  }

  onChange = (e) => {
    const files = e.target.files;

    this.uploadFiles(files);
  }

  onClick = (e) => {
    const { uploadElemId } = this.props;
    if (e.target.getAttribute('id') !== uploadElemId) {
      return;
    }

    const inputElem = this.fileInput;
    /* istanbul ignore if */
    if (!inputElem) {
      return;
    }

    inputElem.value = '';

    inputElem.click();
  }

  triggerUpload = () => {
    const inputElem = this.fileInput;
    /* istanbul ignore if */
    if (!inputElem) {
      return;
    }

    inputElem.value = '';

    inputElem.click();
  }

  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.onClick(e);
    }
  }

  reqs = {}

  uploadFiles(files) {
    const { onBeforeUpload } = this.props;
    const postFiles = Array.prototype.slice.call(files);

    postFiles.forEach((file) => {
      file.uid = uniqueId(this.props.prefixCls);
      if (!isFunction(onBeforeUpload)) {
        this.upload(file, postFiles);
      }
    });

    if (isFunction(onBeforeUpload)) {
      const postfileList = onBeforeUpload(postFiles);
      /* istanbul ignore else */
      if (isArray(postfileList) && !isEmpty(postfileList)) {
        postfileList.forEach((file) => {
          this.upload(file, postfileList);
        });
      }
    }
  }

  upload(file) {
      // always async in case use react state to keep fileList
    setTimeout(() => this.post(file), 0);
  }

  post(file) {
    /* istanbul ignore if */
    if (!this._isMounted) {
      return;
    }

    let { data } = this.props;
    const { onStart, onProgress, onSuccess, onError,
      action, name, headers, withCredentials } = this.props;

    /* istanbul ignore else */
    if (typeof data === 'function') {
      data = data(file);
    }

    const { uid } = file;

    /* istanbul ignore next */
    this.reqs[uid] = request({
      action,
      filename: name,
      file,
      data,
      headers,
      withCredentials,
      onProgress: (e) => { onProgress(e, file); },
      onSuccess: (ret, xhr) => {
        delete this.reqs[uid];
        onSuccess(ret, file, xhr);
      },
      onError: (err, ret) => {
        delete this.reqs[uid];
        onError(err, ret, file);
      }
    });
    onStart(file);
  }

  abort(file) {
    const { reqs } = this;
    if (file) {
      let uid = file;
      if (file && file.uid) {
        uid = file.uid;
      }
      /* istanbul ignore if */
      if (reqs[uid]) {
        reqs[uid].abort();
        delete reqs[uid];
      }
    } else {
      Object.keys(reqs).forEach((uid) => {
        /* istanbul ignore else */
        if (reqs[uid]) {
          reqs[uid].abort();
        }

        delete reqs[uid];
      });
    }
  }

  saveFileInput = (node) => {
    this.fileInput = node;
  }

  render() {
    const { prefixCls, disabled, multiple, accept, renderContent } = this.props;

    const cls = classNames({
      [`${prefixCls}-container`]: true,
      [`${prefixCls}-disabled`]: disabled
    });

    const events = disabled ? {} : {
      onClick: this.onClick,
      onDrop: this.onFileDrop,
      onKeyDown: this.onKeyDown,
      onDragOver: this.onFileDrop,
      tabIndex: '0'
    };

    return (
      <span
        {...events}
        className={cls}
        role="button"
      >
        <input
          type="file"
          className={`${prefixCls}-input`}
          ref={this.saveFileInput}
          accept={accept}
          multiple={multiple}
          onChange={this.onChange}
        />
        <div className={`${prefixCls}-drag-container`}>
          {
            renderContent && isFunction(renderContent) ?
              renderContent(this.triggerUpload) : null
          }
        </div>
      </span>
    );
  }
}
