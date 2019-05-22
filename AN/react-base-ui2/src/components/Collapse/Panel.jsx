import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';
import { KeyCode } from '../../consts';
import { hasClass } from '../../utils/dom';

/**
 * Default PropTypes for Panel
 */
const propTypes = {
  /**
   * customize class for Collapse section
   */
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  Header: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node
  ]),
  /**
   * content of the panel
   */
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node
  ]),
  /**
   * If true, panel cannot be opened or closed
   */
  disabled: PropTypes.bool,
  /**
   * Determines the aria-label text on expanded
   */
  ariaLableExpand: PropTypes.string,
  /**
   * Determines the aria-label text on collapsed
   */
  ariaLableCollapse: PropTypes.string
};

class Panel extends React.Component {
  static propTypes = propTypes

  static defaultProps = {
    headerButtonId: 'default',
    onItemClick() { },
    isActive: false
  }

  handleItemClick = (e) => {
    e && e.preventDefault();
    const { onItemClick } = this.props;
    onItemClick();
  }

  handleHeaderClick(e) {
    e.stopPropagation();
  }

  onPanelHeaderKeyDown = (e) => {
    const keyCode = e.keyCode || e.which;
    const { prefixCls } = this.props;
    const headerClass = `${prefixCls}-item__header`;
    const isEnterOrSpace = keyCode === KeyCode.ENTER || keyCode === KeyCode.SPACE;

    if (isEnterOrSpace) {
      if (hasClass(e.target, headerClass)) {
        this.handleItemClick(e);
        return this.props.onPanelHeaderKeyDown(e, keyCode);
      }
    }

    return this.props.onPanelHeaderKeyDown(e, keyCode);
  }

  renderDefaultHeader() {
    const { Header } = this.props;

    return (
      <div onClick={this.handleHeaderClick}>
        {Header}
        <i
          className="icon icon-chevron-down"
          onClick={this.handleItemClick}
        />
      </div>
    );
  }

  render() {
    const {
      prefixCls,
      Header,
      className,
      content,
      isActive,
      disabled,
      children,
      ariaLableExpand,
      ariaLableCollapse,
      isPanelHeaderFocusable
    } = this.props;

    const panelCls = classNames({
      [`${prefixCls}-item`]: true,
      'is-expanded': isActive
    }, className);

    const headerCls = classNames({
      [`${prefixCls}-item__header`]: true,
      'is-disabled': disabled,
      'is-focusable': isPanelHeaderFocusable
    });
    return (
      <div className={panelCls}>
        <a
          className={headerCls}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          href="javascript:void(0)" // eslint-disable-line
          onClick={this.handleItemClick}
          onKeyDown={this.onPanelHeaderKeyDown}
          aria-label={isActive ? ariaLableExpand : ariaLableCollapse}
          role="button"
          aria-expanded={isActive}
        >
          {
            isFunction(Header) ?
              <Header onToggleClick={this.handleItemClick} />
              :
              this.renderDefaultHeader()
          }
        </a>

        <div
          className={`${prefixCls}-item__content`}
        >
          {children || content}
        </div>
      </div>
    );
  }
}

export default Panel;
