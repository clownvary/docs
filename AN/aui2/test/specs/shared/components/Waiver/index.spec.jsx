import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import Waiver from 'shared/components/Waiver';

const waiverData = [{
  itemText: 'test waiver',
  showDisplayPermit: true,
  disableAgreetowaiver: false,
  agreetowaiverSelected: false,
  signatureBase64: '',
  isRequired: false,
  attachmentName: 'New Waiver PD',
  waiverIndex: 1,
  canModifySignature: true,
  attachedchecklistitemID: 33,
  uploadfileHrefText: 'test pad',
  displayPermitSelected: false,
  stageType: 1,
  stageID: 24,
  stageVersion: 6,
  transactionstageID: -1,
  description: 'Test Jack Waiver',
  attachmentID: 110,
  due_date: '2017 Aug 28',
  complete_date: '2017 Aug 23'
}, {
  itemText: 'It is a global waiver\r\nThis should be a new line.\r\nThe end.',
  showDisplayPermit: true,
  disableAgreetowaiver: true,
  agreetowaiverSelected: true,
  signatureBase64: '',
  isRequired: false,
  attachmentName: '',
  waiverIndex: 2,
  canModifySignature: true,
  attachedchecklistitemID: -3,
  uploadfileHrefText: null,
  displayPermitSelected: true,
  stageType: 1,
  stageID: 8,
  stageVersion: 0,
  transactionstageID: -1,
  description: 'Global waiver',
  attachmentID: -1
}, {
  itemText: 'An information only checklist item',
  showDisplayPermit: true,
  disableAgreetowaiver: false,
  agreetowaiverSelected: false,
  signatureBase64: '',
  isRequired: false,
  attachmentName: '',
  waiverIndex: 3,
  canModifySignature: true,
  attachedchecklistitemID: 34,
  uploadfileHrefText: null,
  displayPermitSelected: false,
  stageType: 0,
  stageID: 9,
  stageVersion: 0,
  transactionstageID: -1,
  description: 'Policy Information',
  attachmentID: -1
}, {
  itemText: 'i grant waiver',
  showDisplayPermit: true,
  disableAgreetowaiver: false,
  agreetowaiverSelected: false,
  signatureBase64: '',
  isRequired: true,
  attachmentName: '',
  waiverIndex: 4,
  canModifySignature: true,
  attachedchecklistitemID: 32,
  uploadfileHrefText: null,
  displayPermitSelected: false,
  stageType: 1,
  stageID: 10,
  stageVersion: 1,
  transactionstageID: -1,
  description: 'photo release adult',
  attachmentID: -1
}, {
  itemText: 'Just accept it.',
  showDisplayPermit: true,
  disableAgreetowaiver: false,
  agreetowaiverSelected: true,
  signatureBase64: '',
  isRequired: true,
  attachmentName: '1Foo',
  waiverIndex: 5,
  canModifySignature: true,
  attachedchecklistitemID: -2,
  uploadfileHrefText: '1Foo Test',
  displayPermitSelected: true,
  stageType: 1,
  stageID: 13,
  stageVersion: 4,
  transactionstageID: 0,
  description: 'A Global Waiver',
  attachmentID: 84
}];

const addableWaivers = [{
  itemText: 'waiver text in checklist',
  showDisplayPermit: true,
  dueDate: null,
  'disableAgreetowaiver': false,
  agreetowaiverSelected: false,
  'signatureBase64': '',
  'completeDate': null,
  'isRequired': false,
  attachmentName: '',
  waiverIndex: '3671_0_48',
  'canModifySignature': true,
  'attachedchecklistitemID': -3,
  'uploadfileHrefText': null,
  displayPermitSelected: false,
  'stageType': 1,
  'stageID': 48,
  stageVersion: 2,
  transactionstageID: -1,
  description: 'Allen_Waiver',
  attachmentID: 'EC8C128F'
}];

