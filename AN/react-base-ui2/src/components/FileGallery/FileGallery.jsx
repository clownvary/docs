import React from 'react';
import { string, array, func } from 'prop-types';
import classNames from 'classnames';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import DropdownMenu from './DropdownMenu';
import { DefaultCSSPrefix } from '../../consts';

/**
 * Default PropTypes for FileGallery
 */
const propTypes = {
  /**
   * additional css class of root dom node.
  */
  className: string,
  /**
   * The prefix of FileGallery component element class name.
  */
  prefix: string,
  /**
   * Data record array to be displayed.
  */
  items: array,
  /**
   * set the handler to handle deleteFile event.
  */
  deleteFile: func
};

export default class FileGallery extends React.PureComponent {
  static displayName = 'FileGallery'

  static propTypes = propTypes;

  static defaultProps = {
    prefix: `${DefaultCSSPrefix}`,
    items: [],
    readonly: false,
    deleteFile() {}
  }

  download({ url }) {
    window.open(url);
  }

  render() {
    const { items, prefix, className, readonly } = this.props;

    if (!isArray(items) || isEmpty([items])) {
      return null;
    }

    const galleryClassName = `${prefix}-file-gallery`;
    const fileGalleryCls = classNames(galleryClassName, className);

    return (
      <div className={fileGalleryCls}>
        {
          items.map((item, index) => {
            const { name } = item;
            if (name) {
              return (
                <div key={index} className={`${galleryClassName}-item`}>
                  <span>
                    <i className="icon icon-file-solid-m" />
                    <span className={`${galleryClassName}-item-name`} title={name}>{name}</span>
                  </span>
                  <DropdownMenu
                    fileIndex={index}
                    item={item}
                    prefix={galleryClassName}
                    download={this.download}
                    deleteFile={() => this.props.deleteFile(index)}
                    readonly={readonly}
                  />
                </div>
              );
            }
            return null;
          })
        }
      </div>
    );
  }
}
