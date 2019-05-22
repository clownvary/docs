import React from 'react';
import classNames from 'classnames';
import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';
import { findDOMNode } from 'react-dom';
import difference from 'lodash/difference';
import PropTypes from 'prop-types';
import { hasClass } from '../../utils/dom';
import Panel from './Panel';
import { DefaultCSSPrefix, KeyCode } from '../../consts';

/**
 * Default PropTypes for Collapse
 */

const collapsePropTypes = {
  prefixCls: PropTypes.string,
  /**
   * Key of the active panel
   */
  activeKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  /**
   * Data record array to be displayed
   */

  dataSource: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      disabled: PropTypes.bool,
      header: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.node
      ]),
      className: PropTypes.string,
      content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.node
      ])
    }))
  ]),
  /**
   * Callback function executed when active panel is changed
   */
  onChange: PropTypes.func,
  /**
   * multiple mode, default is null, is collapse mode
   */
  multiple: PropTypes.bool,
  /**
   * className to apply
   */
  className: PropTypes.string,

  /**
   * The inline style for collapse container element.
   */
  style: PropTypes.object,
  /**
   * Whether the panel header can been focused
   */
  isPanelHeaderFocusable: PropTypes.bool
};

function toArray(activeKey = []) {
  return !isArray(activeKey) ? [activeKey] : activeKey;
}

class Collapse extends React.Component {
  static Panel = Panel;
  static propTypes = collapsePropTypes

  static defaultProps = {
    prefixCls: `${DefaultCSSPrefix}-collapse`,
    onChange() { },
    dataSource: [],
    multiple: true,
    isPanelHeaderFocusable: false
  }

  constructor(props) {
    super(props);

    const { activeKey } = this.props;

    this.state = {
      activeKey: toArray(activeKey)
    };
  }

  componentWillReceiveProps({ activeKey }) {
    const nextActiveKey = toArray(activeKey);
    const nowActiveKey = toArray(this.props.activeKey);

    if (difference(nextActiveKey, nowActiveKey).length ||
      difference(nowActiveKey, nextActiveKey).length) {
      this.setState({
        activeKey: nextActiveKey
      });
    }
  }

  setCollapseWrapper = (wrapper) => {
    this.collapseWrapper = wrapper;
  }

  onClickItem(key, disabled) {
    if (disabled) {
      return;
    }

    let { activeKey } = this.state;
    if (!this.props.multiple) {
      activeKey = activeKey[0] === key ? [] : [key];
    } else {
      const index = activeKey.indexOf(key);
      const isActive = index > -1;

      if (isActive) {
        activeKey.splice(index, 1);
      } else {
        activeKey.push(key);
      }
    }

    this.setState({ activeKey });
    this.props.onChange(activeKey);
  }

  onPanelHeaderKeyDown = (e, keyCode) => {
    const target = e.target;
    const { prefixCls, onPanelHeaderKeyDown } = this.props;
    const headerClass = `${prefixCls}-item__header`;
    const collapseWrapper = findDOMNode(this.collapseWrapper);
    const panelHeaders = Array.prototype.slice.call(collapseWrapper.querySelectorAll(`.${headerClass}`));
    const panelLength = panelHeaders.length;
    const targetIndex = panelHeaders.indexOf(target);

    // If the focus is not in the header then do nothing
    if (hasClass(target, headerClass)) {
      switch (keyCode) {
        case KeyCode.HOME: {
          e.preventDefault();
          panelHeaders[0].focus();
          break;
        }
        case KeyCode.END: {
          e.preventDefault();
          panelHeaders[panelLength - 1].focus();
          break;
        }
        case KeyCode.LEFT:
        case KeyCode.UP: {
          e.preventDefault();
          const direction = -1;
          const newIndex = (targetIndex + panelLength + direction) % panelLength;
          panelHeaders[newIndex].focus();
          break;
        }
        case KeyCode.RIGHT:
        case KeyCode.DOWN: {
          e.preventDefault();
          const direction = 1;
          const newIndex = (targetIndex + panelLength + direction) % panelLength;
          panelHeaders[newIndex].focus();
          break;
        }
        default: {
          break;
        }
      }
    }

    return isFunction(onPanelHeaderKeyDown) && onPanelHeaderKeyDown(e);
  }

  renderItems() {
    const { activeKey } = this.state;
    const { prefixCls, multiple, dataSource, children, isPanelHeaderFocusable } = this.props;

    const getIsActive = (key) => {
      if (!multiple) {
        return activeKey[0] === key;
      }
      return activeKey.indexOf(key) > -1;
    };

    if (children) {
      const newChildren = [];
      React.Children.forEach(children, (child, index) => {
        const key = `${child.key || index}`;
        const { disabled } = child.props;
        const isActive = getIsActive(key);

        const props = {
          key,
          isActive,
          prefixCls,
          isPanelHeaderFocusable,
          onItemClick: () => { this.onClickItem(key, disabled); },
          onPanelHeaderKeyDown: this.onPanelHeaderKeyDown
        };

        newChildren.push(React.cloneElement(child, props));
      });

      return newChildren;
    }

    return dataSource.map((item, index) => {
      const key = `${item.key || index}`;
      const isActive = getIsActive(key);
      return (
        <Panel
          prefixCls={prefixCls}
          key={key}
          isActive={isActive}
          onItemClick={() => { this.onClickItem(key, item.disabled); }}
          onPanelHeaderKeyDown={this.onPanelHeaderKeyDown}
          disabled={item.disabled}
          className={item.className}
          Header={item.Header}
          content={item.content}
          ariaLableExpand={item.ariaLableExpand}
          ariaLableCollapse={item.ariaLableCollapse}
          isPanelHeaderFocusable={isPanelHeaderFocusable}
        />
      );
    });
  }

  render() {
    const { prefixCls, className, style, dataSource, children } = this.props;
    const cls = classNames(prefixCls, className);
    if (!dataSource.length && !children) {
      return null;
    }

    return (
      <div className={cls} style={style} ref={this.setCollapseWrapper}>
        {this.renderItems()}
      </div>
    );
  }
}

export default Collapse;
