import { fromJS } from 'immutable';
import expect from 'expect';
import React from 'react';
import { Configuration } from 'index/dev-admin/Configuration';
//eslint-disable-next-line
import context, { childContextTypes } from 'utils/context';
//eslint-disable-next-line
import { mountWithIntl } from 'utils/enzymeWithIntl';

const initialState = fromJS({
  loading: false,
  successful: false,
  siteId: 1,
  data: {
    siteId: 0,
    globalConfiguration: false,
    cui_url: 'apm.activecommunities.com',
    public_url: 'activenetdev0.active.com/jettytest11',
    enable_cui_seo_conversion: true,
    online_default_customer_type: 20,
    online_default_registration_page: 'OnLineIntroduction.sdi',
    default_login_format: 0,
    online_advanced_search_default_start_date_after: 'Dec 30, 1899 12:00:00 AM',
    online_advanced_search_default_start_date_before: '',
    online_default_facility_search_location: 0,
    online_default_facility_search_facility_type: 0,
    online_default_facility_search_keyword: '0',
    online_default_facility_search_show_locker_rooms: false,
    online_default_facility_search_detail_level: 0
  }
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
    readConfigurationAction: expect.createSpy(),
    readVersionAction: expect.createSpy()
  };

  const component = mountWithIntl(
    <Configuration configuration={state} params={_params} location={_location} {...actions} />,
    { context: _context, childContextTypes }
  );

  return {
    component,
    loadingText: state.get('loading') ? component.find('h2').at(0).text() : null,
    configurationSuccessfulClass: component.find('.read-config-successful').length > 0,
    configurationFailedClass: component.find('.read-config-failed').length > 0,
    actions
  };
};

describe('index/dev-admin/Configuration', () => {
  it('should render loading text `Loading...`', () => {
    const { loadingText } = setup(initialState.set('loading', true));
    expect(loadingText).toEqual('Loading...');
  });
  it('should include style class read-config-successful', () => {
    const { configurationSuccessfulClass,component } = setup(initialState.set('successful', true));
    expect(configurationSuccessfulClass).toEqual(true);
  });
  it('should include style class read-config-failed', () => {
    const { configurationFailedClass } = setup(initialState.set('successful', false));
    expect(configurationFailedClass).toEqual(true);
  });
  it('should dispatch action configurationSitesAction', () => {
    const { actions } = setup();
    expect(actions.readConfigurationAction).toHaveBeenCalled();
    expect(actions.readVersionAction).toHaveBeenCalled();
  });
});
