import React from 'react';
import { mount, shallow } from 'enzyme';
import { fromJS, toJS } from 'immutable';
import configureStore from 'redux-mock-store';

import middlewares from 'shared/api/middlewares';
import PermitDetail, { PermitDetail as PermitDetailComponent } from 'index/PermitDetail/index';

import PermitFee from 'shared/components/PermitFee';
import Skylogix from 'shared/components/Skylogix';
import { SpecialHandlingAlert } from 'shared/components/SpecialHandling';
import { ANResponseCode } from 'shared/consts';
import { skylogixValueChange } from 'shared/actions/skylogix';
import Survey, { helper } from 'shared/components/Survey';
import LinkGroup from 'index/PermitDetail/components/LinkGroup';
import PermitType from 'index/PermitDetail/components/PermitType';
import PermitSearch from 'index/PermitDetail/components/PermitSearch';
import WaiverSection from 'index/PermitDetail/components/Waiver';

import NotesSection from 'index/PermitDetail/components/Notes';
import PermitFooterBtns from 'index/PermitDetail/components/PermitFooterBtns';

import { mockState } from './mockState';
import jsonQuestion from 'json/PermitDetail/questions.json'

const waiver = mockState.waiver;
const waiverObj = fromJS(waiver);
const waiverData = waiver.data.map(item => fromJS(item));
const waiverNewObj = waiverObj.set('data', waiverData);
const initialData = {
  permitID: '0',
  hideNotesSection: 'false',
  hideChecklistItemsSection: 'false',
  hideReservationCharges: 'true',
  hideCustomQuestionsSection: 'true',
  permitNumber: 111
}
const defaultProps = {
  main: fromJS(mockState.main),
  permitSearch: fromJS(mockState.permitSearch),
  permitType: fromJS(mockState.permitType),
  waiver: waiverNewObj,
  notes: fromJS(mockState.notes),
  permitFee: fromJS(mockState.permitFee),
  addToCart: fromJS(mockState.addToCart),
  loading: fromJS(mockState.loading),
  error: fromJS(mockState.error),
  runningCart: fromJS(mockState.runningCart),
  skylogix: fromJS(mockState.skylogix),
  stageSequences: fromJS({stageSequencesList: []}),
  survey: fromJS({
    hasRequiredQuestion: true,
    showQuestion: true,
    errors: [],
    questions: helper.generateQuestionPathAndParent(jsonQuestion.body.questions)
  }),
  prerequisite: fromJS(mockState.prerequisite),
  specialHandling: fromJS(mockState.specialHandlingData),
  specialHandlingData: fromJS(mockState.specialHandlingData),
  initialData
}

