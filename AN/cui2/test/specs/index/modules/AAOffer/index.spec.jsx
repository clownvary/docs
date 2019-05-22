import React from 'react';
import { mount } from 'enzyme';
import context, { childContextTypes } from 'utils/context';
import { AAOffer } from 'index/modules/AAOffer/index';
import Actions from 'index/modules/AAOffer/const/actionTypes';

function setup(_context = context) {
  const actions = {
    acceptAAOfferAsyncAction: jest.fn(),
    redirectToConfirmAction: jest.fn()
  }
  const component = mount(
    <AAOffer {...actions} />, { context: _context, childContextTypes });
  return {
    component,
    actions
  };
}

describe('index/modules/AAOffer/index', () => {
  it('Iframe with correct props.', () => {
    const { component } = setup();
    expect(component.find('Iframe')).toHaveLength(1);
    expect(component.find('Iframe').at(0).prop('src')).toContain('/getaaofferhtml');
  });

  it('removeEventListener should be trigger correctly when component unmount', () => {
    const { component } = setup();
    const removeSpy = jest.spyOn(window, 'removeEventListener');
    component.unmount();
    expect(removeSpy).toHaveBeenCalled();
  });

  describe('message:', () => {
    it('acceptAAOfferAsyncAction should be trigger when action is SUBMIT', () => {
      const { actions } = setup();
      const event = new Event('message');
      event.data = { action: Actions.SUBMIT };
      window.dispatchEvent(event);
      expect(actions.acceptAAOfferAsyncAction).toHaveBeenCalled();
    });
    it('redirectToConfirmAction should be trigger when action is DECLINE', () => {
      const { actions } = setup();
      const event = new Event('message');
      event.data = { action: Actions.DECLINE };
      window.dispatchEvent(event);
      expect(actions.redirectToConfirmAction).toHaveBeenCalled();
    });
    it('iframe height should be set when action is SETHEIGHT', () => {
      const { component } = setup();
      const event = new Event('message');
      event.data = { action: Actions.SETHEIGHT, height: 200 };
      window.dispatchEvent(event);
      expect(component.instance().iframe.iframe.height).toBe('200');
    });
    it('no action should be trigger when action is other', () => {
      const { actions } = setup();
      const event = new Event('message');
      event.data = { action: 'other' };
      window.dispatchEvent(event);
      expect(actions.acceptAAOfferAsyncAction).not.toHaveBeenCalled();
      expect(actions.redirectToConfirmAction).not.toHaveBeenCalled();
    });
    it('no action should be trigger when action is undefined', () => {
      const { actions } = setup();
      const event = new Event('message');
      event.data = { action: undefined };
      window.dispatchEvent(event);
      expect(actions.acceptAAOfferAsyncAction).not.toHaveBeenCalled();
      expect(actions.redirectToConfirmAction).not.toHaveBeenCalled();
    });
  });

});

