import { fromJS } from 'immutable';
import expect from 'expect';
import React from 'react';
import { Reload } from 'index/dev-admin/Reload';
//eslint-disable-next-line
import context, { childContextTypes } from 'utils/context';
//eslint-disable-next-line
import { mountWithIntl } from 'utils/enzymeWithIntl';

const initialState = fromJS({
  loading: false,
  successful: false
});

const params = fromJS({
  siteIds: 1
});

const location = fromJS({
  search: '?site_id=1,2'
});

const setup = (
  state = initialState, _params = params, _location = location, _context = context
) => {
  const actions = {
    reloadSitesAction: expect.createSpy()
  };

  const component = mountWithIntl(
    <Reload reload={state} params={_params} location={_location} {...actions} />,
    { context: _context, childContextTypes }
  );

  return {
    component,
    loadingText: component.find('h2').text(),
    reloadSuccessfulClass: component.find('.reload-successful').length > 0,
    reloadFailedClass: component.find('.reload-failed').length > 0,
    actions
  };
};

describe('index/dev-admin/Reload', () => {
  it('should render loading text `Loading...`', () => {
    const { loadingText } = setup(initialState.set('loading', true));
    expect(loadingText).toEqual('Loading...');
  });
  it('should include style class reload-successful', () => {
    const { reloadSuccessfulClass } = setup(initialState.set('successful', true));
    expect(reloadSuccessfulClass).toEqual(true);
  });
  it('should include style class reload-failed', () => {
    const { reloadFailedClass } = setup(initialState.set('successful', false));
    expect(reloadFailedClass).toEqual(true);
  });
  it('should dispatch action reloadSitesAction', () => {
    const { actions } = setup();
    expect(actions.reloadSitesAction).toHaveBeenCalled();
  });
});
