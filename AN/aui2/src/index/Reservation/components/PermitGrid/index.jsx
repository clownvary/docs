import React from 'react';
import { connect } from 'react-redux';
import { Dock } from 'react-base-ui/lib/consts';
import Tooltip from 'react-base-ui/lib/components/Tooltip';
import * as da from 'react-base-ui/lib/utils/dataAccess';
import { Authority, AuthorityID } from 'shared/authorities';
import UIComponent from 'shared/components/UIComponent';
import DataGrid from 'shared/components/DataGrid';
import storeShape from 'shared/utils/storeShape';
import createColResizable from 'shared/components/DataGrid/createGridColResizable';
import debounce from 'lodash/debounce';
import { allColumns, authorityColumns } from './columns';
import { getFilters, getParams } from '../../utils/permitFilterFunc';
import {
  fetchPermits,
  selectPermit,
  changePageThenFetchPermits,
  changeSort,
  isPermitAccessible,
  fetchPermitEventInfo
} from '../../actions/permitGrid';
import fetchStatus from '../../consts/permitsTooltipFetchStatus';
import EventInfoTooltip from './EventInfoTooltip';
import './index.less';

export class PermitGrid extends UIComponent {
  constructor(props, context) {
    super(props, context);

    this.debouncedShowEventInfo =
      debounce(this.debouncedShowEventInfo, 400);
  }

  render() {
    const { permits, topOffset, bottomOffset } = this.props;
    const pagination = permits.get('pagination');
    const data = permits.get('data');

    let columns = allColumns;

    if (Authority.isHidden(AuthorityID.PERMIT_ACTIONS)) {
      columns = authorityColumns;
    }

    if (da.count(data) > 0) {
      setTimeout(() => {
        const options = { disabledColumns: [0], handleContainerParentClass: 'sticky' };
        this.resizableGrid = createColResizable(document.querySelector('.aaui-table-resizer'), options);
      }, 200);
    }

    return (
      <div className="permits-list">
        <DataGrid
          resizable
          data={data}
          selectedPermit={permits.get('selectedPermit')}
          emptyDataMessage={permits.get('emptyDataMessage')}
          columns={columns}
          sortOrder={permits.get('sort')}
          pagination={pagination}
          bodyStyle={{ maxHeight: undefined }}
          onChange={pageNumber => this.changePage(pageNumber)}
          onSort={sort => this.sortPermits(sort)}
          onSelect={permit => this.selectPermit(permit)}
          onMouseEnter={(e, item) => {
            e.persist();
            this.debouncedShowEventInfo(e, item);
          }}
          onMouseLeave={() => {
            this.debouncedShowEventInfo.cancel();
            Tooltip.close();
          }}
          OnClick={(e, permit) => this.clickPermit(e, permit)}
          sticky={{
            stickyStyle: { zIndex: 1 },
            scrollXFollow: true,
            topOffset,
            bottomOffset,
            onStuck: ({ top, left }) => {
              this.resizableGrid &&
              this.resizableGrid.changeGripsStickState(true, { top, left });
            },
            onDetached: () => {
              this.resizableGrid &&
              this.resizableGrid.changeGripsStickState(false, { top: 0, left: 0 });
            }
          }}
        />
      </div>
    );
  }

  debouncedShowEventInfo(e, item) {
    const fetched = da.get(item, 'fetched');
    const permitId = da.get(item, 'permit_id');

    let content = <EventInfoTooltip item={item} />;
    if (fetched === fetchStatus.NOT_FETCHED) {
      content = this.props.fetchPermitEventInfo(permitId).then(() => {
        const { permits } = this.props;
        const index = permits.getIn(['data']).findIndex(permit => permit.get('permit_id') === permitId);
        if (index >= 0) {
          const updatedItem = permits.getIn(['data', index]);
          return <EventInfoTooltip item={updatedItem} />;
        }

        return (<span>Not found!</span>);
      });
    }

    const dockStyle = Dock.BOTTOM_CENTER;
    const tooltipOptions = {
      className: 'an-eventinfo-tooltip',
      dockStyle,
      distance: 16,
      content
    };

    Tooltip.open(e.target, tooltipOptions);
  }

  static combineParams(sort, headerInfo, filters) {
    const headersInfo = Object.assign({}, sort, headerInfo);
    return getParams(getFilters(filters), headersInfo);
  }

  changePage(pageNumber) {
    const { filters, permits } = this.props;
    const params = PermitGrid.combineParams(permits.get('sort').toJS(), { pageNumber }, filters);
    this.props.changePageThenFetchPermits(pageNumber, params);
  }

  sortPermits({ sortField, isDesc }) {
    const { permits, filters } = this.props;
    const current = permits.get('pagination').get('current');
    const sort = { orderOption: isDesc ? 'asc' : 'desc', orderBy: sortField };

    this.props.changeSort(sort);
    const params = PermitGrid.combineParams(sort, { pageNumber: current }, filters);
    this.props.fetchPermits(params);
  }

  selectPermit(permit) {
    this.props.selectPermit(permit);
  }

  clickPermit(e, permit) {
    if (e.target.parentNode.tagName !== 'LABEL') {
      this.props.isPermitAccessible(permit);
    }
  }
}

PermitGrid.contextTypes = {
  store: storeShape
};

PermitGrid.propTypes = {
  store: storeShape
};

export default connect(
  null,
  {
    fetchPermits,
    selectPermit,
    changePageThenFetchPermits,
    changeSort,
    isPermitAccessible,
    fetchPermitEventInfo
  }
)(PermitGrid);
