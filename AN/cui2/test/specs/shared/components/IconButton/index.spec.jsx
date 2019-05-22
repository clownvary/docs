import React from 'react';
import { IconButton } from 'shared/components/IconButton';
import { mount } from 'enzyme';

describe('shared/components/mount', () => {
  it('Should render component correctly', () => {
    const onIconButtonClick = jest.fn();
    const component = mount(
      <IconButton
        className="btn-expand"
        icon="icon-chevron-down"
        onClick={onIconButtonClick}>
        Expand
      </IconButton>
    );

    const btn = component.find('button.btn.btn-expand');
    expect(btn).toHaveLength(1);
    expect(btn.find('i.icon.icon-chevron-down')).toHaveLength(1);
    expect(btn.text()).toEqual('Expand');

    btn.simulate('click');
    expect(onIconButtonClick).toHaveBeenCalledTimes(1);
  });

  it('Should render component correctly if icon only', () => {
    const onIconButtonClick = jest.fn();
    const component = mount(
      <IconButton
        className="btn-close"
        icon="icon-chevron-up"
        onClick={onIconButtonClick} />
    );

    const btn = component.find('button.btn.btn-close.btn-icon-only');
    expect(btn).toHaveLength(1);
    expect(btn.find('i.icon.icon-chevron-up')).toHaveLength(1);

    btn.simulate('click');
    expect(onIconButtonClick).toHaveBeenCalledTimes(1);
  });
});
