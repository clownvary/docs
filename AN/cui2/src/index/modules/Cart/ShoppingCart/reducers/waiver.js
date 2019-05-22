import { fromJS } from 'immutable';
import reducerHandler from 'react-base-ui/lib/utils/reducerHandler';
import {
  WAIVERS_UI_LIST,
  WAIVERS_UI_HIDE_WARNING,
  WAIVERS_UI_AGREEMENT,
  WAIVERS_UI_VALIDATE_AGREEMENT
} from '../consts/actionTypes';

const defaultWaiversAgreements = fromJS({
  final_system_waiver: {
    required: true,
    value: false,
    error: false
  },
  final_initials_waiver: {
    required: true,
    value: '',
    error: false
  }
});

const initialState = fromJS({
  waivers: null,
  waiversAgreements: defaultWaiversAgreements,
  warningAlertShown: true
});

const handlers = {
  [WAIVERS_UI_LIST](state, { payload: waivers }) {
    const {
      waiver_text: waiverText,
      waiver_text_donation: waiverTextDonation,
      waiver_initials_online_text: waiverInitialsOnlineText,
      require_waiver_scrollbottom: requireWaiverScrollbottom,
      waiver_checked: waiverChecked,
      waiver_initials_value: waiverInitialsValue
    } = waivers || {};
    const systemWaiverRequired = Boolean(waiverText || waiverTextDonation);
    const initialsWaiverRequired = Boolean(waiverInitialsOnlineText);

    return state.withMutations((s) => {
      s.set('waivers', fromJS(waivers));
      s.set('warningAlertShown',
        systemWaiverRequired &&
        s.get('warningAlertShown') &&
        requireWaiverScrollbottom &&
        !waiverChecked
      );

      s.set('waiversAgreements', defaultWaiversAgreements.update(agms => agms.map((a, name) => {
        switch (name) {
          case 'final_system_waiver':
            a = a.set('required', systemWaiverRequired);
            a = a.set('value', waiverChecked);
            break;
          case 'final_initials_waiver':
            a = a.set('required', initialsWaiverRequired);
            a = a.set('value', waiverInitialsValue);
            break;
          /* istanbul ignore next */
          default:
            break;
        }
        return a;
      })));

      if (waivers && waivers.attachments) {
        s.updateIn(['waivers', 'attachments'], attachments => attachments.map((atch) => {
          const {
            reno,
            checked,
            online_waiver_initials: onlineWaiverInitials,
            require_initials_online: requireInitialsOnline,
            stage: { id },
            required_before_completing_transaction: required } = atch.toJS();

          /**
           * Create id for each attachment as unique identification.
           */
          const atchID = `${id}_${reno}`;
          s.setIn(['waiversAgreements', atchID], fromJS({
            required,
            error: false,
            value: requireInitialsOnline ? (onlineWaiverInitials || '') : (!!checked)
          }));
          return atch.set('id', atchID);
        }));
      }
    });
  },

  [WAIVERS_UI_HIDE_WARNING](state) {
    return state.set('warningAlertShown', false);
  },

  [WAIVERS_UI_AGREEMENT](state, { payload: { id, value } }) {
    return state.withMutations((s) => {
      if (s.getIn(['waiversAgreements', id])) {
        s.setIn(['waiversAgreements', id, 'value'], value);
      }
    });
  },

  [WAIVERS_UI_VALIDATE_AGREEMENT](state, { payload }) {
    return state.withMutations((s) => {
      if (!payload) {
        s.set('waiversAgreements', s.get('waiversAgreements').map((agrt) => {
          const required = agrt.get('required');
          const value = agrt.get('value');
          return agrt.set('error', required && !value);
        }));
      }
      if (payload && payload.id) {
        const agrt = s.getIn(['waiversAgreements', payload.id]);
        const required = agrt.get('required');
        const value = agrt.get('value');
        s.setIn(['waiversAgreements', payload.id, 'error'], required && !value);
      }
    });
  }
};

export default reducerHandler(initialState, handlers);
