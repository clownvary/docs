import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Error from 'shared/components/Error';
import Messager from 'shared/components/MessagerFromQueryString';
import Skylogix from 'shared/components/Skylogix';
import BreadCrumb from 'shared/components/BreadCrumb';
import ActionBar from 'index/ReservationDetail/components/ActionBar';
import { SpecialHandlingAlert } from 'shared/components/SpecialHandling';
import GeneralInformation from 'index/ReservationDetail/components/GeneralInformation';
import EventList from 'index/ReservationDetail/components/EventList';
import FeeSummary from 'index/ReservationDetail/components/FeeSummary';
import Footer from 'index/ReservationDetail/components/Footer';
import AmendmentReasonModal from 'index/ReservationDetail/components/modals/AmendmentReason';
import ReservationDetail, { ReservationDetail as ReservationDetailComponent } from 'index/ReservationDetail';

const { authorities, reservationDetail } = __reservationDetail__.__initialState__;
const initialData = {
  permitLabel: '',
  permitNumber: '',
  viewPermitId: -1,
  permitID: '1111111',
  batchID: '1111111',
  receiptID: '2222222',
  receiptEntryID: '3333333',
  isReservationDetailUpdated: false,
  hasRefundAmount: true,
  companyWording: '',
  disabledSkyLogix: false,
  sdireqauth: '',
  attachmentReadonly: false,
  reservationDetail,
  authorities,
  permitLockMessage: ''
};
const main = {
  isShowTotalBalanceDueDetail: false,
  hideQuestions: {
    '11': 'question error 1'
  },
  isPermitDetailsChanged: false,
  errors: {
    waiverErrors: {},
    questionErrors: {}
  },
  confirmChangeError: {
    waiverErrors: {}
  }
};

const error = {
  list: [],
  systemErrors: [],
  businessErrors: []
};

const actionBar = {
  status: 0,
  disableActions: true
};
const isUpdated = true;
const eventDetail = {
  error: {},
  isShow: {
    event_1_1: false,
    event_2_0: false
  },
  isUpdated: {
    event_1_1: true,
    event_2_0: false
  },
  hasFetchedDetail: {
    event_1_1: false,
    event_2_0: false
  },
  allEventConfig: {},
  eventValidStatus: {},
  eventList: [{
    resourceCount: 1,
    eventName: '2016 Annual Party',
    attendance: 200,
    hideChecklistItemsSection: true,
    hideCustomQuestionsSection: true,
    isEventUpdated: false,
    isBookingUpdated: true,
    newEntryID: 0,
    validated: true,
    eventID: 1,
    bookingCount: 3,
    permitID: 1,
    eventIndex: '1_1',
    totalAmount: 300
  }, {
    resourceCount: 3,
    eventName: '2016 Technic Conference',
    attendance: 100,
    hideChecklistItemsSection: true,
    hideCustomQuestionsSection: true,
    isEventUpdated: true,
    isBookingUpdated: false,
    newEntryID: 0,
    validated: true,
    eventID: 2,
    bookingCount: 14,
    permitID: 1,
    eventIndex: '2_0',
    totalAmount: 230
  }]
};
const survey = {
  '1_1': {
    questions: [],
    errors: [],
    hasRequiredQuestion: false
  }

};
const waiver = {
  showWaiver: true,
  akamaiEnabled: true,
  error: false,
  data: [],
  allWaivers: {},
  akamaiDirectory: '/whyy/',
  homeUrl: 'http://localhost:8080/linux01/servlet/',
  receiptID: '2222222',
  batchID: '1111111',
  receiptEntryID: '3333333',
  permitID: '1111111',
  images: '123/',
  errorMsg: {},
  loading: false
};
const notes = {
  1: '',
  2: '',
  showSection: true,
  allNotes: {}
};
const facility = {
  dueNow: 0,
  allFacilities: {},
  subTotal: 0,
  amountPaid: 0,
  total: 0,
  eventFee: {},
  refundAmount: 0,
  facilityFees: [],
  taxes: [],
  description: ''
};
const feeSummary = {
  feeSummary: {
    subTotal: 127.5,
    taxes: [{
      name: 'Tax8',
      amount: 12.75
    }, {
      name: 'test1',
      amount: 12.75
    }, {
      name: 'test2',
      amount: 12.75
    }, {
      name: 'test3',
      amount: 4.78
    }],
    total: 170.53,
    amountPaid: null,
    dueNow: null,
    refundAmount: null
  }
};
const footer = {
  isShouldPay: false,
  isClickedConfirmChanges: false,
};
const skylogix = {
  showLightingPINRequired: 'true',
  isLightingPINRequired: 'false'
};
const breadCrumb = {
  batchID: '1111111',
  receiptID: '2222222',
  data: []
};

