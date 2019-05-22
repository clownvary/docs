import { fromJS } from 'immutable';
import expect from 'expect';
import React from 'react';
import { Version } from 'index/dev-admin/Version';
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
    globalVersion: false,
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
    readVersionAction: expect.createSpy()
  };

  const component = mountWithIntl(
    <Version version={state} params={_params} location={_location} {...actions} />,
    { context: _context, childContextTypes }
  );

  return {
    component,
    loadingText: state.get('loading') ? component.find('h2').at(0).text() : null,
    versionSuccessfulClass: component.find('.read-config-successful').length > 0,
    versionFailedClass: component.find('.read-config-failed').length > 0,
    actions
  };
};

describe('index/dev-admin/Version', () => {
  it('should render loading text `Loading...`', () => {
    const { loadingText } = setup(initialState.set('loading', true));
    expect(loadingText).toEqual('Loading...');
  });
  it('should include style class read-config-successful', () => {
    const { versionSuccessfulClass } = setup(initialState.set('successful', true));
    expect(versionSuccessfulClass).toEqual(true);
  });
  it('should include style class read-config-failed', () => {
    const { versionFailedClass } = setup(initialState.set('successful', false));
    expect(versionFailedClass).toEqual(true);
  });
  it('should dispatch action versionSitesAction', () => {
    const { actions } = setup();
    expect(actions.readVersionAction).toHaveBeenCalled();
  });
});
