import { fromJS } from 'immutable';
import expect from 'expect';
import React from 'react';
import PageNotFound from 'index/components/PageNotFound';
import ErrorPage from 'shared/components/ErrorPage';
//eslint-disable-next-line
import context, { childContextTypes } from 'utils/context';
//eslint-disable-next-line
import { mountWithIntl } from 'utils/enzymeWithIntl';
import errorPageMessages from 'shared/translation/messages/errorPage';

const initialState = fromJS({});

const setup = (state = initialState, _context = context) => {
  const component = mountWithIntl(
    <PageNotFound />,
    { context: _context, childContextTypes }
  );

  return {
    component,
    ErrorPage: component.find(ErrorPage),
    hasSelfWraperClass: component.find('.error-page-not-found').length > 0,
    hasExpectedIconClass: component.find('.icon-svg-http-503').length > 0,
    ErrorTitle: component.find('h2').text(),
    ErrorDescription: component.find('p').text()
  };
};

describe('index/components/PageNotFound', () => {
  it('should render ErrorPage component', () => {
    const { ErrorPage: _ErrorPage } = setup();
    expect(_ErrorPage.length).toEqual(1);
  });
  it('should include style class page-not-found', () => {
    const { hasSelfWraperClass } = setup();
    expect(hasSelfWraperClass).toEqual(true);
  });
  it('should include style class icon-http-503', () => {
    const { hasExpectedIconClass } = setup();
    expect(hasExpectedIconClass).toEqual(true);
  });
  it('should render the expected error title', () => {
    const { ErrorTitle } = setup();
    expect(ErrorTitle).toEqual(errorPageMessages.pageNotFound_title.defaultMessage);
  });
  it('should render the expected error description', () => {
    const { ErrorDescription } = setup();
    expect(ErrorDescription).toEqual(errorPageMessages.pageNotFound_description.defaultMessage);
  });
});
