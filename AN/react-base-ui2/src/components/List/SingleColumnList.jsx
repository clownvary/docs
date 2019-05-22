/* eslint-disable react/no-find-dom-node */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isFunction from 'lodash/isFunction';

import Checkbox from '../Checkbox';
import { ListType } from './consts';
import { SelectionMode } from '../../consts';
import { decodeHtmlStr } from '../../utils';
// import { SafeText } from '../SafeText';

const SingleColumnListPropTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    text: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    disabled: PropTypes.bool,
    showTips: PropTypes.bool,
    icon: PropTypes.string,
    renderer: PropTypes.func
  })).isRequired,

  config: PropTypes.shape({
    display: PropTypes.bool,
    selectionMode: PropTypes.oneOf(
      [SelectionMode.SINGLE, SelectionMode.MULTIPLE]),
    listType: PropTypes.oneOf(
      [ListType.SINGLE, ListType.MULTIPLE]),
    disabled: PropTypes.bool,
    maxHeight: PropTypes.string,
    showTips: PropTypes.bool, // determine whether show the tips when mouse hover the list item.
    showIcon: PropTypes.bool, // determine whether show the icon after the list item
    checkable: PropTypes.bool, // determine whether show the checkbox before list item
    sortable: PropTypes.bool, // can be sorted
    filterable: PropTypes.bool, // can be filter by inputted value
    asyncable: PropTypes.bool, // determine whether the data can be loaded asyncable.
    isFuzzy: PropTypes.bool,
    sortField: PropTypes.string,
    filterField: PropTypes.string,
    WCAG: PropTypes.bool
  }).isRequired,

  onChange: PropTypes.func.isRequired
};

class SingleColumnList extends React.PureComponent {
  static displayName = 'SingleColumnList';
  static propsType = SingleColumnListPropTypes;

  click({ item, event }) {
    event.preventDefault();
    event.stopPropagation();

    if (item.disabled) {
      return null;
    }

    /* istanbul ignore else */
    if (isFunction(this.props.onChange)) {
      return this.props.onChange({ item });
    }

    return console.warn('no onChange function', item);
  }

  renderRow(rowData, rowIndex) {
    const { config, renderer, selectedIndex, activeIndex } = this.props;
    const {
      prefix,
      disabled: globalDisabled,
      showTips: globalShowTips,
      icon: globalIcon,
      WCAG
    } = config;

    rowData.index = rowData.index || rowIndex;
    const {
      index,
      text,
      disabled,
      showTips = globalShowTips,
      className = '',
      icon = globalIcon
    } = rowData;

    const isSelected = selectedIndex.some(idx => `${idx}` === `${index}`);

    const newData = {
      ...rowData,
      disabled: globalDisabled || disabled,
      showTips,
      selected: isSelected,
      icon,
      focused: index === activeIndex
    };

    let tabIndex;
    if (WCAG) {
      tabIndex = newData.disabled ? -1 : 0;
    }

    return (
      <li
        role="option"
        className={classNames(`${prefix}list__body-single-row`,
          className,
          { disabled: newData.disabled },
          { selected: newData.selected },
          { focus: newData.focused })
        }
        key={`li_${index}`}
        title={showTips ? text : ''}
        onClick={event => this.click({ item: newData, event })}
        aria-selected={isSelected}
        tabIndex={tabIndex}
      >
        {
          isFunction(renderer) ?
            renderer.call(this, { config, item: newData }) :
            this.renderCell({ config, item: newData })
        }
      </li>
    );
  }

  renderCell({ config, item }) {
    const { checkable, showIcon } = config;
    const {
      // index,
      text,
      icon,
      disabled,
      selected
    } = item;
    return (
      <div className="rowcontainer">
        {checkable &&
          <Checkbox
            disabled={disabled}
            checked={selected}
            onClick={event => this.click({ item, event })}
          />}
        {decodeHtmlStr(text)}
        {/* <SafeText className="rowText" key={`formatter_${index}`} text={text} /> */}
        {showIcon && icon && <span className={classNames('row-icon', { [icon]: showIcon })} />}
      </div>
    );
  }

  render() {
    const { data, config: { prefix } } = this.props;

    return (
      <ul
        ref={(ul) => { this.ul = ul; }}
        className={`${prefix}list__body-single`}
        role="group"
      >
        {
          data.map((rowData, rowIndex) => this.renderRow(rowData, rowIndex))
        }
      </ul>
    );
  }
}

export default SingleColumnList;
