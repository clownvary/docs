import { expect } from 'chai';
import { fromJS } from 'immutable';
import {
  WAIVERS_UI_LIST,
  WAIVERS_UI_HIDE_WARNING,
  WAIVERS_UI_AGREEMENT,
  WAIVERS_UI_VALIDATE_AGREEMENT
} from 'index/modules/Cart/ShoppingCart/consts/actionTypes';
import waiverReducer from 'index/modules/Cart/ShoppingCart/reducers/waiver';

describe('index/modules/Cart/ShoppingCart/reducers/waiver(UAT)', () => {
  const defaultWaiversAgreements = fromJS({
    final_system_waiver: { required: true, value: false, error: false },
    final_initials_waiver: { required: true, value: '', error: false }
  });
  describe('Waiver section in new cart:', () => {
    it('Should fetch waiver data successfully', () => {
      const returnState = waiverReducer(undefined, {
        type: WAIVERS_UI_LIST,
        payload: {
          waiver_text: 'This is online waiver.',
          waiver_text_donation: '',
          waiver_initials_online_text: 'this is test system init',
          require_waiver_scrollbottom: true,
          waiver_checked: true,
          waiver_initials_value: 'Ab23',
          attachments: [{
            stage: {
              id: 40
            },
            reno: 0,
            required_before_completing_transaction: true,
            require_initials_online: true,
            online_waiver_initials: true,
            checked: true
          }, {
            stage: {
              id: 50
            },
            reno: 1,
            required_before_completing_transaction: true,
            require_initials_online: false,
            online_waiver_initials: true,
            checked: true
          },
          {
            stage: {
              id: 60
            },
            reno: 0,
            required_before_completing_transaction: true,
            require_initials_online: true,
            online_waiver_initials: false,
            checked: true
          }],
          waiversAgreements: defaultWaiversAgreements,
          warningAlertShown: true
        }
      });
      const excepedWaiversAgreements = {
        '40_0': { required: true, value: true, error: false },
        '50_1': { required: true, value: true, error: false },
        '60_0': { required: true, value: '', error: false },
        final_system_waiver: { required: true, value: true, error: false },
        final_initials_waiver: { required: true, value: 'Ab23', error: false }
      };

      expect(returnState.get('waiversAgreements').toJS()).to.deep.equal(excepedWaiversAgreements);
      expect(returnState.getIn(['waivers', 'waiver_text'])).to.equal('This is online waiver.');
    });

    it('Should fetch waiver data successfully', () => {
      const waivers = null;
      const returnState = waiverReducer(undefined, {
        type: WAIVERS_UI_LIST,
        payload: waivers
      });
      expect(!returnState.getIn(['waivers', 'waiver_text'])).to.equal(true);
    });
  });
  describe('Inspect cannot checkout if required waivers are not all signed off before proceed.', () => {
    it('Should change agreement item\'s value successfully', () => {
      expect(waiverReducer(undefined, {
        type: WAIVERS_UI_AGREEMENT,
        payload: { id: 'final_system_waiver', value: true }
      }).getIn(['waiversAgreements', 'final_system_waiver', 'value'])).to.equal(true);
      expect(waiverReducer(undefined, {
        type: WAIVERS_UI_AGREEMENT,
        payload: { id: 'final_initials_waiver', value: 'asd2' }
      }).getIn(['waiversAgreements', 'final_initials_waiver', 'value'])).to.equal('asd2');
    });
    it('Should change agreement item\'s value unsuccessfully', () => {
      expect(waiverReducer(undefined, {
        type: WAIVERS_UI_AGREEMENT,
        payload: { id: 100, value: true }
      }).getIn(['waiversAgreements', '100'])).to.equal(undefined);
    });
    it('Should hide Warning Alert successfully', () => {
      expect(waiverReducer(undefined, {
        type: WAIVERS_UI_HIDE_WARNING
      }).get('warningAlertShown')).to.equal(false);
    });
    it('shoulf return waiversAgreements successfully', () => {
      const expectWaiversAgreements = {
        final_system_waiver: { required: true, value: false, error: true },
        final_initials_waiver: { required: true, value: '', error: true }
      };
      expect(waiverReducer(undefined, {
        type: WAIVERS_UI_VALIDATE_AGREEMENT,
        payload: null
      }).get('waiversAgreements').toJS()).to.deep.equal(expectWaiversAgreements);
    });
    it('shoulf return waiversAgreements by id successfully', () => {
      const expectWaiversAgreements = {
        final_system_waiver: { required: true, value: false, error: false },
        final_initials_waiver: { required: true, value: '', error: true }
      };
      expect(waiverReducer(undefined, {
        type: WAIVERS_UI_VALIDATE_AGREEMENT,
        payload: { id: 'final_initials_waiver' }
      }).get('waiversAgreements').toJS()).to.deep.equal(expectWaiversAgreements);
    });
  });
});
