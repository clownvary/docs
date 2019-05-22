import React from 'react';
import { fromJS } from 'immutable';
import { mountWithIntl } from 'utils/enzymeWithIntl';
import Section from 'index/modules/Daycare/EnrollForm/components/Section';
import { EnrollDetailSection } from 'index/modules/Daycare/EnrollForm/components/EnrollDetailSection';

jest.mock('index/modules/Daycare/EnrollForm/components/EnrollDetailSection/AuthorizedPickup', () => 'AuthorizedPickup');
jest.mock('index/modules/Daycare/EnrollForm/components/EnrollDetailSection/Question', () => 'Question');

describe('index/modules/Daycare/EnrollForm/components/EnrollDetailSection', () => {
  const actions = {
    expandSection: jest.fn(),
    collapseSection: jest.fn()
  };

  const setup = ({ expanded = false, disabled = true, authorizedRequired = true } = {}) => {
    const component = mountWithIntl(
      <EnrollDetailSection
        expanded={expanded}
        disabled={disabled}
        enrollDetail={fromJS({ authorizedRequired })}
        {...actions}
      />
    );

    return {
      component
    };
  };

  it('should works correctly if section is disabled', () => {
    const { component } = setup();
    const instance = component.instance();
    expect(component.find(Section)).toHaveLength(1);
    expect(component.find('.is-disabled')).toHaveLength(1);

    const collapseIcon = component.find('.icon-chevron-down');
    collapseIcon.simulate('click');
    expect(actions.expandSection).not.toHaveBeenCalled();
    expect(actions.collapseSection).not.toHaveBeenCalled();

    instance.onSectionExpandChange();
    expect(actions.expandSection).not.toHaveBeenCalled();
    expect(actions.collapseSection).not.toHaveBeenCalled();
  });

  it('should works correctly if section is expanded', () => {
    const { component } = setup({
      expanded: true,
      disabled: false,
      authorizedRequired: false
    });
    expect(component.find(Section)).toHaveLength(1);
    expect(component.find('.is-disabled')).toHaveLength(0);

    const collapseIcon = component.find('.icon-chevron-down');
    collapseIcon.simulate('click');
    expect(actions.collapseSection).toHaveBeenCalled();
  });

  it('should works correctly if section is collapsed', () => {
    const { component } = setup({
      expanded: false,
      disabled: false
    });
    expect(component.find(Section)).toHaveLength(1);
    expect(component.find('.is-disabled')).toHaveLength(0);

    const collapseIcon = component.find('.icon-chevron-down');
    collapseIcon.simulate('click');
    expect(actions.expandSection).toHaveBeenCalled();
  });
});
