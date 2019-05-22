import React from 'react';
import { mountWithIntl } from 'utils/enzymeWithIntl';

import GeneralInfo from 'index/modules/Daycare/Program/components/GeneralInfo';

const defaultProps = {
  sessionFacilities: [],
  ageMinRestriction: [0, 0, 0],
  ageMaxRestriction: [0, 0, 0],
  gender: 'Coded',
  responsive: {
    isSm: false
  }
};

const setup = (_props = {}) => {
  const props = Object.assign({}, defaultProps, _props);
  const component = mountWithIntl(<GeneralInfo {...props} />);
  return {
    component,
    infoLines: component.find('div.listbox'),
    infoItems: component.find('div.listbox-item')
  };
};

describe('index/modules/Daycare/Program/components/GeneralInfo', () => {
  it('Should render no age restriction with default props', () => {
    const { infoLines, infoItems } = setup();

    expect(infoLines).toHaveLength(2);
    expect(infoItems).toHaveLength(1);

    expect(infoItems.at(0).find('.icon-svg-user')).toHaveLength(1);
    expect(infoItems.at(0).find('span').at(0).text()).toEqual('All Ages');
  });

  it('Should render associated facility if a facility is set in props', () => {
    const sessionFacilities = [{
      id: 1, name: 'facility #1'
    }];
    const { infoItems } = setup({ sessionFacilities });

    const facilities = infoItems.at(0);
    expect(facilities.find('.icon-svg-map-marker')).toHaveLength(1);
    expect(facilities.text()).toEqual('facility #1');

    const facilityLink = facilities.find('a');
    expect(facilityLink).toHaveLength(1);
    facilityLink.simulate('click');
  });

  it('Should render associated facilities if facilities are set in props', () => {
    const sessionFacilities = [
      { id: 1, name: 'facility #1' },
      { id: 2, name: 'facility #2' }
    ];
    const { infoItems } = setup({ sessionFacilities });

    const facilities = infoItems.at(0);
    expect(facilities.find('.icon-svg-map-marker')).toHaveLength(1);
    expect(facilities.text()).toEqual('facility #1, facility #2');
    const facilityLinks = facilities.find('a');

    expect(facilityLinks).toHaveLength(2);
    facilityLinks.at(1).simulate('click');
  });

  it('Should render associated grade restriction if grade restriction is setup in props', () => {
    const gradeMinRestriction = '4th';
    const gradeMaxRestriction = '7th';
    const gender = 'female';
    const { infoItems } = setup({ gradeMinRestriction, gradeMaxRestriction, gender });

    const restrictions = infoItems.at(0);
    expect(restrictions.find('.icon-svg-user')).toHaveLength(1);

    const gradeRestriction = restrictions.find('span.grade-age-restriction');
    expect(gradeRestriction).toHaveLength(1);
    expect(gradeRestriction.text())
      .toEqual(`Grade ${gradeMinRestriction} - ${gradeMaxRestriction}`);

    const genderRestriction = restrictions.find('span').at(1);
    expect(genderRestriction.text()).toEqual('female');
  });

  it('Should render associated categories if categories is setup in props', () => {
    const primaryCategory = 'Mind & Body';
    const secondaryCategory = 'Primary Course';
    const { infoItems } = setup({ primaryCategory, secondaryCategory });

    const category = infoItems.at(1);
    expect(category.find('.icon-svg-tag')).toHaveLength(1);

    const primaryCategorySpan = category.find('span.associated-category__primary');
    expect(primaryCategorySpan.text()).toEqual(primaryCategory);

    const categorySpans = category.find('span');
    expect(categorySpans.at(1).text()).toEqual(secondaryCategory);
  });

  it('Should not render horizontal Listbox view if screen is not small ', () => {
    const { component } = setup();
    expect(component.find('.listbox-horizontal')).toHaveLength(2);

    component.setProps({ responsive: { isSm: true } });
    expect(component.find('.listbox-horizontal')).toHaveLength(0);
  });
});
