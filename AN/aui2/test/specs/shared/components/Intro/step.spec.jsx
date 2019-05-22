import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Step from 'shared/components/Intro/step';

describe('shared/components/Intro/step', () => {
  let stepTarget;
  const id = 'intro-step-1';

  const step = {
    text: '1. First step...',
    position: 'left-bottom',
  };

  beforeEach(() => {
    jest.useFakeTimers();

    stepTarget = document.createElement('div');
    stepTarget.setAttribute('id', id);
    document.body.appendChild(stepTarget);

    step.target = stepTarget;
  });

  afterEach(() => {
    jest.clearAllTimers();

    stepTarget = document.getElementById(id);
    document.body.removeChild(stepTarget);
    step.target = null;
  });

  it('should render without errors', () => {
    const component = mount(<Step step={step} />);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('component should work fine if element is not shown', () => {
    const component = mount(<Step step={step} />);

    expect(component.find('div.intro-tooltip-left-bottom')).toHaveLength(1);

    const nextStep = document.createElement('div');
    nextStep.setAttribute('id', 'intro-step-2');
    nextStep.classList.add('intro-showElement');
    nextStep.classList.add('intro-display-inline-block');
    document.body.appendChild(nextStep);

    const newStep = Object.assign({}, step, { text: '2. Second step...', target: nextStep });
    component.setProps({ step: newStep });

    expect(setTimeout.mock.calls.length).toBe(2);

    jest.runTimersToTime(350);

    component.unmount();

    document.body.removeChild(nextStep);
  });

  it('component should work fine if element is shown', () => {
    step.target.getClientRects = () => ([{}]);
    step.target.getBoundingClientRect = () => ({ width: 0, height: 10, top: 20, left: 30 });

    const component = mount(<Step step={step} />);

    expect(component.find('div.intro-tooltip-left-bottom')).toHaveLength(1);
    expect(component.state()).toEqual({display: 'none', height: 0, left: 0, top: 0, width: 0});

    const nextStep = document.createElement('div');
    nextStep.setAttribute('id', 'intro-step-2');
    nextStep.classList.add('intro-not-display-inline-block');
    nextStep.classList.add('intro-not-showElement');
    document.body.appendChild(nextStep);

    const newStep = Object.assign({}, step, { text: '2. Second step...', target: nextStep });
    component.setProps({ step: newStep });

    expect(setTimeout.mock.calls.length).toBe(2);

    jest.runTimersToTime(350);
    expect(component.state()).toEqual({display: 'block', height: 4, left: 28, top: 18, width: 4});

    component.unmount();

    document.body.removeChild(nextStep);
  });
});
