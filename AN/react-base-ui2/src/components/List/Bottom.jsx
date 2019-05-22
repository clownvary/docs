import React from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';
import classNames from 'classnames';

import Checkbox from '../Checkbox';

import { SortOrder } from '../../consts';

const BottomPropTypes = {
  config: PropTypes.shape({
    disabled: PropTypes.bool,
    checkable: PropTypes.bool, // determine whether show the checkbox before list item
    showCheckAll: PropTypes.bool, // determine whether show the checkbox before list item
    sortable: PropTypes.bool // can be sorted
  }),

  onSort: PropTypes.func,
  onCheckAll: PropTypes.func
};

class Bottom extends React.PureComponent {
  static displayName = 'Bottom';
  static propsType = BottomPropTypes;

  renderCheckbox() {
    const { config: { disabled, checkable, showCheckAll }, onCheckAll } = this.props;
    return checkable && showCheckAll &&
      (<Checkbox
        disabled={disabled}
        onChange={e => onCheckAll(e.target.checked)}
      />);
  }

  renderSort() {
    const { config: { disabled, sortable }, onSort } = this.props;
    return sortable && isFunction(onSort) &&
      (<span>
        <i className="icon icon-caret-up" onClick={() => !disabled && onSort(SortOrder.ASC)} />
        <span>test</span>
        <i className="icon icon-caret-down" onClick={() => !disabled && onSort(SortOrder.DESC)} />

      </span>);
  }

  renderPageCount() {
    const { config: { asyncable }, data } = this.props;
    return (
      asyncable && <span> {data.length} </span>
    );
  }

  renderLoading() {
    const { isLoading } = this.props;
    return (
      isLoading && <div className="icon icon-loading-m icon-spin">loading...</div>
    );
  }

  render() {
    const {
      config: {
      prefix,
      checkable,
      showCheckAll,
      sortable,
      asyncable
    },
      onSort, isLoading } = this.props;

    const isBottomEmpty = !((checkable && showCheckAll) ||
      (sortable && isFunction(onSort)) ||
      asyncable || isLoading);

    return (
      !isBottomEmpty ?
        <div className={classNames(`${prefix}list__bottom`, { hidden: isBottomEmpty })}>
          {this.renderCheckbox()}
          {this.renderSort()}
          {this.renderPageCount()}
          {this.renderLoading()}
        </div> : null
    );
  }
}

export default Bottom;
