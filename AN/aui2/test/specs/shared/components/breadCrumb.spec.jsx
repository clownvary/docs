/**
 * todo: refactor dependency resolver inside karma.conf.js
 * so we can properly resolve linting errors that occur when
 * importing from json/** directory
 */

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */

import React from 'react';
import { mount, unmount } from 'enzyme';
import { fromJS } from 'immutable';
import BreadCrumb from 'shared/components/BreadCrumb';
import { messages } from 'shared/consts';

window.addRootBreadCrumbForFacilityRedesign = jest.fn();
window.addStaticBreadcrumb = jest.fn();
window.setFunctionPageBreadcrumb = jest.fn();
window.setTabLabel = jest.fn();
window.setTabAttr = jest.fn();
const reloadReservationDetailUrl = '/ui.do?method=reloadReservationDetail&permit_id=3679&batch_id=0&receipt_id=7';
const breadCrumb = {
  tabLabel: 'New Reservation Home',
  breadCrumb: fromJS({
    batchID: 0,
    receiptID: 0,
    data: [
      {
        isRoot: true,
        type: 'rootmenuitem',
        name: 'Reservations',
        functionMenu: '',
        promptMessage: null,
        url: '',
        action: null
      }, {
        isRoot: false,
        type: 'Reservations',
        name: 'Reservation Detail',
        functionMenu: 'Reservations',
        promptMessage: null,
        url: reloadReservationDetailUrl,
        action: {
          parameter: {
            batchID: 0,
            voidDraft: false,
            receiptID: 7
          }
        }
      }, {
        isRoot: false,
        type: 'currentpage',
        name: 'Payment',
        functionMenu: '',
        promptMessage: null,
        url: '',
        action: null
      }
    ]
  }),
  isPromptUser: false
};

function setup(_breadCrumb = breadCrumb) {
  const wrapper = mount(
    <BreadCrumb {..._breadCrumb} />
  );

  return wrapper;
}

describe('shared/components/BreadCrumb', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should not prommpt user or have actions when set isPromptUser to be false', () => {
    setup();
    expect(window.addRootBreadCrumbForFacilityRedesign).toHaveBeenCalled();
    expect(window.addStaticBreadcrumb).toHaveBeenCalled();
    expect(window.setFunctionPageBreadcrumb).toHaveBeenCalled();
    expect(window.setTabLabel).toHaveBeenCalled();
    expect(window.setTabAttr).toHaveBeenCalled();
    expect(window.shouldPromptWhenLeavePage).toBeUndefined();
    expect(window.isCleanedBoforeUnloadPage).toBeUndefined();
    expect(window.isPageRedirectInCurrentWorkflow).toBeUndefined();
    expect(window.onbeforeunload).toBeUndefined();
    expect(window.onunload).toBeUndefined();
    expect(window.promptWhenLeavePage).toBeUndefined();
  });

  it('Should prommpt user or have actions when set isPromptUser to be true', () => {
    const _breadCrumb = Object.assign({}, breadCrumb, {isPromptUser: true, tabLabel: undefined});
    setup(_breadCrumb);
    expect(window.shouldPromptWhenLeavePage).toBeDefined();
    expect(window.isCleanedBoforeUnloadPage).toBeFalsy();
    expect(window.isPageRedirectInCurrentWorkflow).toBeFalsy();
    expect(window.onbeforeunload).toBeDefined();
    expect(window.onunload).toBeDefined();
    expect(window.promptWhenLeavePage).toBeDefined();
    expect(window.shouldPromptWhenLeavePage()).toBeTruthy();
    expect(window.onbeforeunload()).toBe(messages.leavePagePrompt);
    window.onunload();
    window.confirm = jest.fn(() => true)
      .mockImplementationOnce(() => false)
      .mockImplementationOnce(() => true);
    expect(window.promptWhenLeavePage(null, '')).toBeFalsy();
    expect(window.promptWhenLeavePage(null, '')).toBeFalsy();
    expect(window.promptWhenLeavePage(null, reloadReservationDetailUrl)).toBeFalsy();
  })

  it('Should stay on the current page when has some unfinished work must been done', () => {
    const _breadCrumb = Object.assign(
      {},
      breadCrumb,
      {
        isPromptUser: true,
        promptsWhenHasUnfinishedTasks: [null, () => true]
      }
    );
    setup(_breadCrumb);
    expect(window.promptWhenLeavePage(null, reloadReservationDetailUrl)).toBeFalsy();
  })

  it('Should prompt user if needed on leaving the current page and has finished work which must been done', () => {
    let _breadCrumb = {
      isPromptUser: true,
      promptsWhenHasUnfinishedTasks: [() => false],
      breadCrumb: fromJS({
        batchID: 0,
        receiptID: 0,
        data: [{
         type: 'Reservations',
          name: 'Reservation Detail',
          functionMenu: 'Reservations',
          promptMessage: 'xxx',
          url: reloadReservationDetailUrl,
          action: {
            parameter: {
              batchID: 0,
              voidDraft: false,
              receiptID: 7
            }
          }
        }]
      })
    };
    const wrapper = setup(_breadCrumb);
    const instance = wrapper.instance();
    expect(window.promptWhenLeavePage(null, reloadReservationDetailUrl)).toBeFalsy();
    instance.renderBreadCrumbs = jest.fn();
    instance.createWorkWhenLeavePage = jest.fn();
    wrapper.setProps({ tabLabel: 'New Receipt 2' });
    expect(instance.renderBreadCrumbs).toHaveBeenCalledTimes(1);
    expect(instance.createWorkWhenLeavePage).not.toHaveBeenCalled();
    const newBreadCrumb = wrapper.prop('breadCrumb').set('data', fromJS([]));
    wrapper.setProps({ breadCrumb: newBreadCrumb });
    expect(instance.renderBreadCrumbs).toHaveBeenCalledTimes(2);
    expect(instance.createWorkWhenLeavePage).toHaveBeenCalledTimes(1);
    wrapper.setProps({ isPromptUser: false });
    expect(instance.renderBreadCrumbs).toHaveBeenCalledTimes(2);
  })
});