const waiverObj = {
  showWaiver: true,
  akamaiEnabled: true,
  enableDigitalSignature: true,
  error: false,
  hideChecklistItemsSection: 'false',
  data: waiverData,
  allWaivers: {},
  akamaiDirectory: '/whyy/',
  homeUrl: 'http://localhost:8080/linux01/servlet/',
  receiptID: '2222222',
  batchID: '1111111',
  permitID: '0',
  images: '123/',
  errorMsg: {},
  loading: true
};

const defaultProps = {
  hasNew: false,
  readOnly: false,
  showUpArrowIcon: false,
  addableWaiversLoaded: false,
  waiver: fromJS(waiverObj)
};

function setup(props = defaultProps) {
  const actions = {
    saveWaiver: jest.fn(),
    changeWaiver: jest.fn(),
    setWaiverErrorMessage: jest.fn(),
    permitDetailsChanged: jest.fn(),
    changeWaiverByEventID: jest.fn(),
    showUpdated: jest.fn(),
    setEventValidStatus: jest.fn(),
    loadAddableWaivers: jest.fn()
  };

  const component = mount(
    <Waiver {...props} {...actions} />
  );
  const instance = component.instance();

  return {
    component,
    waiver: component.find('.waiver'),
    signName: component.find('a.signName'),
    lastItem: component.find('.last-item'),
    test: component.find('.add-waiver'),
    actions,
    instance
  };
}

