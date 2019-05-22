import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isFunction from 'lodash/isFunction';

import Input from '../Input';

const HeaderPropTypes = {
  config: PropTypes.shape({
    disabled: PropTypes.bool,
    filterable: PropTypes.bool // can be filter by inputted value
  }),

  onFilter: PropTypes.func
};

class Header extends React.PureComponent {
  static displayName = 'Header';
  static propsType = HeaderPropTypes;

  renderFilter() {
    const { config: { disabled, filterable }, onFilter } = this.props;
    return filterable && isFunction(onFilter) &&
      (<Input
        preIcon="icon icon-search"
        disabled={disabled}
        onChange={e => onFilter({ filter: e.target.value })}
      />);
  }

  render() {
    const { config: { prefix, filterable }, onFilter } = this.props;

    const isHeaderEmpty = !(filterable && isFunction(onFilter));
    return (
      !isHeaderEmpty ?
        <div className={classNames(`${prefix}list__header`, { hidden: isHeaderEmpty })} >
          {this.renderFilter()}
        </div> : null
    );
  }
}

export default Header;
