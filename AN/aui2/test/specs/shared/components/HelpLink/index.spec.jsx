import React from 'react';
import { fromJS } from 'immutable';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import HelpLink from 'shared/components/HelpLink';

const helpLinkData = { data: {} };

const initStore = {
  helpLink: fromJS(helpLinkData).set('data', { is_debug_on: true, help_file_name: 'AccountBalance.html' })
};

const props = {
  pageName: 'Permit.jsp'
};

describe('shared/components/HelpLink', () => {
  const setup = (initProps, store) => mount(<HelpLink {...initProps} />, { context: { store } });

  const mockStore = configureStore();


  beforeEach(() => {
    window.RH_ShowHelp = () => { };
    window.HH_HELP_CONTEXT = 15;
  });

  afterEach(() => {
    delete window.RH_ShowHelp;
    delete window.HH_HELP_CONTEXT;
  });

  it('HelpLink Components should render without errors', () => {

    const store = mockStore(initStore);
    const component = setup(props, store);

    expect(component.find('.help-link')).toHaveLength(1);
  });

  it('is_debug_on equal to false should render without errors', () => {
    const nextData = {
      is_debug_on: false,
      html_file_url: 'https://help-vip.qa.aw.dev.activenetwork.com/ActiveNet/17.4/en_US/ActiveNetHelp.htm',
      help_context_id: '1691'
    };

    const initialState = fromJS(helpLinkData);
    const nextStore = initialState.set('data', nextData);
    const store = mockStore({ helpLink: nextStore });

    const component = setup(props, store);

    component.find('div').at(1).simulate('click');
    expect(component.find('.help-link__icon')).toHaveLength(1);
  });
});

