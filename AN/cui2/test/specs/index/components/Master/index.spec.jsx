import React from 'react';
import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import { mountWithIntl } from 'utils/enzymeWithIntl';
import { Master } from 'index/components/Master/index';
import middlewares from 'utils/middlewares';
import context, { childContextTypes } from 'utils/context';
import routes from './components/data/routes';

jest.mock('lodash/debounce', () => jest.fn(fn => fn));

describe('index/components/Master', () => {
  const initialProps = {
    children: (<div>mock content</div>),
    routes,
    params: {},
    responsive: { isLg: true },
    syncLegacyCuiAction: jest.fn(),
    fetchShoppingCartCountAction: jest.fn()
  };

  const store = configureStore(middlewares)({
    master: fromJS({
      expandSecondaryMenu: {}
    })
  });

  const setup = (props = {}) => mountWithIntl(
    <Master {...initialProps} {...props} />, {
      context: {
        ...context, store
      },
      childContextTypes: {
        ...childContextTypes, store
      }
    }
  );

  beforeEach(() => {
    initialProps.syncLegacyCuiAction.mockReset();
    initialProps.fetchShoppingCartCountAction.mockReset();
  });

  it('component renders fine', () => {
    const component = setup();
    const instance = component.instance();
    expect(instance.containerNode).toBeTruthy();
    expect(instance.content).toBeTruthy();
    expect(instance.footer).toBeTruthy();

    expect(component.find('.an-app')).toHaveLength(1);
    expect(component.find('.an-app--theme-legacy')).toHaveLength(1);
    expect(component.find('.an-footer__sticky')).toHaveLength(1);

    component.unmount();
  });

  it('component renders fine if it\'s not desktop', () => {
    const component = setup({ responsive: { isLg: false } });
    const instance = component.instance();
    expect(instance.containerNode).toBeTruthy();
    expect(instance.content).toBeTruthy();
    expect(instance.footer).toBeTruthy();

    expect(component.find('.an-footer__sticky')).toHaveLength(0);
    component.unmount();
  });

  it('component works fine if routes change to invalid', () => {
    const component = setup();

    expect(component.find('.page-load-accessibility-hook')).toHaveLength(1);

    component.setProps({ routes: [{}] });
    expect(component.find('.page-load-accessibility-hook').text()).toEqual('null, View loaded');
  });

  it('component update footer sticky state function works fine', () => {
    function mockOffsetHeight800() {
      this.containerNode = { offsetHeight: 800 };
    }

    const spy = jest.spyOn(Master.prototype, 'onContainerRef')
      .mockImplementationOnce(mockOffsetHeight800)

    const eventListenerCallbackMap = {};
    window.addEventListener = jest.fn((e, cb) => {
      eventListenerCallbackMap[e] = cb;
    });

    const component = setup();
    const instance = component.instance();
    expect(instance.footerStuck).toBeFalsy();
    instance.footerStuck = true;

    eventListenerCallbackMap.resize();
    expect(instance.footerStuck).toBeFalsy();
  });
});
