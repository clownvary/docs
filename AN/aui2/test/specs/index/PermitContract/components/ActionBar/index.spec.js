import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import ActionBar from 'index/PermitContract/components/ActionBar/index';

describe('index/PermitContract/components/ActionBar/index', () => {
  test('should render without errors', () => {
    const component = mount(<ActionBar showEmail signatures={{}}  />);
    expect(toJson(component)).toMatchSnapshot();
  });

  test('print and save-pdf works correctly', () => {
    const component = mount(<ActionBar showEmail signatures={{}}  />);

    const printBtn = component.find('button').at(0);
    const emailBtn = component.find('button').at(1);
    const savePdfBtn = component.find('button').at(2);

    const printModal = component.find('.modal').at(0);
    const emailModal = component.find('.modal').at(1);
    const savePdfModal = component.find('.modal').at(2);

    expect(component.find('.modal-wrap').length).toBe(3);
    expect(printModal.hasClass('is-open')).toBe(false);
    expect(emailModal.hasClass('is-open')).toBe(false);
    expect(savePdfBtn.hasClass('is-open')).toBe(false);

    printBtn.simulate('click');
    expect(printModal.hasClass('is-open')).toEqual(true);

    emailBtn.simulate('click');
    expect(emailModal.hasClass('is-open')).toEqual(true);

    savePdfBtn.simulate('click');
    expect(savePdfModal.hasClass('is-open')).toEqual(true);
  });
});