describe('shared/components/Waiver/index', () => {
  let component = null;
  let waiver = null;
  let signName = null;
  let lastItem = null;
  let actions = null;
  let instance = null;

  beforeEach(() => {
    const components = setup();
    component = components.component;
    waiver = components.waiver;
    signName = components.signName;
    lastItem = components.lastItem;
    actions = components.actions;
    instance = components.instance;
  });

  it('should render Waiver correctly', () => {
    expect(waiver.length).toEqual(1);
    expect(waiver.find('.header-section').length).toEqual(1);
    expect(waiver.find('.dataList').length).toEqual(1);
    expect(waiver.find('.dataList').find('.item').length).toEqual(5);
  });

  it('should render waiver item correctly', () => {
    const clkSignaturePad = signName.at(0);
    clkSignaturePad.simulate('click');

    const itemWaiverName = lastItem.find('a').at(0);
    itemWaiverName.simulate('click');

    const itemViewAttachment = lastItem.find('a').at(2).simulate('click');
    itemViewAttachment.simulate('click');

    const displayInPermit = lastItem.find('input[type="checkbox"]').at(0);
    displayInPermit.simulate('change');
    expect(actions.setEventValidStatus).not.toHaveBeenCalled();

    const agreeToWaiver = lastItem.find('input[type="checkbox"]').at(1);
    agreeToWaiver.simulate('change');
    expect(actions.saveWaiver).toHaveBeenCalled();
  });

  it('should call clickWaiverName/viewAttachment/clkSignaturePad function correctly, when permitID is 0', () => {
    const waiverIndex = 1; // The index start with 1 in the waiver component.
    const itemFirst = waiverData[0];

    instance.clickWaiverName(itemFirst.attachedchecklistitemID,
      itemFirst.stageID, itemFirst.stageVersion, waiverIndex);
    instance.viewAttachment(itemFirst.attachmentID);
    instance.clkSignaturePad(itemFirst.attachedchecklistitemID,
      itemFirst.stageID, itemFirst.stageVersion, waiverIndex);
  });

  it('should call agreeToWaiver function correctly, when permitID is 0', () => {
    const waiverIndex = 1; // The index start with 1 in the waiver component.
    const itemFirst = waiverData[0];

    instance.agreeToWaiver(itemFirst.attachedchecklistitemID,
      itemFirst.canModifySignature, itemFirst.stageType, waiverIndex);
    expect(actions.setWaiverErrorMessage).not.toHaveBeenCalled();
  });

  it('should call savedWaiver function correctly, when permitID is 0', () => {
    const waiverIndex = 1; // The index start with 1 in the waiver component.
    const itemFirst = waiverData[0];

    instance.savedWaiver(itemFirst.attachedchecklistitemID, false, waiverIndex, '');
    expect(actions.changeWaiverByEventID).not.toHaveBeenCalled();
    expect(actions.saveWaiver).toHaveBeenCalled();
  });

  it('should call displayInPermit function correctly, when permitID is 0', () => {
    const waiverIndex = 1; // The index start with 1 in the waiver component.
    const itemFirst = waiverData[0];

    instance.displayInPermit(itemFirst.attachedchecklistitemID, false, '', waiverIndex);
    expect(actions.setEventValidStatus).not.toHaveBeenCalled();
    expect(actions.changeWaiverByEventID).not.toHaveBeenCalled();
    expect(actions.changeWaiver).toHaveBeenCalled();
    expect(actions.saveWaiver).toHaveBeenCalled();
  });

  it('should call Waiver function correctly, when permitID > 0 and eventID > 0', () => {
    const waiverIndex = waiverData.length; // The index start with 1 in the waiver component.
    const testWaiverObj = Object.assign(waiverObj, {
      permitID: '10',
      receiptEntryID: '333',
      errorMsg: {
        [waiverIndex]: 'Reuired'
      }
    });

    const { actions: actions2, instance: instance2 } = setup({
      hasNew: 'true',
      readOnly: true,
      showUpArrowIcon: false,
      eventID: 1,
      eventIndex: '1_0',
      waiver: fromJS(testWaiverObj)
    });

    const itemLast = waiverData[waiverData.length - 1];

    instance2.clkSignaturePad(itemLast.attachedchecklistitemID,
      itemLast.stageID, itemLast.stageVersion, waiverIndex);

    instance2.agreeToWaiver(itemLast.attachedchecklistitemID,
      itemLast.canModifySignature, itemLast.stageType, waiverIndex);
    expect(actions2.setWaiverErrorMessage).not.toHaveBeenCalled();

    instance2.savedWaiver(itemLast.attachedchecklistitemID, true, waiverIndex);
    expect(actions2.changeWaiverByEventID).toHaveBeenCalled();
    expect(actions2.saveWaiver).toHaveBeenCalled();

    instance2.displayInPermit(itemLast.attachedchecklistitemID, true, '', waiverIndex);
    expect(actions2.setEventValidStatus).toHaveBeenCalled();
    expect(actions2.changeWaiverByEventID).toHaveBeenCalled();
    expect(actions2.changeWaiver).not.toHaveBeenCalled();
    expect(actions2.saveWaiver).toHaveBeenCalled();
  });

  it('should call Waiver function correctly, when invalid values', () => {
    const { actions: actions2, instance: instance2 } = setup(Object.assign(defaultProps, {
      eventID: 1,
      eventIndex: '1_0',
      waiver: fromJS(waiverObj)
    }));

    const itemLast = waiverData[waiverData.length - 1];

    instance2.clickWaiverName(itemLast.attachedchecklistitemID,
      itemLast.stageID, itemLast.stageVersion, 10); // invalid waiverIndex

    instance2.viewAttachment(); // no attachmentID

    instance2.agreeToWaiver(100, false, itemLast.stageType, 10); // invalid value
    expect(actions2.setWaiverErrorMessage).toHaveBeenCalled();
  });

  it('when Waiverlist is [] function correctly', () => {
    const nextWaiverObj = { ...waiverObj, permitID: '2323', data: fromJS([]) };
    const { actions, component } = setup(Object.assign(defaultProps, {
      eventID: 1,
      eventIndex: '1_0',
      waiver: fromJS(nextWaiverObj),
      addableWaivers: fromJS(addableWaivers)
    }));

    component.find('.header-section__add-link').simulate('click');
    expect(actions.loadAddableWaivers).toHaveBeenCalled();
  });
});
