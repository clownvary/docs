import React from 'react';
import classNames from 'classnames';
import { string, node, bool } from 'prop-types';

import { TabsClasses } from './consts';

const TabPanelPropTypes = {
  /**
   * Id property for TabPanel container,
   * if not specified, will generate a unique id automatically.
   */
  id: string,
  /**
   * Custom CSS class for TabPanel container.
   */
  className: string,
  /**
   * Child Node.
  */
  children: node,
  /**
   * Indicate whether current tabPanel should be display.
   */
  selected: bool
};

const TabPanelProps = {
  selected: false
};

export const generateTabPanelId = id => (id ? `${id}_panel` : '');

export default class TabPanel extends React.Component {
  static displayName = 'TabPanel';
  static propTypes = TabPanelPropTypes;
  static defaultProps = TabPanelProps;

  render() {
    const { id, className, selected, children } = this.props;
    const classes = classNames(TabsClasses.TAB_PANEL, className);
    const ariaAttrs = {
      'aria-hidden': !selected,
      'aria-labelledby': id
    };

    return (
      <div
        {...ariaAttrs}
        className={classes}
        id={generateTabPanelId(id)}
        role="tabpanel"
      >
        {children}
      </div>
    );
  }
}
