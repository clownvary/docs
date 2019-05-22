import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';
import toJson from 'enzyme-to-json';
import filter from 'lodash/filter';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import InputDate from 'react-base-ui/lib/components/InputDate';

import CopyPermitView from 'index/ReservationDetail/components/CopyPermit';

import permitEventsJson from 'json/ReservationDetail/fetchPermitEvents.json';

const initialState = {
  initialData : {
    currentDate :'2018/09/18',
    dateFormat:'YYYY-MM-DD',
    permitID:'111',
    batchID:'222',
    receiptID:'333'
  },
  permitEvents: permitEventsJson.body.events,
  redirect: jest.fn()
}
const setup = (props) => {
  const state = Object.assign({}, initialState, props);
  const component = mount(<CopyPermitView {...state}/>);
  const instance = component.instance();

  return {
    component,
    instance
  };
};

describe('index -> ReservationDetail -> components -> ActionBar -> CopyPermitView', () => {
  it('CopyPermitView should initial fine', () => {
    const { component, instance } = setup();
    expect(instance.date).toEqual('2018-09-18');
    expect(instance.event).toEqual(initialState.permitEvents[0])
    expect(toJson(component)).toMatchSnapshot();
  });
  it('dropdown is null when event is only one', () => {
    const { component } = setup({permitEvents: [permitEventsJson.body.events[0]]});
    const dropDown = component.find(Dropdown);
    expect(dropDown.length).toEqual(0);
    expect(toJson(component)).toMatchSnapshot();
  });
  it('onEventsChange should be triggered correctly', () => {
    const { component, instance } = setup();
    const dropDown = component.find(Dropdown).first();
    const spy = jest.spyOn(instance,'onEventsChange');
    const destEvent = filter(permitEventsJson.body.events, e=>e.id == 21)[0];
    dropDown.prop('onChange')({value:21});
    expect(instance.event).toEqual(destEvent);
  });
  it('onDateChange should be triggered correctly', () => {
    const { component, instance } = setup();
    const inputDate = component.find(InputDate).first();
    const spy = jest.spyOn(instance,'onDateChange');
    inputDate.prop('onValueChange')({value: moment('2018/09/18')});
    expect(instance.date).toEqual(moment('2018/09/18').format(initialState.initialData.dateFormat));
  });
  it('onConfirm should run correctly',()=>{
    __STATIC__ = false;

    const spy = jest.fn();
    const { instance } = setup({redirect:spy});
    const paramUrl = "/ui.do?method=booking&batch_id=222&permit_id=111&draft_receipt_id=333&event_id=21&event_start_date=2018-09-18&entry_page_index=undefined&calendar_month_date=undefined&calendar_day_date=undefined&calendar_view_type=undefined&calendar_date_format=undefined";
    instance.onConfirm();
    expect(spy).toHaveBeenCalledWith(paramUrl);
    __STATIC__ = true;

  });
  it('fixZIndex should be triggered correctly', () => {
    const { component, instance } = setup();
    const inputDate = component.find(InputDate).first();
    const spy = jest.spyOn(instance,'fixZIndex');

    const  popupCalendar = document.createElement('div');
    const   popupDesk = document.createElement('div');
    popupCalendar.className = 'an-popup-Calendar-service';
    popupDesk.className = 'an-popup-desk';
    popupCalendar.appendChild(popupDesk);
    document.body.appendChild(popupCalendar);
    inputDate.prop('onCalendarOpen')();
    expect(popupDesk.style.zIndex).toEqual('9999');
  });
});
