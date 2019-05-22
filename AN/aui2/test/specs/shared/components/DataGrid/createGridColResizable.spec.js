import React from 'react';
import { mount, unmount } from 'enzyme';
import DataGrid from 'shared/components/DataGrid';
import createGridColResizable from 'shared/components/DataGrid/createGridColResizable';
import * as da from 'react-base-ui/lib/utils/dataAccess';

const data = [
  {
    "booking_number": 2,
    "customer_name": "Jay Payment Plan Roy",
    "event_name": "--",
    "event_number": 0,
    "expiration_date": null,
    "has_uploaded_file": false,
    "invoice_total": 0,
    "outstanding_balance": 0,
    "payers": null,
    "permit_end_date": "13 Jan 2017",
    "permit_id": 3647,
    "permit_number": "R9003009",
    "permit_start_date": "13 Jan 2017",
    "permit_status": "Tentative",
    "reservation_date": null,
    "site_name": "Springfield",
    "status_id": 2,
    "system_user": null
  },
  {
    "booking_number": 1,
    "customer_name": "Jill Chen",
    "event_name": "--",
    "event_number": 0,
    "expiration_date": null,
    "has_uploaded_file": false,
    "invoice_total": 0,
    "outstanding_balance": 0,
    "payers": null,
    "permit_end_date": "13 Jan 2017",
    "permit_id": 3648,
    "permit_number": "R9003010",
    "permit_start_date": "13 Jan 2017",
    "permit_status": "Tentative",
    "reservation_date": null,
    "site_name": "Springfield",
    "status_id": 2,
    "system_user": null
  },
  {
    "booking_number": 2,
    "customer_name": "Jill Chen",
    "event_name": "--",
    "event_number": 0,
    "expiration_date": null,
    "has_uploaded_file": false,
    "invoice_total": 0,
    "outstanding_balance": 0,
    "payers": null,
    "permit_end_date": "13 Jan 2017",
    "permit_id": 3649,
    "permit_number": "R9003011",
    "permit_start_date": "13 Jan 2017",
    "permit_status": "Approved",
    "reservation_date": null,
    "site_name": "Springfield",
    "status_id": 2,
    "system_user": null
  }];

const eventNameColumn = {
  name: 'event_name',
  value: 'eventname',
  title: 'EVENT NAME',
  cellClassName: 'grid-event-name-column',
  render(cellContent, key, item) {
    return (
      <div className="aaui-table-cell">{da.get(item, 'event_name')}</div>
    );
  },
  headerCellOptions: {
    'data-min-width': 115
  }
};

const permitNumberColumn = {
  name: 'permit_number',
  value: 'permitnumber',
  title: `Permit #`,
  cellClassName: 'align-right grid-permit-number-column',
  headerCellOptions: {
    'data-min-width': 100
  }
};

const permitStartDateColumn = {
  name: 'permit_start_date',
  value: 'startscheduledate',
  title: 'START DATE',
  cellClassName: 'grid-permit-start-date-cell',
  render(cellContent, key, item) {
    const permitStartDate = da.get(item, 'permit_start_date');
    return (
      <div className="aaui-table-cell">{permitStartDate || '--'}</div>
    );
  },
  headerCellOptions: {
    'data-min-width': 105
  }
};

const columns = [eventNameColumn, permitStartDateColumn, permitNumberColumn];

