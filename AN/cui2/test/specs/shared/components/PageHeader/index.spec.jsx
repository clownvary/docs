import React from 'react';
import { shallow } from 'enzyme';
import context, { childContextTypes } from 'utils/context';

import PageHeader from 'shared/components/PageHeader/index';

const initialState = {
  className: 'test',
  classes: 'tests',
  children: '<h1>test</h1>',
  routes: [
    {
      path: 'abc',
      pageHeaderOptions: {
        title: 'def',
        specificContentId: 'page_newcuishoppingcart_header'
      }
    }
  ]
};

function setupLink(_state = initialState, _context = context) {
  const component = shallow(<PageHeader {..._state} />, { context: _context, childContextTypes });
  return {
    component,
    h1: component.find('h1'),
    logo: component.find('.logo-wrapper'),
    specificContent: component.find('.page-header-specific')
  };
}

describe('shared/components/PageHeader', () => {
  describe('check default rennder', () => {
    it('should render component correctly', () => {
      const { component, h1, specificContent } = setupLink(undefined, {
        ...context,
        configurations: context.configurations.set('page_newcuishoppingcart_header', 'test')
      });
      expect(specificContent.length).toEqual(1);
      expect(h1.length).toEqual(1);
      expect(component.find('div').first().prop('className')).toEqual(`${initialState.classes} ${initialState.className}`);

      const { specificContent: specificContent1 } = setupLink();
      expect(specificContent1.length).toEqual(0);
    });
  });

  describe('check rennder - routes property', () => {
    it('should render specificContent and title if has routes', () => {
      const { h1, specificContent } = setupLink(undefined, {
        ...context,
        configurations: context.configurations.set('page_newcuishoppingcart_header', 'test')
      });
      expect(specificContent.length).toEqual(1);
      expect(h1.length).toEqual(1);
    });

    it('should not render specificContent  and title if no routes', () => {
      const { h1, specificContent } = setupLink({
        ...initialState,
        routes: undefined
      });
      expect(specificContent.length).toEqual(0);
      expect(h1.length).toEqual(0);
    });
  });

  describe('check rennder - specificContent property', () => {
    it('should render specificContent if has specificContentId', () => {
      const { specificContent } = setupLink(undefined, {
        ...context,
        configurations: context.configurations.set('page_newcuishoppingcart_header', 'test')
      });
      expect(specificContent.length).toEqual(1);
    });

    it('should not render specificContent if no specificContentId', () => {
      const { specificContent } = setupLink();
      expect(specificContent.length).toEqual(0);
    });
  });

  describe('check rennder - title property', () => {
    it('should render title label if has title', () => {
      const { h1 } = setupLink(undefined, {
        ...context,
        configurations: context.configurations.set('page_newcuishoppingcart_header', 'test')
      });
      expect(h1.length).toEqual(1);
    });

    it('should not render title label if no title', () => {
      const { h1 } = setupLink({
        ...initialState,
        routes: [{
          path: 'abc',
          pageHeaderOptions: {
            specificContentId: 'page_newcuishoppingcart_header'
          }
        }]
      },{
        ...context,
        configurations: context.configurations.set('page_newcuishoppingcart_header', 'test')
      });
      expect(h1.length).toEqual(0);
    });

    it('should render title label if title is a i18n object', () => {
      const { h1 } = setupLink({
        ...initialState,
        routes: [{
          path: 'abc',
          pageHeaderOptions: {
            title: { id: 'xxx' },
            specificContentId: 'page_newcuishoppingcart_header'
          }
        }]
      },{
        ...context,
        configurations: context.configurations.set('page_newcuishoppingcart_header', 'test')
      });
      expect(h1.length).toEqual(1);
    });
  });

  describe('check rennder - hide_active_branding property', () => {
    it('should render active logo if hide_active_branding is false', () => {
      const { logo } = setupLink(undefined, {
        ...context,
        configurations: context.configurations.set('hide_active_branding', false)
      });
      expect(logo.length).toEqual(1);
    });

    it('should not render active logo if hide_active_branding is true', () => {
      const { logo } = setupLink(undefined, {
        ...context,
        configurations: context.configurations.set('hide_active_branding', true)
      });
      expect(logo.length).toEqual(0);
    });
  });
});
