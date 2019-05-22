import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Progress from '../Progress';
import DefaultCSSPrefix from '../../consts/DefaultCSSPrefix';

const { bool, string, array, func } = PropTypes;

const propTypes = {
  prefixCls: string,
  showRemoveIcon: bool,
  items: array,
  onRemove: func
};

export default class UploadList extends React.Component {
  static propTypes = propTypes;

  static defaultProps = {
    prefixCls: `${DefaultCSSPrefix}-upload`,
    showRemoveIcon: true,
    items: []
  }

  handleClose = (file) => {
    const { onRemove } = this.props;

    onRemove && onRemove(file);
  }

  renderError() {
    const { errorMessage, prefixCls } = this.props;

    if (!errorMessage) {
      return null;
    }

    return (
      <div className={`${prefixCls}-list-error`}>
        <span className="icon icon-times-circle" />
        <span>{errorMessage}</span>
      </div>
    );
  }

  render() {
    const { prefixCls, items, showRemoveIcon, className } = this.props;

    if (!items.length) {
      return null;
    }

    const listNode = items.map((file) => {
      let progress;

      if (file.status === 'uploading') {
        const loadingProgress = ('percent' in file) ?
          <Progress percent={file.percent} showInfo={false} size="sm" /> : null;

        progress = (
          <div className={`${prefixCls}-list-item-progress`}>
            {loadingProgress}
          </div>
        );
      }

      const removeIconCross = (showRemoveIcon && file.status !== 'error') ?
        (<i
          className="icon icon-close"
          onClick={() => this.handleClose(file)}
        />)
        : null;

      const infoUploadingClass = classNames({
        [`${prefixCls}-list-item`]: true,
        [`${prefixCls}-list-item-${file.status}`]: file.status
      });

      return (
        <div className={infoUploadingClass} key={file.uid}>
          <div className={`${prefixCls}-list-item-content`}>
            <span
              className={`${prefixCls}-list-item-content__name`}
              title={file.name}
            >
              <i className="icon icon-file-solid-m" />
              <span>{file.name}</span>
            </span>
            {file.status === 'done' ? <i className="icon icon-check" /> : removeIconCross}
          </div>
          {file.status === 'error' &&
            (<div className={`${prefixCls}-list-item-error-info`}>
              <span className="icon icon-times-circle" />
              {file.errorInfo || 'unknown error'}
            </div>)
          }
          {progress}
        </div>
      );
    });

    const listClassNames = classNames({
      [`${prefixCls}-list`]: true
    }, className);

    return (
      <div
        className={listClassNames}
      >
        {this.renderError()}
        {listNode}
      </div>
    );
  }
}

