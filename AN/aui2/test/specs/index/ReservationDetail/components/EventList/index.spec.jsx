import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';

import Alert from 'shared/components/Alert';
import { helper } from 'shared/components/Survey';

import { EventList, formValidate } from 'index/ReservationDetail/components/EventList';
import { wrapEventIndex } from 'index/ReservationDetail/utils/eventKeymanager';
import convertCasingPropObj from 'shared/utils/convertCasingPropObj';
import { Authority } from 'shared/authorities';
import EventDetail from 'index/ReservationDetail/components/EventList/EventDetail';


import jsonQuestions from 'json/ReservationDetail/questions2.json';

// jest.mock('index/ReservationDetail/components/EventList/EventDetail', () => 'EventDetail');

jest.mock('react-base-ui/lib/services/dialog',()=>{
  return {
    confirm: jest.fn(()=>{
      return Promise.resolve();
    })
  }
});
describe('index -> ReservationDetail -> components -> EventList', () => {

  const actions = {
    configEvent: jest.fn(),
    fetchEventDetail: jest.fn(),
    permitDetailsChanged: jest.fn(),

    changeQuestion: jest.fn((info) => Promise.resolve(info)),
    deleteQuestion: jest.fn(() => Promise.resolve()),

    changeWaiverByEventID: jest.fn(),
    showDetail: jest.fn(),
    setEventValidStatus: jest.fn(),
    saveWaiver: jest.fn(),
    saveNotes: jest.fn(),
    deleteEvent: jest.fn(() => Promise.resolve()),
    redirect: jest.fn(),
    buildUrl: jest.fn()
  };

  const authorities = convertCasingPropObj(window.__reservationDetail__.__initialState__.authorities);
  const enabledAuthorities = authorities.map((auth) => {
    const { id } = auth;
    return (id === 'addEvent' || id === 'editEvent' || id === 'deleteEvent')
      ? { ...auth, authorityType: 'enabled' }
      : { ...auth };
  });

  const createProps = () => {
    const eventList = convertCasingPropObj([
      {
        "event_id": 1,
        "new_entry_id": 2,
        "event_index": "1",
        "permit_id": 1,
        "event_name": "2016 Annual Party 1",
        "attendance": 100,
        "resource_count": 3,
        "booking_count": 14,
        "total_amount": 230.00
      },
      {
        "event_id": 2,
        "new_entry_id": 2,
        "event_index": "2",
        "permit_id": 1,
        "event_name": "2016 Annual Party 2",
        "attendance": 200,
        "resource_count": 1,
        "booking_count": 3,
        "total_amount": 300.00
      },
      {
        "event_id": 3,
        "new_entry_id": 2,
        "event_index": "3",
        "permit_id": 1,
        "event_name": "2016 Annual Party 3",
        "attendance": 200,
        "resource_count": 1,
        "booking_count": 3,
        "total_amount": 300.00
      },
      {
        "event_id": -1,
        "new_entry_id": 3,
        "event_index": "4",
        "permit_id": 1,
        "event_name": "2016 Annual Party 4",
        "attendance": 200,
        "resource_count": 1,
        "booking_count": 3,
        "total_amount": 300.00,
        "is_updated": true
      },
      {
        "event_id": -1,
        "new_entry_id": 3,
        "event_index": "5",
        "permit_id": 1,
        "event_name": "2016 Annual Party 5",
        "attendance": 200,
        "resource_count": 1,
        "booking_count": 3,
        "total_amount": 300.00,
        "is_updated": true,
        "is_last_modified": true
      }
    ]);

    const eventDetail = {
      eventList,
      isShow: {},
      isUpdated: {},
      allEventConfig: {},
      hasFetchedDetail: {}
    };

    const waiverList = { allWaivers: {} };
    const noteList = { allNotes: {} };
    const facility = { allFacilities: {} };
    const survey = {
      '1': {
        hasRequiredQuestion: true,
        errors: [],
        questions: helper.generateQuestionPathAndParent(jsonQuestions.body.questions)
      },
      '2': {
        hasRequiredQuestion: true,
        errors: [],
        questions: []
      }
    }

    const confirmChangeError = {
      waiverErrors: []
    };

    eventList.forEach((e) => {
      const { eventIndex } = e;
      const key = wrapEventIndex(eventIndex);

      eventDetail.isShow[key] = eventIndex === '1';
      eventDetail.isUpdated[key] = true;
      eventDetail.hasFetchedDetail[key] = eventIndex === '1';

      eventDetail.allEventConfig[key] = {
        hideReservationCharges: false,
        hideNotesSection: false,
        hideChecklistItemsSection: false,
        hideCustomQuestionsSection: false
      };

      if (eventIndex === '3' || eventIndex === '5') {
        eventDetail.isShow[key] = false;
        eventDetail.isUpdated[key] = false;
        eventDetail.hasFetchedDetail[key] = false;
        delete eventDetail.allEventConfig[key];

        confirmChangeError.waiverErrors.push({ eventIndex });
      }
    });

    const permitStatus = {
      value: 4
    };

    const eventActionInformation = convertCasingPropObj(__reservationDetail__.__initialState__.reservationDetail.event_action_information);
    const initialData = {
      permitLabel: ''
    };

    return {
      initialData,
      authorities,
      permitStatus,
      eventActionInformation,
      waiverList: fromJS(waiverList),
      noteList: fromJS(noteList),
      facility: fromJS(facility),
      // eventList: fromJS(eventList),
      eventDetail: fromJS(eventDetail),
      survey: fromJS(survey),
      confirmChangeError: fromJS(confirmChangeError)
    };
  };

  const setup = (overrides) => {
    const component = mount(<EventList
      {...createProps()}
      {...actions}
      pages={{ buildUrl: actions.buildUrl }}
      {...overrides}
    />);
    const instance = component.instance();
    return { component, instance };
  };

  const resetActions = () => Object.keys(actions).forEach(fn => actions[fn].mockClear());

  afterEach(() => {
    resetActions();
  });

  it('Should open the first event deatil automatically when there are only one event.', () => {
    Authority.init(window.__authoritiy__);
    const { component, instance } = setup({
      authorities: enabledAuthorities,
      eventList: fromJS([
        {
          "event_id": 1,
          "new_entry_id": 2,
          "event_index": "1",
          "permit_id": 1,
          "event_name": "2016 Annual Party 1",
          "attendance": 100,
          "resource_count": 3,
          "booking_count": 14,
          "total_amount": 230.00
        }
      ])
    });
    expect(actions.fetchEventDetail).toHaveBeenCalled();
  });

  it('Should collapse all of the event deatils when there are more than one event.', () => {
    Authority.init(window.__authoritiy__);
    const { component, instance } = setup({
      authorities: enabledAuthorities,
      eventList: fromJS([
        {
          "event_id": 1,
          "new_entry_id": 2,
          "event_index": "1",
          "permit_id": 1,
          "event_name": "2016 Annual Party 1",
          "attendance": 100,
          "resource_count": 3,
          "booking_count": 14,
          "total_amount": 230.00
        },
        {
          "event_id": 2,
          "new_entry_id": 2,
          "event_index": "2",
          "permit_id": 1,
          "event_name": "2016 Annual Party 2",
          "attendance": 200,
          "resource_count": 1,
          "booking_count": 3,
          "total_amount": 300.00
        }
      ])
    });
    // expect(actions.fetchEventDetail).not.toHaveBeenCalled();
    //  Authority.init(window.__authoritiy__);
    //   const { component, instance } = setup({
    //     eventList: fromJS([
    //       {
    //         "event_id": 1,
    //         "new_entry_id": 2,
    //         "event_index": "1",
    //         "permit_id": 1,
    //         "event_name": "2016 Annual Party 1",
    //         "attendance": 100,
    //         "resource_count": 3,
    //         "booking_count": 14,
    //         "total_amount": 230.00
    //       }
    //     ])
    //   });
    //   expect(actions.fetchEventDetail).toHaveBeenCalled();
  });

  it('Should collapse all of the event deatils when there are more than one event.', () => {
      Authority.init(window.__authoritiy__);
      const { component, instance } = setup({
        eventList: fromJS([
          {
            "event_id": 1,
            "new_entry_id": 2,
            "event_index": "1",
            "permit_id": 1,
            "event_name": "2016 Annual Party 1",
            "attendance": 100,
            "resource_count": 3,
            "booking_count": 14,
            "total_amount": 230.00
          },
          {
            "event_id": 2,
            "new_entry_id": 2,
            "event_index": "2",
            "permit_id": 1,
            "event_name": "2016 Annual Party 2",
            "attendance": 200,
            "resource_count": 1,
            "booking_count": 3,
            "total_amount": 300.00
          }
        ])
      });
      expect(actions.fetchEventDetail).not.toHaveBeenCalled();
  });

  it('component should render correctly', () => {
    Authority.init(enabledAuthorities);

    const { component, instance } = setup({
      authorities: enabledAuthorities
    });

    expect(component.find('div.eventList')).toHaveLength(1);
    expect(component.find('div.event')).toHaveLength(5);

    expect(component.find('i.icon-sign-m')).toHaveLength(5);
    expect(component.find('i.icon-trash')).toHaveLength(5);
    expect(component.find(EventDetail)).toHaveLength(5);
    expect(component.find(Alert)).toHaveLength(0);

    expect(instance.cache).toEqual({});

    expect(actions.configEvent).toHaveBeenCalled();
    expect(actions.permitDetailsChanged).toHaveBeenCalled();
    expect(actions.fetchEventDetail).not.toHaveBeenCalled();
  });

  it('component should render correctly if no authority', () => {
    Authority.init(authorities);
    const { component, instance } = setup({
      lastOperation: 'edited'
    });

    expect(component.find('div.eventList')).toHaveLength(1);
    expect(component.find('div.event')).toHaveLength(5);
    expect(component.find('i.icon-sign-m')).toHaveLength(0);
    expect(component.find('i.icon-trash')).toHaveLength(0);
    expect(component.find(EventDetail)).toHaveLength(5);
    expect(component.find(Alert)).toHaveLength(0);

    expect(instance.cache).toEqual({});

    expect(actions.configEvent).toHaveBeenCalled();
    expect(actions.permitDetailsChanged).toHaveBeenCalled();
    expect(actions.fetchEventDetail).toHaveBeenCalled();
  });

  it('component should work fine', () => {
    Authority.init(enabledAuthorities);

    const { component, instance } = setup({
      authorities: enabledAuthorities
    });

    resetActions();
    const editEventBtns = component.find('i.icon-sign-m');
    editEventBtns.at(0).simulate('click');
    expect(actions.redirect).toHaveBeenCalledTimes(1);
    expect(actions.buildUrl).toHaveBeenCalledTimes(1);

    resetActions();
    const expandedEventBtns = component.find('i.icon-chevron-up');
    expandedEventBtns.at(0).simulate('click');
    expect(actions.showDetail).toHaveBeenCalledTimes(1);
    expect(actions.setEventValidStatus).not.toHaveBeenCalled();
    expect(actions.fetchEventDetail).not.toHaveBeenCalled();

    resetActions();
    const expandEventBtns = component.find('.eventName .icon-chevron-down');
    expandEventBtns.at(1).simulate('click');
    expect(actions.showDetail).not.toHaveBeenCalled();
    expect(actions.setEventValidStatus).toHaveBeenCalledTimes(1);
    expect(actions.fetchEventDetail).toHaveBeenCalledTimes(1);

    resetActions();
    const deleteEventBtns = component.find('i.icon-trash');
    const deleteAlert = component.find('.modal--alert').at(0);
    expect(deleteAlert.find('div.is-open')).toHaveLength(0);
    deleteEventBtns.at(0).simulate('click');
    expect(instance.cache).toMatchObject({ deleteParams: { eventIndex: '1' } });
    setTimeout(() => {
      expect(deleteAlert.find('div.is-open')).toHaveLength(1);
      deleteAlert.find('button.btn-strong').simulate('click');
      expect(actions.deleteEvent).toHaveBeenCalled();
      expect(deleteAlert.find('div.is-open')).toHaveLength(0);
    } , 2000);


    resetActions();
    deleteEventBtns.at(0).simulate('click');
    setTimeout(() => {
      expect(deleteAlert.find('div.is-open')).toHaveLength(0);
      expect(instance.cache).toEqual({});
    }, 2000);


    resetActions();
    const eventDetail = component.find(EventDetail).at(1);

    const expandButton = eventDetail.find('icon-chevron-down');

    const inputs = component.find('.an-survey input[type="text"]');

    inputs.at(0).simulate('blur', { target: { value: '11' } });

    expect(actions.changeQuestion).toHaveBeenCalled();

    resetActions();
    eventDetail.props().changeQuestion({
      questionPath: [0],
      answer: '11',
      eventIndex: '1'
    }, () => Promise.resolve());

    expect(actions.changeQuestion).toHaveBeenCalled();

    resetActions();
    eventDetail.props().setEventValidStatus();
    expect(actions.setEventValidStatus).toHaveBeenCalled();
  });

  it.skip('form validate method should work fine', () => {
    const props = Object.assign({}, createProps(), actions);
    const errors1 = formValidate({}, props);
    expect(errors1).toEqual({ '(5508_0)_3_1': '' });
    expect(actions.stopSubmit).not.toHaveBeenCalled();
    expect(actions.updateQuestionConfirmChangeError).toHaveBeenCalled();

    resetActions();
    const props2 = Object.assign({}, createProps(), actions, {
      question: props.question.set('hideQuestions', fromJS({}))
    });
    const errors2 = formValidate({}, props2);
    expect(errors2).toEqual({});
    expect(actions.stopSubmit).not.toHaveBeenCalled();
    expect(actions.updateQuestionConfirmChangeError).toHaveBeenCalled();

    resetActions();
    const props3 = Object.assign({}, props, { isClickedConfirmChanges: true });
    const errors3 = formValidate({}, props3);
    expect(actions.updateQuestionConfirmChangeError).toHaveBeenCalled();
    expect(errors3).toEqual({ '(5508_0)_3_1': '' });
    expect(actions.stopSubmit).not.toHaveBeenCalled();
    expect(actions.updateQuestionConfirmChangeError).toHaveBeenCalled();

    resetActions();
    const props4 = Object.assign({}, props2, { isClickedConfirmChanges: true, });
    const errors4 = formValidate({ '(5508_0)_3_1': 'mock validate error' }, props4);
    expect(actions.stopSubmit).toHaveBeenCalled();
    expect(actions.updateQuestionConfirmChangeError).not.toHaveBeenCalled();
    expect(errors4).toEqual({ '(5508_0)_3_1': 'mock validate error' });

    resetActions();
    const props5 = Object.assign({}, props4, {
      isClickedConfirmChanges: false,
      confirmChangeError: props.confirmChangeError.set('questionErrors', fromJS({}))
    });
    const errors5 = formValidate({ '(5508_0)_3_1': 'mock validate error' }, props5);
    expect(actions.stopSubmit).not.toHaveBeenCalled();
    expect(actions.updateQuestionConfirmChangeError).not.toHaveBeenCalled();
    expect(errors5).toEqual({ '(5508_0)_3_1': 'mock validate error' });
  });
});
