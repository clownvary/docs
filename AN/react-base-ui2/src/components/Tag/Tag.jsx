import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DefaultCSSPrefix } from '../../consts';
import { TagType, TagSize } from './consts';

const TagPropTypes = {
  prefixCls: PropTypes.string,
  /**
   * class names which were applied to component container div.
   */
  className: PropTypes.string,
  /**
   * determine the tag size.
   */
  size: PropTypes.oneOf([TagSize.SMALL, TagSize.MEDIUM, TagSize.LARGE, TagSize.EXTRA_LARGE]),
  /**
   * determine the type of tag, including background-color and color.
   */
  type: PropTypes.oneOf([TagType.DEFAULT, TagType.PENDING, TagType.ERROR]),
  /**
   * determine the close icon renders of tag.
   */
  closable: PropTypes.bool,
  /**
   * the callback function which is triggered when clicking the close icon.
   */
  onClose: PropTypes.func
};

const TagDefaultProps = {
  prefixCls: `${DefaultCSSPrefix}-tag`,
  size: TagSize.MEDIUM,
  type: TagType.DEFAULT
};

class Tag extends Component {
  static propTypes = TagPropTypes;
  static defaultProps = TagDefaultProps;

  handleCloseIconClick = (e) => {
    const { onClose } = this.props;
    onClose && onClose(e);
  };

  renderCloseIcon = () => {
    const { closable } = this.props;
    if (closable) {
      return (<i className="icon icon-close" onMouseDown={this.handleCloseIconClick} />);
    }
    return null;
  };

  getTagClassName = () => {
    const { prefixCls, className, type, size, closable } = this.props;
    return classNames(prefixCls, `${prefixCls}__${type}`, `${prefixCls}__size-${size}`, className, {
      [`${prefixCls}__closable`]: closable
    });
  };

  render() {
    const { children, ...rest } = this.props;
    const tagClassName = this.getTagClassName();
    const closeIconNode = this.renderCloseIcon();
    return (
      <div {...rest} className={tagClassName}>
        {children}
        {closeIconNode}
      </div>
    );
  }
}

export default Tag;
