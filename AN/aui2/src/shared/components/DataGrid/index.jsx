import React from 'react';
import * as da from 'react-base-ui/lib/utils/dataAccess';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import UIComponent from 'shared/components/UIComponent';
import Pagination from 'shared/components/Pagination';
import Sticky from 'shared/components/Sticky';
import './index.less';

export default class AAUIDataGrid extends UIComponent {
  constructor(props) {
    super(props);
    this.onChangePage = this.onChangePage.bind(this);
  }

  render() {
    const { data, columns, children, pagination, emptyDataMessage, bodyStyle = {},
      sticky, resizable } = this.props;
    const columnLen = (columns.count && columns.count()) || columns.length;
    const maxHeight = bodyStyle.maxHeight || 510;

    return (
      <div className={`aaui-table ${resizable ? 'aaui-table-resizer' : ''}`}>
        {sticky ?
          <Sticky {...sticky}>
            <div
              className={`aaui-table-header aaui-flexbox afx-xl-${columnLen} ${(bodyStyle.maxHeight && maxHeight < data.size * 51) ? 'adjust-width' : ''}`}
            >
              {this.headerRender()}
            </div>
          </Sticky> :
          <div
            className={`aaui-table-header aaui-flexbox afx-xl-${columnLen} ${(bodyStyle.maxHeight && maxHeight < data.size * 51) ? 'adjust-width' : ''}`}
          >
            {this.headerRender()}
          </div>
        }

        <div className={`aaui-table-body ${data.size > 0 ? '' : 'empty'}`} style={bodyStyle}>
          {
            data.size ?
              data.map((row, key) => (
                <div
                  key={key}
                  className={`aaui-table-row aaui-flexbox afx-xl-${columnLen}`}
                  onClick={(e) => { this.onClickItem(e, row.get('permit_id')); }}
                >
                  {columns.map((column, k) => {
                    const cellContent = da.get(row, da.get(column, 'name'));
                    const columnRender = da.get(column, 'render');
                    const hasColumnRender = columnRender && typeof columnRender === 'function';

                    return (
                      <div key={k} className={`aaui-table-body-cell ${da.get(column, 'cellClassName') || ''}`}>
                        {
                            hasColumnRender ? columnRender.call(this, cellContent, key, row) :
                            <div className="aaui-table-cell">{decodeHtmlStr(cellContent)}</div>
                          }
                      </div>
                    );
                  })}
                </div>
                )) : <p className="aaui-table-row-empty">{emptyDataMessage}</p>
          }
        </div>
        {children}
        {pagination ? this.renderPagination.call(this, pagination) : ''}
      </div>
    );
  }

  headerRender = () => this.props.columns.map((item, key) => (
    <div key={key} className={`aaui-table-header-cell ${da.get(item, 'cellClassName') || ''}`} {...item.headerCellOptions}>
      {da.get(item, 'renderHeader') ? da.get(item, 'renderHeader').call(this, item, key) : this.headerCell.call(this, item)}
    </div>
  ))

  headerCell = (item) => {
    const hasSortBar = da.get(item, 'hasSortBar');
    const title = da.get(item, 'title');
    const sortField = da.get(item, 'value');
    const onSort = (({ sortField: field, isDesc }) => {
      /* istanbul ignore next */
      if (this.props.onSort) {
        this.props.onSort({ sortField: field, isDesc });
      }
    });

    if (hasSortBar) {
      const orderBy = this.props.sortOrder.get('orderBy');
      const orderOption = this.props.sortOrder.get('orderOption');
      let sort = '';

      /* istanbul ignore next */
      if (orderBy === sortField) {
        sort = orderOption;
      }

      const isDesc = sort === 'desc';

      return (
        <div className="aaui-flexbox" onClick={() => { onSort({ sortField, isDesc }); }}>
          <span>{title}</span>
          <span className="aaui-table-sort">
            <i className={`icon aaui-table-sort-asc ${sort === 'asc' ? 'active' : ''}`} />
            <i className={`icon aaui-table-sort-desc ${sort === 'desc' ? 'active' : ''}`} />
          </span>
        </div>
      );
    }

    return title;
  }

  renderPagination(pagination) {
    let className = '';
    let total = 0;
    let paginationObj = pagination;
    /* istanbul ignore else */
    if (da.isImmutable(paginationObj)) {
      paginationObj = paginationObj.toJS();
    }
    total = paginationObj.total;
    /* istanbul ignore else */
    if (!total || total === 1) {
      className = 'pagination-hidden';
    }

    return (
      <Pagination
        {...paginationObj}
        baseUrl=""
        queryString=""
        theme="b"
        className={className}
        onChangePage={this.onChangePage}
      />);
  }

  onSelectItem = (e, item) => {
    this.props.onSelect && this.props.onSelect(e.target.checked ? item.toJS() : null);
  }

  onClickItem = (e, permitID) => {
    this.props.OnClick && this.props.OnClick(e, permitID);
  }

  onMouseEnter = (e, ...rest) => {
    /* istanbul ignore else */
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(e, ...rest);
    }
  }

  onMouseLeave= (e) => {
    /* istanbul ignore else */
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e);
    }
  }

  onChangePage = ({ value }) => {
    const onChange = this.props.onChange;

    /* istanbul ignore else */
    if (onChange && typeof onChange === 'function') {
      this.props.onChange(value);
    }

    return false;
  }
}
