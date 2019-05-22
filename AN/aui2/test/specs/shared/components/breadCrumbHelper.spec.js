import { fromJS } from 'immutable';
import { cancelReceipt } from 'shared/actions/receipt';

import {
  promptOnLeavePage,
  resetWorkWhenLeavePage,
  cleanOnUnloadPage,
  cleanOnLeaving
} from 'shared/components/BreadCrumb/breadCrumbHelper';

const reloadReservationDetailUrl = '/ui.do?method=reloadReservationDetail&permit_id=3679&batch_id=0&receipt_id=7';

jest.mock('shared/actions/receipt');
cancelReceipt.mockImplementation((batchID, receiptID, voidDraft = true)=>{
  if(batchID==0&&receiptID==0){
      return {     success: true,
                   response_code: '',
                   response_message:{}
                 };
    }else{
      return {
                   success: false,
                   response_code: '',
                   response_message:{}
                 };
    }
});

describe('shared/components/BreadCrumb/breadCrumb.helper.js', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

    it('promptOnLeavePage should work well', () => {
      expect(promptOnLeavePage('', { promptsWhenHasUnfinishedTasks: null, breadCrumb: fromJS({data: []})})).toBeFalsy();
    });

    it('promptOnLeavePage should work well when need prompt but has no action.', () => {
      const breadCrumb = fromJS({
        batchID: 0,
        receiptID: 0,
        isSilentWhenLeavingCurrentWorkflow: true,
        data: [{
          isRoot: false,
          type: 'Reservations',
          name: 'Reservation Detail',
          functionMenu: 'Reservations',
          promptMessage: 'prompt user',
          url: reloadReservationDetailUrl,
          action: null
        }]
      });
      expect(promptOnLeavePage(reloadReservationDetailUrl, { breadCrumb })).toBeFalsy();
      window.confirm = jest.fn(() => false)
        .mockImplementationOnce(() => true);
      expect(promptOnLeavePage(reloadReservationDetailUrl, { breadCrumb})).toBeTruthy();

      const breadCrumb1 = fromJS({
        batchID: 0,
        receiptID: 0,
        data: [{
          isRoot: false,
          type: 'Reservations',
          name: 'Reservation Detail',
          functionMenu: 'Reservations',
          promptMessage: '',
          url: reloadReservationDetailUrl,
          action: null
        }]
      });

      expect(promptOnLeavePage(reloadReservationDetailUrl, { breadCrumb: breadCrumb1})).toBeTruthy();
    })

    it('promptOnLeavePage should work well when has action but no prompt.', () => {
      const breadCrumb = fromJS({
        batchID: 0,
        receiptID: 0,
        data: [{
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
        }]
      });
      expect(promptOnLeavePage(reloadReservationDetailUrl, { breadCrumb })).toBeFalsy();
    })

    it('promptOnLeavePage should work well when has no action and no prompt.', () => {
      const breadCrumb = fromJS({
        batchID: 0,
        receiptID: 0,
        data: [{
          isRoot: false,
          type: 'Reservations',
          name: 'Reservation Detail',
          functionMenu: 'Reservations',
          promptMessage: null,
          url: reloadReservationDetailUrl,
          action: null
        }]
      });
      expect(promptOnLeavePage(reloadReservationDetailUrl, { breadCrumb })).toBeTruthy();
    })

  it('resetWorkWhenLeavePage should work well',()=>{
        resetWorkWhenLeavePage();
        expect(window.shouldPromptWhenLeavePage).toBeUndefined();
        expect(window.isCleanedBoforeUnloadPage).toBeUndefined();
        expect(window.isPageRedirectInCurrentWorkflow).toBeUndefined();
        expect(window.onbeforeunload).toBeUndefined();
        expect(window.onunload).toBeUndefined();
        expect(window.promptWhenLeavePage).toBeUndefined();
  })

  it('promptOnLeavePage should work well when has action but no prompt with undefined url.', () => {
    const breadCrumb = fromJS({
      batchID: 0,
      receiptID: 0,
      data: [{
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
            receiptID: 0
          }
        }
      }]
    });
    expect(promptOnLeavePage(undefined, {breadCrumb,isSilientOutsideWorkflow:'true',isSilientInsideWorkflow:'true'})).toBeTruthy();
  })

  it('cleanOnLeaving should handle default information',()=>{
   expect(cleanOnLeaving()).toBeFalsy();
  })

  it('cleanOnUnloadPage should check on leaving',()=>{
        const breadCrumb = fromJS({
          batchID: 0,
          receiptID: 0,
          data: [{
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
                receiptID: 9
              }
            }
          }]
        });
       window.isPageRedirectInCurrentWorkflow = true;
       window.isCleanedBoforeUnloadPage = true;
       cleanOnUnloadPage(breadCrumb);
  })
})
