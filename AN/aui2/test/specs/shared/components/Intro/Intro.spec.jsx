import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Intro from 'shared/components/Intro';

jest.mock('shared/components/Intro/step', () => 'Step');

describe('shared/components/Intro/index', () => {
  let stepTarget;
  const id1 = 'intro-step-1';

  const props = {
    steps: [
      {
        text: '1. First step...',
        element: `#${id1}`
      },
      {
        text: '2. Second step...(invalid)',
        element: '#invalid-id'
      }
    ],
    hide: true,
    ready: false,
    children: null
  };

  beforeEach(() => {
    stepTarget = document.createElement('div');
    stepTarget.setAttribute('id', id1);
    document.body.appendChild(stepTarget);
  });

  afterEach(() => {
    stepTarget = document.getElementById(id1);
    document.body.removeChild(stepTarget);

    const div = document.querySelector('div');
    div && document.body.removeChild(div);
  });

  it('should render without errors', () => {
    const component = mount(<Intro {...props} />);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('component should work fine', () => {
    const controlBtnClick = jest.fn();
    const component = mount(<Intro {...props} onClickCallback={controlBtnClick} />);

    expect(document.querySelector('.intro').className.indexOf('u-hidden')).toBeGreaterThanOrEqual(0);

    const newProps = Object.assign({}, props, { hide: false, ready: true, children: 'Intro...' });
    component.setProps(newProps);

    expect(document.querySelector('.intro').className.indexOf('u-hidden')).toBeLessThan(0);

    document.querySelector('.intro-control-btn').click();
    expect(controlBtnClick).toHaveBeenCalled();

    window.dispatchEvent(new Event('resize'))

    component.unmount();
  });

  it('component should unmount correctly if not giving click callback', () => {
    const component = mount(<Intro {...props} />);
    document.querySelector('.intro-control-btn').click();
  });
});
