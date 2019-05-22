import React from 'react';
import PropTypes from 'prop-types';
import identity from 'lodash/identity';
import isFunction from 'lodash/isFunction';
import classNames from 'classnames';
import { SortOrder } from '../../consts';

const ListFooterPropTypes = {
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  showCount: PropTypes.bool,
  showClear: PropTypes.bool,
  showSorter: PropTypes.bool,
  showMessage: PropTypes.bool,
  count: PropTypes.string,
  message: PropTypes.string,
  sortOrder: PropTypes.string,
  selectedKeys: PropTypes.array,
  onSort: PropTypes.func,
  onClear: PropTypes.func
};

const ListFooterProps = {
  disabled: false,
  isLoading: false,
  showClear: false,
  showCount: false,
  showSorter: false,
  showMessage: false,
  count: '',
  message: '',
  sortOrder: SortOrder.ORIGIN,
  selectedKeys: [],
  onSort: identity,
  onClear: identity
};

class ListFooter extends React.PureComponent {
  static displayName = 'ListFooter';
  static propsType = ListFooterPropTypes;
  static defaultProps = ListFooterProps;

  renderSorter() {
    const { disabled, onSort, sortOrder } = this.props;
    let sorter;

    switch (sortOrder) {
      case SortOrder.ORIGIN:
        sorter = (<i
          className="icon sorter icon-sort"
          disabled={disabled}
          onClick={() => !disabled && onSort(SortOrder.DESC)}
        />);
        break;
      case SortOrder.DESC:
        sorter = (<i
          className="icon sorter icon-sort-desc"
          disabled={disabled}
          onClick={() => !disabled && onSort(SortOrder.ASC)}
        />);
        break;
      case SortOrder.ASC:
        sorter = (<i
          className="icon sorter icon-sort-asc"
          disabled={disabled}
          onClick={() => !disabled && onSort(SortOrder.ORIGIN)}
        />);
        break;
      default:
        break;
    }

    return sorter;
  }

  renderClear() {
    const { selectedKeys, disabled, onClear } = this.props;
    return (
      <div
        className="clear"
        disabled={disabled || selectedKeys.length <= 0}
        onClick={onClear}
      >
        Clear
      </div>
    );
  }

  renderCount() {
    const { disabled, count } = this.props;
    return (<span className="count" disabled={disabled}>{count}</span>);
  }

  renderLoading() {
    return (<div className="loading">
      <i className="icon icon-spinner" />
      <span> loading...</span>
    </div>);
  }

  renderMessage() {
    return (<span className="message">{this.props.message}</span>);
  }

  render() {
    const {
      onSort,
      isLoading,
      showCount,
      showClear,
      showSorter,
      showMessage
    } = this.props;

    const _showSorter = showSorter && isFunction(onSort);

    const showFooter = (
      isLoading ||
      showCount ||
      showClear ||
      showMessage ||
      _showSorter
    );

    return showFooter && (
      <div className={classNames('an-columnlist__footer')} >
        <div>
          { isLoading && this.renderLoading() }
          { !isLoading && _showSorter && this.renderSorter() }
          { !isLoading && showClear && this.renderClear() }
        </div>
        <div>
          { showMessage && this.renderMessage() }
          { !showMessage && showCount && this.renderCount() }
        </div>
      </div>);
  }
}

export default ListFooter;
