import createFSA from 'react-base-ui/lib/utils/createFSA';
import browser from 'react-base-ui/lib/utils/browser';
import API from '../api';
import {
  MASTER_UI_SHOPPINGCART_COUNT,
  MASTER_ON_SHOW_MENU,
  MASTER_ON_HIDE_NAVIGATION,
  MASTER_ON_ANIMATION_END,
  MASTER_ON_EXPAND_SECONDARY_MENU
} from '../consts/actionTypes';

export const updateShoppingCart = createFSA(MASTER_UI_SHOPPINGCART_COUNT);
export const showMenu = createFSA(MASTER_ON_SHOW_MENU);
export const hideNavigationAction = createFSA(MASTER_ON_HIDE_NAVIGATION);
const animationEnd = createFSA(MASTER_ON_ANIMATION_END);
const expandSecondaryMenu = createFSA(MASTER_ON_EXPAND_SECONDARY_MENU);

export const fetchShoppingCartCountAction = () =>
  dispatch => API.getCartCount().then((response) => {
    const { body: { cart_count: cartCount } } = response;
    dispatch(updateShoppingCart(cartCount));
  });

export const refreshCommonPartsActions = () =>
  fetchShoppingCartCountAction();

export const setShadowAnimationEndAction = isAnimationEnd =>
  dispatch => dispatch(animationEnd(isAnimationEnd));

let dispatchFunc = null;
let menuText = '';

const onResize = () => {
  const isShowMenu = true;
  dispatchFunc(showMenu(isShowMenu));
};

export const showMenuAction = isShowMenu => (dispatch, getState) => {
  const isDisplayMenu = typeof isShowMenu === 'undefined' ? !getState().master.get('showMenu') : isShowMenu;
  dispatchFunc = dispatch;

  if (isDisplayMenu && browser.mobile) {
    window.addEventListener('resize', onResize);
  } else {
    window.removeEventListener('resize', onResize);
  }
  return dispatch(showMenu(isShowMenu));
};

const onClick = () => {
  dispatchFunc(expandSecondaryMenu({ title: menuText, isExpand: false }));
  document.body.removeEventListener('click', onClick);
};

export const expandSecondaryMenuAction = (e = {}, title) => (dispatch) => {
  const keyCode = e.keyCode || e.which;
  let isExpandValue = false;
  dispatchFunc = dispatch;
  menuText = title;

  if (keyCode === 32) { // Show expand button when press space key
    isExpandValue = true;
    isExpandValue && document.body.addEventListener('click', onClick);
    e.stopPropagation();
    e.preventDefault();
  }

  !isExpandValue && document.body.removeEventListener('click', onClick);

  return dispatch(expandSecondaryMenu({ title, isExpand: isExpandValue }));
};
