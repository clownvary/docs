import { fromJS } from 'immutable';
import classNames from 'classnames';
import reducerHandler from 'react-base-ui/lib/utils/reducerHandler';
import { getScreenHeightExceptHeader } from 'shared/utils/deviceTools';
import {
  MASTER_UI_SHOPPINGCART_COUNT,
  MASTER_ON_SHOW_MENU,
  MASTER_ON_HIDE_NAVIGATION,
  MASTER_ON_ANIMATION_END,
  MASTER_ON_EXPAND_SECONDARY_MENU
} from '../consts/actionTypes';

const initialState = fromJS({
  cartCount: 0,
  hideMenu: true,
  showMenu: false,
  menuHeight: 620,
  animationEnd: true,
  expandSecondaryMenu: {}
});

const handlers = {

  [MASTER_UI_SHOPPINGCART_COUNT](state, { payload: cartCount }) {
    return state.withMutations((tempState) => {
      tempState.set('cartCount', cartCount);
    });
  },

  [MASTER_ON_SHOW_MENU](state, { payload: isShowMenu }) {
    return state.withMutations((tempState) => {
      const htmlDom = document.getElementsByTagName('html')[0];
      const className = htmlDom.className;
      const showMenu = typeof isShowMenu === 'undefined' ? !tempState.get('showMenu') : isShowMenu;

      if (showMenu) {
        tempState.set('hideMenu', false);
        tempState.set('animationEnd', false);
        htmlDom.className = classNames(className, 'an-html--noscroll');
      } else {
        htmlDom.className = className.replace(' an-html--noscroll', '');
      }

      tempState.set('showMenu', showMenu);
      tempState.set('menuHeight', getScreenHeightExceptHeader());
    });
  },

  [MASTER_ON_HIDE_NAVIGATION](state) {
    return state.withMutations((tempState) => {
      tempState.set('hideMenu', true);
      tempState.set('showMenu', false);
      const htmlDom = document.getElementsByTagName('html')[0];
      const className = htmlDom.className;
      htmlDom.className = className.replace(' an-html--noscroll', '');
    });
  },

  [MASTER_ON_ANIMATION_END](state, { payload: isAnimationEnd }) {
    return state.withMutations((tempState) => {
      tempState.set('animationEnd', isAnimationEnd);
    });
  },

  [MASTER_ON_EXPAND_SECONDARY_MENU](state, { payload: { title, isExpand } }) {
    return state.withMutations((tempState) => {
      tempState.setIn(['expandSecondaryMenu', title], isExpand);
    });
  }
};

export default reducerHandler(initialState, handlers);
