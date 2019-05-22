import React from 'react';
import { mount } from 'enzyme';
import Tooltip from 'src/components/Tooltip';
import { Dock, Trigger, Theme } from 'src/consts';

const TooltipAttrKey = 'data-tooltip';
const TooltipControllerKey = 'data-an-tooltip-controller';
const TooltipOptions = {
  className: '',
  content: '',
  dockStyle: Dock.BOTTOM_LEFT,
  offset: 0,
  selector: `[${TooltipAttrKey}]`,
  trigger: Trigger.HOVER,
  theme: Theme.LIGHT,
  onOpen: null,
  onClose: null
};

const setup = (props = {}) => {
  const newProps = { ...TooltipOptions, ...props };
  const component = mount(<Tooltip {...newProps} />);

  return {
    component,
    tooltip: component.find('.an-tooltip')
  };
};

describe('Tooltip Component', () => {
  afterEach(() => {
    const targets = document.body.querySelectorAll('div[class="toolTipDemo"]');
    if (targets.length) {
      targets.forEach((target) => {
        document.body.removeChild(target);
      });
    }
  });

  test('Directive mode use default props', () => {
    const content = 'Using default props';
    const {
      component,
      tooltip
    } = setup({
      content
    });
    expect(component.length).toEqual(1);
    expect(tooltip.length).toEqual(1);
    expect(tooltip.text()).toEqual(content);

    component.unmount();
  });

  test('Directive mode use custom props', () => {
    const content = 'Using custom props';
    const onOpen = (() => { });
    const onClose = (() => { });

    const {
      component,
      tooltip
    } = setup({
      dockStyle: Dock.BOTTOM_LEFT,
      content: (() => content),
      onOpen,
      onClose
    });
    expect(component.length).toEqual(1);
    expect(tooltip.length).toEqual(1);
    expect(tooltip.text()).toEqual(content);
    expect(onOpen.call.length).toEqual(1);

    const content1 = 'Using custom props -- update';
    component.setProps({
      content: content1
    });
    expect(tooltip.text()).toEqual(content1);

    // this.props.content = nextProps.content
    component.setProps({
      dockStyle: Dock.BOTTOM_RIGHT,
      theme: Theme.DARK,
      content: content1
    });
    expect(tooltip.text()).toEqual(content1);

    const content2 = 'Using custom props -- update';
    component.setProps({
      content: (() => content2)
    });
    expect(tooltip.text()).toEqual(content2);

    component.unmount();
    expect(onClose.call.length).toEqual(1);
  });

  test('Global default settings for all tooltip instance - default selector, no target', () => {
    Tooltip.build();
    Tooltip.clean();
  });


  test('Global default settings for all tooltip instance - set selector and trigger is "hover"', () => {
    const toolTipDemo = document.createElement('div');
    toolTipDemo.setAttribute('class', 'toolTipDemo');
    toolTipDemo.setAttribute('data-tooltip', true);
    document.body.appendChild(toolTipDemo);

    Tooltip.build();
    toolTipDemo.dispatchEvent(new Event('mouseOver'));
    const tooltipTarget = document.querySelectorAll(`[${TooltipAttrKey}=true]`);
    expect(tooltipTarget.length).toEqual(1);
  });

  test('Global default settings for all tooltip instance - default selector and trigger is "click"', () => {
    const toolTipDemo1 = document.createElement('div');
    toolTipDemo1.setAttribute('class', 'toolTipDemo');
    toolTipDemo1.setAttribute('data-tooltip-trigger', Trigger.CLICK);
    document.body.appendChild(toolTipDemo1);

    const toolTipDemo2 = document.createElement('div');
    toolTipDemo2.setAttribute('class', 'toolTipDemo');
    toolTipDemo2.setAttribute('data-tooltip-trigger', Trigger.CLICK);
    document.body.appendChild(toolTipDemo2);

    Tooltip.build('.toolTipDemo');

    const event = new Event('click', {
      bubbles: true,
      cancelable: false
    });
    toolTipDemo1.dispatchEvent(event);
    toolTipDemo2.dispatchEvent(event);

    const tooltipTarget = document.querySelectorAll(`[${TooltipControllerKey}=true]`);
    Tooltip.clean();
    expect(tooltipTarget.length).toEqual(2);
  });

  test('Global default settings for all tooltip instance - set selector and trigger is "focus"', () => {
    const toolTipDemo = document.createElement('div');
    toolTipDemo.setAttribute('class', 'toolTipDemo');
    toolTipDemo.setAttribute('data-tooltip', true);
    document.body.appendChild(toolTipDemo);

    const defaultOptions = Tooltip.option({
      trigger: Trigger.FOCUS
    });

    Tooltip.build('.toolTipDemo', document);
    Tooltip.clean();

    expect(defaultOptions.selector).toEqual(`[${TooltipAttrKey}]`);
    expect(defaultOptions.trigger).toEqual(Trigger.FOCUS);
  });

  test('Global default settings for all tooltip instance - set selector is "" and trigger is "other"', () => {
    const toolTipDemo = document.createElement('div');
    toolTipDemo.setAttribute('class', 'toolTipDemo');
    toolTipDemo.setAttribute('title', 'data-tooltip');
    toolTipDemo.setAttribute('data-tooltip-trigger', 'other');
    document.body.appendChild(toolTipDemo);

    Tooltip.option({
      selector: ''
    });
    Tooltip.build();
    Tooltip.clean();

    const defaultOptions = Tooltip.option();
    expect(defaultOptions.selector).toEqual('');
  });

  test('API mode - open()', () => {
    const content = 'test by API mode';
    const onOpen = (() => { });
    const onClose = (() => { });

    const toolTipDemo = document.createElement('button');
    toolTipDemo.setAttribute('class', 'toolTipDemo');
    document.body.appendChild(toolTipDemo);

    const tooltipOptions = {
      content,
      onOpen,
      onClose
    };
    const target = document.querySelector('.toolTipDemo');

    const tooltipInstance = Tooltip.open(target, tooltipOptions);
    setTimeout(() => {
      expect(tooltipInstance).toBeTruthy();

      Tooltip.close();
      document.body.removeChild(toolTipDemo);
      expect(tooltipInstance).toBeNull();
    }, 10);
  });

  test('API mode - open(), content is a promise', () => {
    const content = new Promise(resolve => (
      setTimeout(() => {
        resolve('Success!');
      }, 1000)
    ));

    const toolTipDemo = document.createElement('button');
    toolTipDemo.setAttribute('class', 'toolTipDemo');
    document.body.appendChild(toolTipDemo);

    const tooltipOptions = {
      content
    };
    const target = document.querySelector('.toolTipDemo');

    const tooltipInstance = Tooltip.open(target, tooltipOptions);
    expect(tooltipInstance).toBeTruthy();
    Tooltip.close();
    document.body.removeChild(toolTipDemo);
  });

  test('API mode - open() no target', () => {
    const tooltipInstance = Tooltip.open();
    expect(tooltipInstance).toBeNull();
  });

  test('API mode - close()', () => {
    const content = 'test by API mode';
    const onOpen = (() => { });
    const onClose = (() => { });

    const toolTipDemo = document.createElement('button');
    toolTipDemo.setAttribute('class', 'toolTipDemo');
    document.body.appendChild(toolTipDemo);

    const tooltipOptions = {
      trigger: Trigger.CLICK,
      dockStyle: Dock.BOTTOM_LEFT,
      content,
      onOpen,
      onClose
    };
    const target = document.querySelector('.toolTipDemo');

    const tooltipInstance = Tooltip.open(target, tooltipOptions);
    setTimeout(() => {
      expect(tooltipInstance).toBeTruthy();

      Tooltip.close();
      document.body.removeChild(toolTipDemo);
      expect(tooltipInstance).toBeNull();
    }, 10);
  });
});