describe('shared/components/DataGrid/createGridColResizable', () => {

  it('Resizable function should work fine', () => {
    const onResized = jest.fn();
    const onResizing = jest.fn();
    const dataGridComponent = mount(
      <DataGrid sticky resizable data={data} columns={columns} />
    );

    const options = { onResized, onResizing, handleContainerParentClass: 'sticky' };
    const resizeDataGrid = createGridColResizable(dataGridComponent.find('.aaui-table-resizer').node, options);

    expect(resizeDataGrid.domElmTable.querySelectorAll('div.col-resize-container')).toHaveLength(1);
    expect(resizeDataGrid.domElmTable.querySelectorAll('div.drag-handle')).toHaveLength(3);
    expect(resizeDataGrid.domElmTable.querySelectorAll('div.col-resizer')).toHaveLength(3);

    resizeDataGrid.onWindowResize();

    const dragger = resizeDataGrid.domElmTable.querySelectorAll('div.drag-handle')[1];
    const mockMouseDownEvent = {
      index: 1, currentTarget: dragger, pageX: 0, preventDefault: () => {}
    };
    expect(resizeDataGrid.resizeClassBound).toBeFalsy();
    resizeDataGrid.onGripMouseDown(mockMouseDownEvent);
    expect(resizeDataGrid.drag).not.toBeNull();
    expect(resizeDataGrid.resizeClassBound).toBeTruthy();

    const mockMouseMoveEvent = {
      pageX: 50, preventDefault: () => {}
    };
    resizeDataGrid.onMouseMove(mockMouseMoveEvent);
    expect(onResizing).toHaveBeenCalled();
    expect(onResized).not.toHaveBeenCalled();

    resizeDataGrid.onMouseUp({});
    expect(resizeDataGrid.drag).toBeNull();
    expect(onResized).toHaveBeenCalled();

    resizeDataGrid.onGripMouseDown(mockMouseDownEvent);
    resizeDataGrid.onMouseUp({});

    resizeDataGrid.onWindowResize();

    const rebindReturnedValue = createGridColResizable(dataGridComponent.find('.aaui-table-resizer').node);
    expect(resizeDataGrid).toEqual(rebindReturnedValue);
  });

  it('Resizable function should work fine with disabled columns and not live drag', () => {
    const onResized = jest.fn();
    const onResizing = jest.fn();
    const dataGridComponent = mount(
      <DataGrid sticky resizable data={data} columns={columns} />
    );

    const options = { onResized, onResizing, disabledColumns: [0], liveDrag: false, headerOnly: false, handleContainerParentClass: 'sticky' };
    const resizeDataGrid = createGridColResizable(dataGridComponent.find('.aaui-table-resizer').node, options);

    expect(resizeDataGrid.domElmTable.querySelectorAll('div.col-resize-container')).toHaveLength(1);
    expect(resizeDataGrid.domElmTable.querySelectorAll('div.drag-handle')).toHaveLength(3);
    expect(resizeDataGrid.domElmTable.querySelectorAll('div.drag-handle.disabled-drag')).toHaveLength(1);
    expect(resizeDataGrid.domElmTable.querySelectorAll('div.col-resizer')).toHaveLength(3);

    const dragger = resizeDataGrid.domElmTable.querySelectorAll('div.drag-handle')[1];
    const mockMouseDownEvent = {
      index: 1, currentTarget: dragger, pageX: 0, preventDefault: () => {}
    };
    expect(resizeDataGrid.resizeClassBound).toBeFalsy();
    resizeDataGrid.onGripMouseDown(mockMouseDownEvent);
    expect(resizeDataGrid.drag).not.toBeNull();
    expect(resizeDataGrid.resizeClassBound).toBeTruthy();

    const mockMouseMoveEvent = {
      pageX: 5, preventDefault: () => {}
    };
    resizeDataGrid.onMouseMove(mockMouseMoveEvent);
    expect(onResizing).not.toHaveBeenCalled();
    expect(onResized).not.toHaveBeenCalled();

    resizeDataGrid.onMouseUp({});
    expect(resizeDataGrid.drag).toBeNull();
    expect(onResizing).not.toHaveBeenCalled();
    expect(onResized).toHaveBeenCalled();

    resizeDataGrid.onWindowResize();
  });

  it('Resizable function should work fine in negative condition', () => {
    const dataGridComponent = mount(
      <div>
        <div className="not-for-resize" />
        <DataGrid sticky resizable data={data} columns={columns} />
      </div>
    );

    const resizeDataGrid = createGridColResizable(dataGridComponent.find('.aaui-table-resizer').node);

    expect(resizeDataGrid.domElmTable.querySelectorAll('div.col-resize-container')).toHaveLength(0);
    expect(resizeDataGrid.domElmTable.querySelectorAll('div.drag-handle')).toHaveLength(0);
    expect(resizeDataGrid.domElmTable.querySelectorAll('div.col-resizer')).toHaveLength(0);

    const parentNode = resizeDataGrid.domElmTable.parentNode;

    expect(parentNode.querySelectorAll('div.col-resize-container')).toHaveLength(1);
    expect(parentNode.querySelectorAll('div.drag-handle')).toHaveLength(3);
    expect(parentNode.querySelectorAll('div.col-resizer')).toHaveLength(3);

    const mockMouseMoveEvent = {
      pageX: 50, preventDefault: () => {}
    };
    expect(resizeDataGrid.drag).not.toBeDefined();
    resizeDataGrid.onMouseMove(mockMouseMoveEvent);
    resizeDataGrid.onMouseUp({});
    expect(resizeDataGrid.drag).not.toBeDefined();

    resizeDataGrid.onWindowResize();
  });

  it('Resizable function should not throw error when bind element not exist', () => {
    const dataGridComponent = mount(
      <DataGrid data={data} columns={columns} />
    );

    const resizeDataGrid = createGridColResizable(dataGridComponent.find('.aaui-table-resizer').node);
    expect(resizeDataGrid).toBeNull();
  });

  it('Resizable function change stick state should work fine', () => {
    const dataGridComponent = mount(
      <DataGrid sticky resizable data={data} columns={columns} />
    );

    const options = { handleContainerParentClass: 'sticky' };
    const resizeDataGrid = createGridColResizable(dataGridComponent.find('.aaui-table-resizer').node, options);

    expect(resizeDataGrid.domElmTable.querySelectorAll('div.col-resize-container')).toHaveLength(1);
    expect(resizeDataGrid.domElmTable.querySelectorAll('div.drag-handle')).toHaveLength(3);
    expect(resizeDataGrid.domElmTable.querySelectorAll('div.col-resizer')).toHaveLength(3);

    resizeDataGrid.changeGripsStickState(true);
    expect(resizeDataGrid.domElmTable.querySelectorAll('div.col-resize-container.col-resize-container-sticky')).toHaveLength(1);

    resizeDataGrid.changeGripsStickState(true, {});
    expect(resizeDataGrid.domElmTable.querySelectorAll('div.col-resize-container.col-resize-container-sticky')).toHaveLength(1);

    resizeDataGrid.changeGripsStickState(false, { top: 0, left: 0 });
    expect(resizeDataGrid.domElmTable.querySelectorAll('div.col-resize-container.col-resize-container-sticky')).toHaveLength(0);
    expect(resizeDataGrid.domElmTable.querySelectorAll('div.col-resize-container')).toHaveLength(1);
  });
});
