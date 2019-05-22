import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import identity from 'lodash/identity';
import debounce from 'lodash/debounce';

import Input from '../Input';

const ListHeaderPropTypes = {
  disabled: PropTypes.bool,
  onFilter: PropTypes.func,
  refFilterInput: PropTypes.func,
  filterPlaceholder: PropTypes.string
};

const ListHeaderProps = {
  disabled: false,
  onFilter: identity,
  refFilterInput: identity,
  filterPlaceholder: 'Filter...'
};

class ListHeader extends React.PureComponent {
  static displayName = 'ListHeader';
  static propsType = ListHeaderPropTypes;
  static defaultProps = ListHeaderProps;

  renderFilter() {
    const { disabled, onFilter, filterPlaceholder, refFilterInput } = this.props;
    return (<Input
      size="md"
      preIcon="icon-search"
      disabled={disabled}
      placeholder={filterPlaceholder}
      inputRef={refFilterInput}
      onChange={debounce(e => onFilter({ keyword: e.target.value }), 300)}
    />);
  }

  render() {
    return (
      <div className={classNames('an-columnlist__header')} >
        {this.renderFilter()}
      </div>
    );
  }
}

export default ListHeader;