const attachments = {}

const amendmentReason = {
  shown: false,
  value: '',
  savedValue: 'test saved',
  required: false
}

const specialHandlingData = {
  customerId: '1123',
    specialHandling: true,
    shown: true
}
const permitHolder = fromJS({
  isPermitHolderBeDropIn: false
});

const defaultProps = {
  main: fromJS(main),
  error: fromJS(error),
  actionBar: fromJS(actionBar),
  isUpdated,
  eventDetail: fromJS(eventDetail),
  survey: fromJS(survey),
  waiver: fromJS(waiver),
  notes: fromJS(notes),
  facility: fromJS(facility),
  feeSummary: fromJS(feeSummary),
  footer: fromJS(footer),
  skylogix: fromJS(skylogix),
  breadCrumb: fromJS(breadCrumb),
  attachments: fromJS(attachments),
  amendmentReason: fromJS(amendmentReason),
  specialHandlingData: fromJS(specialHandlingData),
  permitHolder,
  initialData
};

const actions = {
  saveWaiver: jest.fn(),
  changeWaiverByEventID: jest.fn(),
  saveWaiverErrorMessage: jest.fn(),
  setWaiverErrorMessage: jest.fn(),
  deleteReservationFeeDetail: jest.fn(),
  redirect: jest.fn(),
  saveNotes: jest.fn(),
  updateSkylogix: jest.fn(),
  permitDetailsChanged: jest.fn(),
  setWaiverErrors: jest.fn(),
  updateQuestionConfirmChangeError: jest.fn(),
  updateWaiverConfirmChangeError: jest.fn(),
  removeWaiverConfirmChangeError: jest.fn(),
  changeQuestion: jest.fn(),
  deleteQuestion: jest.fn(),
  confirmSavingQuestion: jest.fn(),
  isClickedConfirmChanges: jest.fn(),
  validateQuestionsAsyncAction: jest.fn(() => Promise.resolve()),
  setAmendmentReason: jest.fn(),
  setAmendmentReasonShown: jest.fn(),
  saveAmendmentReason: jest.fn(),
  confirmReservationDetailChange: jest.fn()
};

