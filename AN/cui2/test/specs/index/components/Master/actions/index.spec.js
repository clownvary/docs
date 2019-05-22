import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import helper from 'utils/testHelper';
import middlewares from 'utils/middlewares';
import * as actions from 'index/components/Master/actions';
import * as actionTypes from 'index/components/Master/consts/actionTypes';

describe('index/components/actions/index', () => {
  let store = null;

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({
      common: fromJS({
        myCart: {
          cartCount: 100
        }
      }),
      master: fromJS({ showMenu: false })
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  describe('Dispatch Action(UI): fetchShoppingCartCountAction', () => {
    it('Should return expected Action Object.', (done) => {
      const {
        fetchShoppingCartCountAction
      } = actions;

      store.dispatch(fetchShoppingCartCountAction()).then(() => {
        expect(helper.isIncluding([
          {
            type: actionTypes.MASTER_UI_SHOPPINGCART_COUNT
          }], store.getActions())).toBeTruthy();

        done();
      });
    });
  });

  describe('Dispatch Action(UI): refreshCommonPartsActions', () => {
    it('Should return expected Action Object.', (done) => {
      const {
        refreshCommonPartsActions
      } = actions;
      store.dispatch(refreshCommonPartsActions()).then(() => {
        expect(helper.isIncluding([
          {
            type: actionTypes.MASTER_UI_SHOPPINGCART_COUNT
          }], store.getActions())).toBeTruthy();

        done();
      });
    });
  });

  describe('Dispatch Action(UI): showMenuAction', () => {
    it('Should return expected Action Object.', () => {
      const {
          showMenuAction
        } = actions;

      store.dispatch(showMenuAction({ isShowMenu: true }));

      if (document.createEvent) {
        const event = document.createEvent('HTMLEvents');
        event.initEvent('resize', true, true);
        window.dispatchEvent(event);
      } else if (document.createEventObject) {
        window.fireEvent('onresize');
      }

      expect(helper.isIncluding([
        {
          type: actionTypes.MASTER_ON_SHOW_MENU
        }], store.getActions())).toBeTruthy();
    });

    it('Should return expected Action Object.', () => {
      const {
          showMenuAction
        } = actions;

      store.dispatch(showMenuAction());
      expect(helper.isIncluding([
        {
          type: actionTypes.MASTER_ON_SHOW_MENU
        }], store.getActions())).toBeTruthy();

      store.getState().master = fromJS({ showMenu: true });
      store.dispatch(showMenuAction());
      expect(helper.isIncluding([
        {
          type: actionTypes.MASTER_ON_SHOW_MENU
        }], store.getActions())).toBeTruthy();
    });
  });

  describe('Dispatch Action(UI): hideNavigationAction', () => {
    it('Should return expected Action Object.', () => {
      const {
          hideNavigationAction
        } = actions;
      store.dispatch(hideNavigationAction());
      expect(helper.isIncluding([
        {
          type: actionTypes.MASTER_ON_HIDE_NAVIGATION
        }], store.getActions())).toBeTruthy();
    });
  });

  describe('Dispatch Action(UI): setShadowAnimationEndAction', () => {
    it('Should return expected Action Object.', () => {
      const {
          setShadowAnimationEndAction
        } = actions;
      store.dispatch(setShadowAnimationEndAction());
      expect(helper.isIncluding([
        {
          type: actionTypes.MASTER_ON_ANIMATION_END
        }], store.getActions())).toBeTruthy();
    });
  });

  describe('Dispatch Action(UI): expandSecondaryMenuAction', () => {
    it('Should return expected Action Object.', () => {
      const { expandSecondaryMenuAction } = actions;
      store.dispatch(expandSecondaryMenuAction({ keyCode: 32, stopPropagation() {}, preventDefault() {} }, 'calendar'));
      expect(helper.isIncluding([
        {
          type: actionTypes.MASTER_ON_EXPAND_SECONDARY_MENU
        }], store.getActions())).toBeTruthy();

      store.dispatch(expandSecondaryMenuAction({ keyCode: 32, stopPropagation() {}, preventDefault() {} }, 'calendar'));
      document.body.click();
      expect(helper.isIncluding([
        {
          type: actionTypes.MASTER_ON_EXPAND_SECONDARY_MENU
        }], store.getActions())).toBeTruthy();

      store.dispatch(expandSecondaryMenuAction({ which: 36, stopPropagation() {}, preventDefault() {} }, 'calendar'));
      expect(helper.isIncluding([
        {
          type: actionTypes.MASTER_ON_EXPAND_SECONDARY_MENU
        }], store.getActions())).toBeTruthy();
    });
  });
});
