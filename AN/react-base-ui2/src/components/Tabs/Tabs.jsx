import React from 'react';
import classNames from 'classnames';
import { string, node, func, oneOf } from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import isNil from 'lodash/isNil';
import find from 'lodash/find';

import Tab from './Tab';
import TabPanel from './TabPanel';
import { TabsClasses } from './consts';
import { Size3 } from '../..//consts/Size';
import shallowEqual from '../../utils/shallowEqual';


const TabsPropTypes = {
  /**
   * Id property for Tabs container,
   * if not specified, will generate a unique id automatically.
   */
  id: string,
  /**
   * Child Node, will be used as TabPanel's children.
  */
  children: node,
  /**
   * Custom CSS class for Tabs container.
   */
  className: string,
  /**
   * Control which tab is selected.
   */
  selectedId: string,
  /**
   * Determines the size of Tabs.
   */
  size: oneOf([Size3.SMALL, Size3.MEDIUM, Size3.LARGE]),
  /**
   * A callback function called when a tab clicked.
   */
  onChange: func
};

const TabsProps = {
  size: Size3.MEDIUM
};

export default class Tabs extends React.Component {
  static displayName = 'Tabs';
  static propTypes = TabsPropTypes;
  static defaultProps = TabsProps;

  constructor(props) {
    super(props);

    const { id, selectedId } = this.props;
    this.id = id || uniqueId(`${TabsClasses.TABS}`);
    this.state = { selectedId };
  }

  componentWillMount() {
    this.updateSelection();
  }

  componentWillReceiveProps({ selectedId }) {
    if (selectedId !== this.props.selectedId && this.isSelectable(selectedId)) {
      this.updateSelection(selectedId);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.isChildrenChanged(prevProps)) {
      this.updateSelection();
      this.forceUpdate();
    }
  }

  isSelectable(id) {
    return !isNil(id) && React.Children.toArray(this.props.children).some(child =>
      Tab.isInstance(child) &&
      id === child.props.id &&
      !child.props.disabled
    );
  }

  isChildrenChanged(prevProps) {
    const tabsProps = React.Children.toArray(this.props.children)
                  .filter(child => Tab.isInstance(child))
                  .map(({ props }) => props);
    const prevTabsProps = React.Children.toArray(prevProps.children)
                  .filter(child => Tab.isInstance(child))
                  .map(({ props }) => props);
    if (tabsProps.length !== prevTabsProps.length) {
      return true;
    }

    return tabsProps.some((tabProps, i) => {
      const prevTabProps = prevTabsProps[i];
      return !shallowEqual(prevTabProps, tabProps);
    });
  }

  generateChildId(key) {
    const { id } = this.props;
    return `${id || this.id}_tab${key}`;
  }

  onSelected = (selectedId, e) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(selectedId, e);
    }

    this.updateSelection(selectedId);
  }

  updateSelection = (id) => {
    let selectedId = id || this.state.selectedId;
    if (!this.isSelectable(selectedId)) {
      let index = 0;
      const tabs = React.Children.toArray(this.props.children);
      const tab = find(tabs, (t, i) => {
        index = i;
        return Tab.isInstance(t) && !t.props.disabled;
      });
      selectedId = tab && (tab.props.id || this.generateChildId(index));
    }

    this.setState({ selectedId });
  }

  renderTabList() {
    const { children } = this.props;
    return React.Children.map(
      children,
      (child, i) => {
        const { id, title, disabled } = child.props;
        const tabId = id || this.generateChildId(i);

        return Tab.isInstance(child) ?
          <Tab
            key={i}
            id={tabId}
            title={title}
            onClick={this.onSelected}
            disabled={disabled}
            selected={tabId === this.state.selectedId && !disabled}
          /> : undefined;
      }
    );
  }

  renderTabPanels() {
    const { children } = this.props;
    return React.Children.toArray(children).filter(child =>
      Tab.isInstance(child)
    ).map((child, i) => {
      const { id, panelClass, disabled, children: tabChildren } = child.props;
      const tabId = id || this.generateChildId(i);

      return (
        <TabPanel
          key={i}
          id={tabId}
          className={panelClass}
          disabled={disabled}
          selected={tabId === this.state.selectedId && !disabled}
        >
          {tabChildren}
        </TabPanel>
      );
    });
  }

  render() {
    const { id, className, size } = this.props;
    const classes = classNames(
      TabsClasses.TABS,
      className,
      {
        [`${TabsClasses.TABS}-${size}`]: size
      }
    );

    return (
      <div
        className={classes}
        id={id || this.id}
      >
        <div
          className={TabsClasses.TAB_LIST}
          role="tablist"
        >
          {this.renderTabList()}
        </div>
        {this.renderTabPanels()}
      </div>
    );
  }
}