describe('index/ReservationDetail', () => {
  let store;

  beforeEach(() => {
    const mockStore = configureStore();
    store = mockStore();
  });

  afterEach(() => {
    store.clearActions();
  });

  const setup = (props = defaultProps) => shallow(
    <ReservationDetailComponent
      store={store}
      {...props}
      {...actions}
    />
  );

  test('component and initialization works fine', () => {
    const component = setup();

    expect(component.find(BreadCrumb).length).toBe(0);
    expect(component.find(Messager).length).toBe(1);
    expect(component.find(ActionBar).length).toBe(1);
    expect(component.find(GeneralInformation).length).toBe(1);
    expect(component.find(EventList).length).toBe(1);
    expect(component.find(FeeSummary).length).toBe(1);
    expect(component.find(Skylogix).length).toBe(1);
    expect(component.find(Footer).length).toBe(1);
    expect(component.find(Error).length).toBe(1);
    expect(component.find(SpecialHandlingAlert).length).toBe(1);
    expect(component.find('warn-info').length).toBe(0);
  });

  test('success message alert should not display when any change apples on the reservation', () => {
    const component = setup({
      ...defaultProps,
      main: fromJS({
        ...main,
        isPermitDetailsChanged: true
      })
    });
    expect(component.find(Messager).length).toBe(0);
  });

  test('component and initialization works fine, but expired', () => {
    const errorData = Object.assign({}, error, {
      list: []
    });

    const fromJSErrorData = fromJS(errorData);
    const updatedErrorData = fromJSErrorData.update('list', list => list.push({ code: '1000' }));

    const mainData = Object.assign({}, main, {
      isPermitDetailsChanged: false,
      errors: {
        waiverErrors: {
          1: NaN,
          2: 'error'
        },
        questionErrors: {
          1: '',
          2: 'error'
        }
      }
    });
    const newProps = Object.assign({}, defaultProps, {
      error: updatedErrorData,
      main: fromJS(mainData),
      balanceDueDetail: fromJS({ data: {} }),
    });
    const component = setup(newProps);
    window.__STATIC__ = undefined;
    expect(component.find(Error).first().prop('title')).toBe('Request Date Expired');
  });

  test('component and initialization works fine, has errors', () => {
    const errorData = Object.assign({}, error, {
      list: []
    });

    const fromJSErrorData = fromJS(errorData);
    const updatedErrorData = fromJSErrorData.update('list', list => list.push({ code: '1050' }));

    const mainData1 = Object.assign({}, main, {
      isPermitDetailsChanged: false,
      errors: {
        waiverErrors: {
          1: 'waiver error'
        },
        questionErrors: {}
      }
    });
    const newProps1 = Object.assign({}, defaultProps, {
      error: updatedErrorData,
      main: fromJS(mainData1)
    });
    const component = setup(newProps1);
    expect(component.find('.errorSection ul').hasClass('li-style-none')).toBe(true);
    expect(component.find('.errorSection ul li').length).toBe(1);

    const mainData2 = Object.assign({}, main, {
      errors: {
        waiverErrors: {
          1: 'waiver error'
        }
      },
      confirmChangeError: {
        waiverErrors: {
          3: 'waiver error'
        }
      }
    });
    const newProps2 = Object.assign({}, newProps1, {
      main: fromJS(mainData2),
      survey: fromJS({
        '1': {
          errors: [{
            customquestionIndex: 1,
            message: 'question error'
          }]
        }
      })
    });
    component.setProps(newProps2);
    expect(component.find('.errorSection ul').hasClass('li-style-none')).toBe(false);
    expect(component.find('.errorSection ul li').length).toBe(2);

    const waiverData = Object.assign({}, waiver, {
      allWaivers: {
        1: 'all waivers'
      }
    });
    const newProps3 = Object.assign({}, defaultProps, {
      waiver: fromJS(waiverData)
    });
    component.setProps(newProps3);
    expect(actions.setWaiverErrors).toHaveBeenCalled();
  });

  test('functions work fine', () => {
    const component = setup();
    const instance = component.instance();

    instance.setSkylogixValue();
    expect(actions.updateSkylogix).toHaveBeenCalled();

    component.find(Footer).first().prop('handleSubmit')();

    instance.handleSubmit();
    expect(actions.isClickedConfirmChanges).toHaveBeenCalled();

    instance.validateWaiverErrors();
    const waiverData = Object.assign({}, waiver, {
      allWaivers: [{
        data: [{
          waiverIndex: 1,
          isRequired: true,
          displayPermitSelected: true,
          agreeToWaiverSelected: false
        }]
      }]
    });
    const eventDetailData = Object.assign({}, eventDetail, {
      eventValidStatus: {
        0: null
      }
    });
    const newProps = Object.assign({}, defaultProps, {
      waiver: fromJS(waiverData),
      eventDetail: fromJS(eventDetailData)
    });
    component.setProps(newProps);
    const instance1 = component.instance();
    instance1.validateWaiverErrors();
    expect(actions.saveWaiverErrorMessage).toHaveBeenCalled();
    expect(actions.updateWaiverConfirmChangeError).toHaveBeenCalled();
    expect(actions.setWaiverErrors).toHaveBeenCalled();
  });

  test('render connect component correctly', () => {
    const component = shallow(
      <ReservationDetail
        store={store}
        {...defaultProps}
      />
    );

    expect(component.length).toBe(1);
  });

  test('render identifier', () => {
    let wrapper;
    wrapper = setup();
    expect(wrapper.find('.permit-number')).toHaveLength(0);
    wrapper = setup({
      ...defaultProps,
      initialData: {
        ...initialData,
        permitNumber: 'R123',
        permitLockMessage: 'in use'
      }
    });
    expect(wrapper.find('.permit-lock-message').length).toBe(1);
    expect(wrapper.find('.permit-number').text()).toBe('- R123');
  });

  test('AmendmentReasonModal callbacks', () => {
    const wrapper = setup();

    wrapper.find(AmendmentReasonModal).props().onChange('test change');
    expect(actions.setAmendmentReason).toBeCalledWith('test change');

    wrapper.find(AmendmentReasonModal).props().onClose();
    expect(actions.setAmendmentReason).toBeCalledWith('test saved');
    expect(actions.setAmendmentReasonShown).toBeCalledWith(false);

    wrapper.find(AmendmentReasonModal).props().onConfirm();
    expect(actions.setAmendmentReasonShown).toBeCalledWith(false);
    expect(actions.confirmReservationDetailChange).toHaveBeenCalledTimes(1);
  })
});
