import React from 'react';
import PropTypes from 'prop-types';
import Table from '../Table';

import { ListType } from '../../consts';

const MultipleColumnsListPropTypes = {
  data: PropTypes.arrayOf({
    index: PropTypes.oneOf([PropTypes.number, PropTypes.string]).isRequired,
    value: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
    showTips: PropTypes.bool,
    onClick: PropTypes.func.isRequired
  }).isRequired,
  columns: PropTypes.arrayOf({
    title: PropTypes.string,
    value: PropTypes.string.isRequired,
    class: PropTypes.string,
    render: PropTypes.func
  }).isRequired,
  config: PropTypes.shape({
    selectionMode: PropTypes.instanceOf(ListType),
    disabled: PropTypes.bool,
    maxHeight: PropTypes.string,
    showTips: PropTypes.bool
  })
};

class MultipleColumnsList extends React.PureComponent {
  static displayName = 'MultipleColumnsList';
  static propsType = MultipleColumnsListPropTypes;

  render() {
    const {
      data,
      columns,
      config
    } = this.props;

    return (
      <Table {...config} rows={data} columns={columns} />
    );
  }
}

export default MultipleColumnsList;
