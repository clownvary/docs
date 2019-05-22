import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';
import convertCasingPropObj from 'shared/utils/convertCasingPropObj';
import flatQuestionAnswers from '../utils/flatQuestionAnswers';
import htmlStringContainsText from '../utils/htmlStringContainsText';
import {
  FETCH_PERMIT_CONTRACT_SUCCESS,
  FETCH_PERMIT_SCHEDULE_SUCCESS,
  FETCH_AMENDMENT_SUCCESS
} from '../consts/actionTypes';

const initialState = fromJS({
  permitInfo: {},
  orgInfo: {},
  chargeSummary: {},
  events: [],
  deposits: [],
  paymentRefunds: [],
  signatures: {},
  permitSchedules: {},
  attachedFiles: [],
  paymentSchedules: {},
  amendments: [],
  header: '',
  footer: ''
});

const handlers = {
  [FETCH_PERMIT_CONTRACT_SUCCESS](state, {
    payload: {
      body: {
        permit_info,
        org_info,
        charge_summary,
        events,
        deposits_info,
        payments_and_refunds,
        signatures,
        payment_schedules,
        attached_files,
        header,
        footer
      }
    }
  }) {
    const processedEvents = events && events.map((e) => {
      const event = convertCasingPropObj(e);
      event.questions = flatQuestionAnswers(event.questions);
      /* istanbul ignore else */
      if (event.checklist) {
        event.waivers = event.checklist.waivers;
        event.infos = event.checklist.information;
        delete event.checklist;
      }
      return event;
    });

    return state.withMutations((s) => {
      s.set('permitInfo', fromJS(permit_info));
      s.set('orgInfo', fromJS(org_info));
      s.set('chargeSummary', fromJS(charge_summary));
      s.set('events', fromJS(processedEvents));
      s.set('deposits', fromJS(deposits_info));
      s.set('paymentRefunds', fromJS(payments_and_refunds));
      s.set('signatures', fromJS(signatures));
      s.set('paymentSchedules', fromJS(payment_schedules));
      s.set('attachedFiles', fromJS(attached_files));
      htmlStringContainsText(header) && s.set('header', header);
      htmlStringContainsText(footer) && s.set('footer', footer);
    });
  },

  [FETCH_PERMIT_SCHEDULE_SUCCESS](state, { payload: { body: { permit_schedules } }
  }) {
    return state.withMutations((s) => {
      s.set('permitSchedules', fromJS(permit_schedules));
    });
  },

  [FETCH_AMENDMENT_SUCCESS](state, { payload: { body: { amendments } } }) {
    return state.set('amendments', fromJS(amendments));
  }

};

export default reducerHandler(initialState, handlers);
