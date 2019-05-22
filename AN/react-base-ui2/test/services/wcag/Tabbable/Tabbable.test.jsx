import React from 'react';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { DefaultCSSPrefix } from 'src/consts';
import Tabbable from 'src/services/wcag/Tabbable';

const setup = (props = {}) => mount(<Tabbable {...props} />);

describe('components/Tabbable', () => {
  it('component should render well', () => {
    const snapshot = toJSON(setup());
    expect(snapshot).toMatchSnapshot();
  });
  it('onClick should be trigger', () => {

    const spy = jest.fn();
    const component = setup({ onClick: spy });
    component.find(`.${DefaultCSSPrefix}-tabbable`).simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});

