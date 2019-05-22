import { fromJS } from 'immutable';
import { expect } from 'chai';
import myCartReducer from 'index/components/Master/reducers';
import {
  MASTER_UI_SHOPPINGCART_COUNT,
  MASTER_ON_SHOW_MENU,
  MASTER_ON_HIDE_NAVIGATION,
  MASTER_ON_ANIMATION_END,
  MASTER_ON_EXPAND_SECONDARY_MENU
} from 'index/components/Master/consts/actionTypes';

describe('index/components/reducers/index', () => {
  it('Should fetch shopping chart count data successfully', () => {
    const returnState = myCartReducer(undefined, {
      type: MASTER_UI_SHOPPINGCART_COUNT,
      payload: 123
    });
    expect(returnState.get('cartCount')).to.equal(123);
  });

  it('Should show menu data successfully', () => {
    const returnState = myCartReducer(undefined, {
      type: MASTER_ON_SHOW_MENU
    });
    expect(returnState.get('showMenu')).to.equal(true);
  });

  it('Should hide menu data successfully', () => {
    const returnState = myCartReducer(undefined, {
      type: MASTER_ON_SHOW_MENU,
      payload: false
    });
    expect(returnState.get('showMenu')).to.equal(false);
  });

  it('Should fetch shopping chart count data default', () => {
    const returnState = myCartReducer(undefined, {
      type: 'UN_KNOW_HANDLER',
      payload: {}
    });
    expect(returnState.get('cartCount')).to.equal(0);
  });

  it('Should set MASTER_ON_SHOW_MENU well', () => {
    const returnState = myCartReducer(undefined, {
      type: MASTER_ON_SHOW_MENU
    });
    expect(returnState.get('showMenu')).to.equal(true);
    expect(returnState.get('hideMenu')).to.equal(false);
    expect(returnState.get('menuHeight')).to.equal(620);
  });

  it('Should set MASTER_ON_SHOW_MENU well when init state', () => {
    const defaultState = fromJS({
      hideMenu: true,
      showMenu: false,
      menuHeight: 980
    });
    const returnState = myCartReducer(defaultState, {
      type: MASTER_ON_SHOW_MENU
    });
    expect(returnState.get('showMenu')).to.equal(true);
    expect(returnState.get('hideMenu')).to.equal(false);
    expect(returnState.get('menuHeight')).to.equal(620);

    const htmlDom = document.getElementsByTagName('html')[0];
    const className = htmlDom.className;

    expect(className.endsWith('an-html--noscroll')).to.equal(true);
  });

  it('Should set MASTER_ON_SHOW_MENU well when init state', () => {
    const defaultState = fromJS({
      hideMenu: false,
      showMenu: false,
      menuHeight: 980
    });
    const returnState = myCartReducer(defaultState, {
      type: MASTER_ON_SHOW_MENU
    });
    expect(returnState.get('showMenu')).to.equal(true);
    expect(returnState.get('hideMenu')).to.equal(false);
    expect(returnState.get('menuHeight')).to.equal(620);

    const htmlDom = document.getElementsByTagName('html')[0];
    const className = htmlDom.className;

    expect(className.endsWith('an-html--noscroll')).to.equal(true);
  });

  it('Should set MASTER_ON_SHOW_MENU well when init state', () => {
    const defaultState = fromJS({
      hideMenu: false,
      showMenu: true,
      menuHeight: 980
    });
    const returnState = myCartReducer(defaultState, {
      type: MASTER_ON_SHOW_MENU
    });
    expect(returnState.get('showMenu')).to.equal(false);
    expect(returnState.get('hideMenu')).to.equal(false);
    expect(returnState.get('menuHeight')).to.equal(620);
  });

  it('Should set MASTER_ON_HIDE_NAVIGATION well', () => {
    const returnState = myCartReducer(undefined, {
      type: MASTER_ON_HIDE_NAVIGATION
    });
    expect(returnState.get('hideMenu')).to.equal(true);
    expect(returnState.get('showMenu')).to.equal(false);
  });

  it('Should set MASTER_ON_ANIMATION_END well', () => {
    const defaultState = fromJS({
      hideMenu: false,
      showMenu: false,
      menuHeight: 980,
      animationEnd: true
    });

    const isAnimationEnd = false;

    const returnState = myCartReducer(defaultState, {
      type: MASTER_ON_ANIMATION_END,
      payload: isAnimationEnd
    });
    expect(returnState.get('animationEnd')).to.equal(isAnimationEnd);
  });

  it('Should set MASTER_ON_EXPAND_SECONDARY_MENU well', () => {
    const defaultState = fromJS({
      expandSecondaryMenu: {}
    });

    const title = 'calender';
    const returnState = myCartReducer(defaultState, {
      type: MASTER_ON_EXPAND_SECONDARY_MENU,
      payload: { title, isExpand: true }
    });
    expect(returnState.getIn(['expandSecondaryMenu', title])).to.equal(true);
  });
});