describe('index/PermitDetail/index.jsx', () => {
  function setup(props = defaultProps) {
    let store = null;

    const actions = {
      reset: jest.fn(),
      fetchQuestionsAsyncAction: jest.fn(() => Promise.resolve()),
      changeQuestionAsyncAction: jest.fn(() => Promise.resolve()),
      validateQuestionAsyncAction: jest.fn(() => Promise.reject()),
      addToCartCheck: jest.fn(),
      fetchPermitDetail: jest.fn(),
      saveWaiverErrorMessage: jest.fn(),
      fetchReady4Checkout: jest.fn(),
      fetchInCart: jest.fn(),
      fetchWaiver: jest.fn(),
      saveWaiver: jest.fn(),
      changeWaiver: jest.fn(),
      setWaiverErrorMessage: jest.fn(),
      fetchNotes: jest.fn(),
      saveNotes: jest.fn(),
      permitDetailsChanged: jest.fn(),
      setWaiverErrors: jest.fn(),
      skylogixValueChange: jest.fn()
    };

    const mockStore = configureStore(middlewares);

    store = mockStore(Object.assign({
      helpLink: fromJS({ data: {} }),
      pagination: fromJS({
        paginations: fromJS([])
      })
    }, props))

    const component = mount(
      <PermitDetail
        {...props}
        {...actions}
      />, { context: { store } }
    );

    const classPureComponent = shallow(
      <PermitDetailComponent
        {...props}
        {...actions}
      />);

    const instance = classPureComponent.instance();

    return {
      component,
      classPureComponent,
      h1: component.find('.page-title h1'),
      runningCart: component.find('button[title="View Cart"]'),
      Skylogix: component.find('.light-form'),
      LinkGroup: component.find(LinkGroup),
      PermitType: component.find(PermitType),
      PermitSearch: component.find(PermitSearch),
      WaiverSection: component.find(WaiverSection),
      Survey: component.find(Survey),
      NotesSection: component.find(NotesSection),
      PermitFooterBtns: component.find(PermitFooterBtns),
      SpecialHandlingAlert: component.find(SpecialHandlingAlert),
      actions,
      instance
    }
  }

  test('should PermitDetail render correctly', () => {
    const {
      instance,
      h1,
      runningCart,
      Skylogix,
      LinkGroup,
      PermitType,
      PermitSearch,
      WaiverSection,
      Survey,
      NotesSection,
      PermitFooterBtns,
      SpecialHandlingAlert
    } = setup();

    instance.setSkylogixValue(true);
    instance.handleAddToCartCheck();

    expect(h1.length).toEqual(1);
    expect(runningCart.length).toEqual(1);
    expect(Skylogix.length).toEqual(1);
    expect(LinkGroup.length).toEqual(1);
    expect(PermitType.length).toEqual(1);
    expect(Survey.length).toEqual(1);
    expect(NotesSection.length).toEqual(1);
    expect(PermitFooterBtns.length).toEqual(1);
    expect(WaiverSection.length).toEqual(1);
    expect(SpecialHandlingAlert.length).toEqual(1);
  });

  test('should PermitDetail render with different values correctly', () => {
    const {
      WaiverSection
    } = setup({
      ...defaultProps,
      initialData: {
        ...initialData,
        permitID: '1',
        hideNotesSection: 'true',
        customer_error_msg: 'error message'
      },
      permitSearchData: fromJS({agentValue: false})
    });

    expect(WaiverSection.length).toEqual(1);
  });

  test('should PermitDetail render with different main value correctly', () => {
    const { runningCart } = setup(Object.assign({}, defaultProps, {
      main: fromJS({
        resize: false,
        errors: {
          questionErrors: {
            1: "the answer is required",
            2: ""
          },
          waiverErrors: {

          }
        },
        hideQuestions: {},
        isPermitDetailsChanged: true,
        ready4Checkout: true,
        inCart: true
      })
    }));

    expect(runningCart.length).toEqual(1);
  });

  test('should PermitDetail render with no error correctly', () => {
    const { component } = setup(Object.assign({}, defaultProps, {
      error: fromJS({
        list: [],
        systemErrors: [],
        businessErrors: []
      })
    }));

    expect(component.find('.errorSection').length).toEqual(1);
  });

  test('should PermitDetail render with no checked PIN correctly', () => {
    const { component, Skylogix } = setup();

    component.setProps({
      skylogix: fromJS({
        isLightingPINRequired: 'true',
        showLightingPINRequired: 'true'
      })
    });

    expect(Skylogix.find('input[type="checkbox"]').at(0).node.value).toEqual('true');
  });

  test('should PermitDetail show qustions and show error correctly', () => {
    const { component, Survey } = setup(Object.assign({}, defaultProps, {
      main: fromJS({
        resize: false,
        errors: {
          waiverErrors: {}
        },
        isPermitDetailsChanged: false,
        ready4Checkout: false,
        inCart: false
      }),
      survey: defaultProps.survey.set('errors', [{ customquestionIndex: 1, message: 'the answer is required' }])
    }));

    expect(component.find('.errorSection').length).toEqual(1);
    expect(component.find('.an-survey .question').length).toEqual(15);
  });

  test('should PermitDetail show no errorMsg qustions and next correctly', () => {
    const { component } = setup(Object.assign({}, defaultProps, {
      survey: defaultProps.survey.set('questions', fromJS([
        helper.generateQuestionPathAndParent({
          answerRequired: false,
          answerMaxLength: 100,
          customquestionId: 66,
          question: 'whyy-radio',
          hint: 'whyy-radio whyy-radio whyy-radio whyy-ra',
          path:[0],
          customquestionIndex: '1',
          permitQuestion: false,
          answers: [{
            answer: '91 : 1',
            code: 91,
            selected: false,
            disabled: false,
            answerId: 1597,
            subQuestion: {
              answerRequired: false,
              answerMaxLength: 100,
              customquestionId: 14,
              question: 'Please specify:',
              hint: '',
              customquestionIndex: '1_1',
              permitQuestion: false,
              answers: [],
              readOnly: false,
              useAnswerCode: false,
              title: 'SUB: Marketing: Other Specification',
              answerFormat: 'freeForm',
              postalCodeType: 0,
              answerType: 'userEntry',
              defaultAnswer: ''
            }
          }, {
            answer: '92 : 2',
            code: 92,
            selected: false,
            disabled: false,
            answerId: 1598,
            subQuestion: null
          }],
          readOnly: false,
          useAnswerCode: true,
          title: 'whyy-radio',
          answerFormat: 'freeForm',
          postalCodeType: 0,
          answerType: 'singleSelectionRadio',
          defaultAnswer: ''
        })
      ]))
    }));

    expect(component.find('.errorSection').length).toEqual(1);
    expect(component.find('.an-survey .question').length)
      .toEqual(1);
  });

  test('should PermitDetail no questions reuired correctly', () => {
    window.__permitDetail__.__initialState__.hideChecklistItemsSection = 'true';
    window.__permitDetail__.__initialState__.hideNotesSection = 'true';

    const { component } = setup(Object.assign({}, defaultProps, {
      survey: defaultProps.survey.set('questions', [])
    }));

    expect(component.find('.an-survey .question').length).toEqual(0);
  });

  test('should PermitDetail change waiver reuired correctly', () => {
    const waiver2 = mockState.waiver2;
    const waiverObj2 = fromJS(waiver2);
    const waiverData2 = waiver2.data.map(item => fromJS(item));
    const waiverNewObj2 = waiverObj2.set('data', waiverData2);

    const { component, WaiverSection } = setup(Object.assign({}, defaultProps, {
      waiver: waiverNewObj2
    }));

    expect(WaiverSection.length).toEqual(1);
  });

  test('component props update handling', () => {
    const { classPureComponent: component, actions } = setup();
    component.setProps({ waiver: waiverNewObj.set('data', []) });
    expect(actions.setWaiverErrors).toHaveBeenCalledTimes(1);
  });

  test('set skylogix value', () => {
    const { instance, actions } = setup();
    instance.setSkylogixValue('test value');
    expect(actions.skylogixValueChange).toHaveBeenCalledTimes(1);
  });

  test('validate waiver errors', () => {
    const { classPureComponent: component, instance, actions } = setup();

    let result = instance.validateWaiverErrors();
    expect(actions.setWaiverErrors).toHaveBeenCalledTimes(1);
    expect(result).toBe(true);

    component.setProps({
      waiver: waiverNewObj.set('data', [fromJS({
        waiverIndex: '0',
        displayPermitSelected: true,
        agreetowaiverSelected: false,
        isRequired: true
      })])
    })

    result = instance.validateWaiverErrors();
    expect(result).toBe(false);
    expect(actions.saveWaiverErrorMessage).toHaveBeenCalledTimes(1);
    expect(actions.setWaiverErrors).toHaveBeenCalledTimes(2);
  });

  test('handle add to cart check', () => {
    const { classPureComponent: component, instance } = setup();
    const addToCartCheck = jest.fn((value, callback) => callback());
    component.setProps({ addToCartCheck })
    instance.handleAddToCartCheck();
    expect(addToCartCheck).toHaveBeenCalledTimes(1);
  });

  test('handle submit', () => {
    jest.useFakeTimers();
    const { classPureComponent: component, instance, actions } = setup();

    instance.handleSubmit();
    expect(actions.validateQuestionAsyncAction).toHaveBeenCalledTimes(1);

    component.setProps({
      validateQuestionAsyncAction: jest.fn(() => Promise.resolve())
    });

    instance.handleSubmit();
    expect(actions.validateQuestionAsyncAction).toHaveBeenCalledTimes(1);
  });

  test('render for variety conditions', () => {
    const { classPureComponent, component } = setup({
      ...defaultProps,
      initialData: {
        ...initialData,
        permitID: '1',
        hideReservationCharges: 'false',
        hideChecklistItemsSection: 'false',
      }
    });

    classPureComponent.setProps({
      prerequisite: fromJS({
        ...mockState.prerequisite,
        errors: [
          { message: 'prerequisite required' }
        ]
      })
    });
    expect(classPureComponent.find('.errorSection li').last().text()).toBe('prerequisite required');

    const error = fromJS(mockState.error).set('list', [
      { code: ANResponseCode.NO_CUSTOMER_COMPANY_SELECTED }
    ])

    classPureComponent.setProps({
      error,
      main: fromJS({
        ...mockState.main,
        errors: {
          questionErrors: {},
          waiverErrors: {}
        }
      }),
      prerequisite: fromJS({
        ...mockState.prerequisite,
        errors: []
      }),
      survey: defaultProps.survey.set('hasRequiredQuestion', false)
    })

    expect(classPureComponent.find('.page-title h1').text()).toBe(`Reservation Details - # ${component.prop('initialData').permitNumber}`);
    expect(classPureComponent.find('.errorSection li')).toHaveLength(0);
    expect(classPureComponent.find(PermitFee)).toHaveLength(1);
    expect(classPureComponent.find(WaiverSection)).toHaveLength(1);
  });
});
