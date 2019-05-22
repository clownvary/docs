import React from 'react';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import convertCasingPropObj from 'shared/utils/convertCasingPropObj';
import EventDetail from 'index/ReservationDetail/components/EventList/EventDetail';
import { wrapEventIndex } from 'index/ReservationDetail/utils/eventKeymanager';
import FeeSection from 'shared/components/PermitFee/FeeSection';
import { Authority } from 'shared/authorities';

jest.mock('shared/components/PermitFee/FeeSection', () => 'FeeSection');

// EventDetail props begin
const createProps = (eventID = 1, overrides) => {
  const eventIndex = `${eventID}`;

  const eventDetail = {
    isShow: {
      [wrapEventIndex(eventIndex)]: true
    }
  };

  const waiverList = {
    allWaivers: {
      [wrapEventIndex(eventIndex)]: {}
    },
    data: []
  };

  const noteList = {
    allNotes: {
      [wrapEventIndex(eventIndex)]: {}
    }
  };

  const facility = {
    allFacilities: {
      [wrapEventIndex(eventIndex)]: {
        eventFee: {
          facilityFees: []
        }
      }
    }
  };

  const eventActionInformation = convertCasingPropObj(__reservationDetail__.__initialState__.reservationDetail.event_action_information);

  const allEventConfig = {
    hideReservationCharges: false,
    hideNotesSection: false,
    hideChecklistItemsSection: false,
    hideCustomQuestionsSection: false
  };

  const authorities = convertCasingPropObj(window.__reservationDetail__.__initialState__.authorities);

  const errorHighlight = true;
  const isTrrigerCustomerSearch = false;
  const isPermitUpdatingMode = false;
  const rules = [];
  const initialData = {
    permitLabel: ''
  };
  return {
    initialData,
    eventDetail: fromJS(eventDetail),
    questions: [],
    errors: [],
    hasRequiredQuestion: true,
    waiverList: fromJS(waiverList),
    noteList: fromJS(noteList),
    facility: fromJS(facility),
    allEventConfig: fromJS(allEventConfig),
    rules,
    eventIndex,
    authorities,
    errorHighlight,
    isPermitUpdatingMode,
    eventActionInformation,
    isTrrigerCustomerSearch,
    addQuestionList: [],
    ...overrides
  };
};

describe('index -> ReservationDetail -> components -> EventDetail', () => {
  Authority.init(window.__authoritiy__);
  const setup = (eventID, overrides) => mount(<EventDetail {...createProps(eventID, overrides)} />);

  it('render component correctly', () => {
    const component = mount(<EventDetail {...createProps()} />);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('render component correctly if no data', () => {
    const props = createProps(
      1, { eventIndex: '2', errorHighlight: false }
    );
    props.allEventConfig = props.allEventConfig.mapEntries(([k, v]) => [k, !v]);
    const component = mount(<EventDetail {...props} />);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('component should work fine', () => {
    const fetchReservationFeeThenUpdate = jest.fn();
    const loadAddableWaivers = jest.fn();
    const addQuestion = jest.fn();
    const component = setup(1, { fetchReservationFeeThenUpdate, loadAddableWaivers, addQuestion });
    component.instance().loadAddableWaivers();
    expect(loadAddableWaivers).toHaveBeenCalled();
    component.instance().addQuestion();
    expect(addQuestion).toHaveBeenCalled();

    component.find(FeeSection).props().fetchPermitFee();
    expect(fetchReservationFeeThenUpdate).toHaveBeenCalled();
  });
});
