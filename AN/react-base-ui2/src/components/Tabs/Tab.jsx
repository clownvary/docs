import React from 'react';
import classNames from 'classnames';
import { string, func, bool } from 'prop-types';

import { TabsClasses } from './consts';
import { generateTabPanelId } from './TabPanel';

const TabPropTypes = {
  /**
   * Id property for Tab container(button),
   * if not specified, will generate a unique id automatically.
   */
  id: string,
  /**
   * The content dispayed in Tab.
   */
  title: string,
  /**
   * Custom CSS class for Tab container.
   */
  className: string,
  /**
   * Indicate whether current tab is selected.
   */
  selected: bool,
  /**
   * Indicate whether current tab is disabled.
   */
  disabled: bool,
  /**
   * A callback function called when a tab clicked.
   */
  onClick: func
};

const TabProps = {
  selected: false,
  disabled: false
};

export default class Tab extends React.Component {
  static displayName = 'Tab';
  static propTypes = TabPropTypes;
  static defaultProps = TabProps;

  static isInstance(node) {
    return node && node.type === Tab;
  }

  onClick = (e) => {
    const { id, disabled, onClick } = this.props;
    !disabled && onClick(id, e);
  }

  render() {
    const { id, title, className, disabled, selected } = this.props;
    const classes = classNames(TabsClasses.TAB, className, {
      active: selected
    });
    const ariaAttrs = {
      'aria-disabled': disabled,
      'aria-selected': selected,
      'aria-expanded': selected,
      'aria-controls': generateTabPanelId(id)
    };

    return (
      <button
        role="tab"
        {...ariaAttrs}
        className={classes}
        onClick={this.onClick}
        id={id}
        tabIndex={disabled ? undefined : 0}
        disabled={disabled}
      >
        {title}
      </button>
    );
  }
}
