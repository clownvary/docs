import React from 'react';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import createPopupHOC from 'src/services/popup/components/createPopupHOC';
import { Dock, Effect, KeyCode } from 'src/consts';
import { browser } from 'src/utils';

class MockCompnent extends React.Component {
  render() {
    const { testConnector = () => {} } = this.props;
    testConnector();
    return <div className="mock-component">Mock Compoent</div>;
  }
}

describe('services/popup/components/createPopupHOC', () => {
  const setup = (props) => {
    const PopupHOC = createPopupHOC(MockCompnent);
    return mount(<PopupHOC {...props} />);
  };

  test('basic rendering', () => {
    let wrapper = setup({ popupOptions: {} });
    expect(toJSON(wrapper)).toMatchSnapshot();

    wrapper = setup({ popupOptions: {
      effect: Effect.FADE,
      closeByClick: true,
      showShadow: true
    } });
    expect(toJSON(wrapper)).toMatchSnapshot();

    wrapper.setProps({ popupOptions: undefined });
    wrapper.setState({ popupPosition: undefined });
    expect(toJSON(wrapper)).toMatchSnapshot();

    wrapper.setProps({ popupOptions: { showMask: true } });
    expect(toJSON(wrapper)).toMatchSnapshot();

    const testConnector = () => () => {};
    const testConnectorMock = jest.fn();
    wrapper.setProps({ connectors: { testConnector }, initProps: {} });
    expect(toJSON(wrapper)).toMatchSnapshot();

    wrapper.setProps({
      connectors: { testConnector },
      initProps: { testConnector: testConnectorMock }
    });
    expect(testConnectorMock).toHaveBeenCalledTimes(1);
  });

  test('lifecycles - opening', () => {
    jest.useFakeTimers();

    let mobile = false;
    Object.defineProperty(browser, 'mobile', { get: () => mobile });

    const onAfterOpen = jest.fn();
    const wrapper = setup({ popupOptions: { dockStyle: Dock.TOP_LEFT } });
    const instance = wrapper.instance();
    const mockNode = wrapper.find('.mock-component').getDOMNode();
    jest.spyOn(mockNode, 'focus');

    expect(instance.isAlive()).toBe(true);

    instance.onOpen();
    jest.runAllTimers();
    expect(mockNode.focus).not.toBeCalled();

    wrapper.setProps({ popupOptions: {
      dockStyle: Dock.TOP_LEFT,
      distance: 10
    } });
    instance.onOpen();
    jest.runAllTimers();
    expect(toJSON(wrapper)).toMatchSnapshot();

    wrapper.setProps({ popupOptions: {
      dockStyle: Dock.LEFT_TOP,
      closeWhenViewChange: true,
      focus: true,
      onAfterOpen,
      distance: 10
    } });
    instance.onOpen();
    jest.runAllTimers();
    expect(toJSON(wrapper)).toMatchSnapshot();
    expect(onAfterOpen).toHaveBeenCalledTimes(1);
    expect(mockNode.focus).toHaveBeenCalledTimes(1);

    onAfterOpen.mockClear();
    mockNode.focus.mockClear();
    wrapper.setProps({ popupOptions: {
      dockStyle: Dock.BOTTOM_RIGHT,
      closeWhenViewChange: true,
      distance: 10
    } });
    instance.onOpen();
    jest.runAllTimers();
    expect(onAfterOpen).not.toBeCalled();
    expect(mockNode.focus).not.toBeCalled();

    wrapper.setProps({ popupOptions: {
      dockStyle: Dock.RIGHT_TOP,
      distance: 10
    } });
    instance.onOpen();
    jest.runAllTimers();
    expect(toJSON(wrapper)).toMatchSnapshot();

    wrapper.setProps({ popupOptions: {
      dockStyle: 'test test',
      closeWhenViewChange: true,
      distance: 10
    } });
    mobile = true;
    instance.onOpen();
    jest.runAllTimers();
    expect(toJSON(wrapper)).toMatchSnapshot();

    instance.popupItem = undefined;
    instance.onOpen();
    jest.runAllTimers();
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  test('lifecycles - changing', () => {
    jest.useFakeTimers();

    const onBeforeChange = jest.fn();
    const onAfterChange = jest.fn();
    const onPopupChange = jest.fn();

    const wrapper = setup({
      popupOptions: {
        dockStyle: Dock.TOP_LEFT,
        onBeforeChange,
        onAfterChange,
        effect: Effect.FADE
      },
      popupEvents: { onPopupChange }
    });
    const instance = wrapper.instance();
    expect(instance.change()).toBeUndefined();
    expect(onBeforeChange).toHaveBeenCalledTimes(1);

    onBeforeChange.mockImplementationOnce(() => true);
    instance.change();
    expect(onAfterChange).toHaveBeenCalledTimes(1);

    wrapper.setProps({
      popupOptions: { dockStyle: Dock.TOP_LEFT },
      popupEvents: { onPopupChange }
    });
    instance.change();
    jest.runAllTimers();
    expect(toJSON(wrapper)).toMatchSnapshot();

    wrapper.setProps({ popupOptions: { dockStyle: Dock.TOP_LEFT, effect: Effect.FADE } });
    instance.change();
    jest.runAllTimers();
    expect(toJSON(wrapper)).toMatchSnapshot();


    wrapper.setProps({
      popupOptions: {
        dockStyle: Dock.TOP_LEFT,
        effect: Effect.NONE
      },
      popupEvents: { }
    });
    instance.change();
    jest.runAllTimers();
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  test('events handling', () => {
    jest.useFakeTimers();

    let mobile = false;
    Object.defineProperty(browser, 'mobile', { get: () => mobile });

    const wrapper = setup({ popupOptions: { showMask: true } });
    const instance = wrapper.instance();
    const onPopupCancel = jest.fn();
    const onBeforeCancel = jest.fn();
    const onAfterCancel = jest.fn();
    const onAfterClose = jest.fn();
    jest.spyOn(instance, 'cancel');
    jest.spyOn(instance, 'onResize');
    jest.spyOn(instance, 'updatePosition');

    wrapper.find('.an-popup-desk').simulate('mousedown');
    wrapper.find('.an-popup-desk').simulate('click');
    expect(instance.cancel).not.toBeCalled();

    wrapper.setProps({
      popupOptions: { showMask: true, closeByClick: true },
      popupEvents: { onPopupCancel }
    });
    wrapper.find('.an-popup-desk').simulate('click');
    expect(instance.cancel).toHaveBeenCalledTimes(1);
    jest.runAllTimers();
    expect(onPopupCancel).toHaveBeenCalledTimes(1);

    onPopupCancel.mockClear();
    onPopupCancel.mockImplementationOnce(() => true);
    wrapper.setProps({
      popupOptions: { showMask: true, closeByClick: true, effect: Effect.FADE },
      popupEvents: { onPopupCancel, onBeforeCancel }
    });
    instance.cancel(true);
    jest.runAllTimers();
    expect(onPopupCancel).toHaveBeenCalledTimes(1);
    expect(onBeforeCancel).not.toBeCalled();

    onBeforeCancel.mockImplementationOnce(() => true);
    wrapper.setProps({
      popupOptions: { onBeforeCancel, onAfterCancel, effect: Effect.FADE },
      popupEvents: { }
    });
    instance.cancel(true);
    jest.runAllTimers();
    expect(onBeforeCancel).toHaveBeenCalledTimes(1);
    expect(onAfterCancel).toHaveBeenCalledTimes(1);

    onPopupCancel.mockClear();
    onAfterCancel.mockClear();
    onBeforeCancel.mockImplementationOnce(() => true);
    wrapper.setProps({ popupEvents: { onPopupCancel } });
    instance.cancel();
    jest.runAllTimers();
    expect(onAfterCancel).toHaveBeenCalledTimes(1);
    expect(onPopupCancel).toHaveBeenCalledTimes(1);

    onAfterCancel.mockClear();
    onBeforeCancel.mockImplementationOnce(() => false);
    instance.cancel();
    expect(onAfterCancel).not.toBeCalled();

    wrapper.setProps({ popupOptions: { dockStyle: Dock.LEFT_TOP } });
    wrapper.find(MockCompnent).prop('onResize')();
    expect(instance.onResize).toHaveBeenCalledTimes(1);

    instance.updatePosition.mockClear();
    instance.onScrollHandler();
    jest.runAllTimers();
    expect(instance.updatePosition).toHaveBeenCalledTimes(1);

    instance.onClose();
    expect(instance.lastFocus).toBeNull();

    mobile = true;
    wrapper.setProps({
      popupOptions: { onAfterClose, focus: true, closeWhenViewChange: true }
    });
    instance.onClose();
    expect(onAfterClose).toHaveBeenCalledTimes(1);

    mobile = false;
    instance.onClose();
    expect(onAfterClose).toHaveBeenCalledTimes(2);

    instance.lastFocus = wrapper.find(MockCompnent).getDOMNode();
    const lastFocusSpy = jest.spyOn(instance.lastFocus, 'focus');
    instance.onClose();
    expect(lastFocusSpy).toHaveBeenCalledTimes(1);

    instance.cancel.mockClear();
    instance.onKeyDown({});
    expect(instance.cancel).not.toBeCalled();

    wrapper.setProps({ popupOptions: { closeByEscape: true } });
    instance.onKeyDown({});
    expect(instance.cancel).not.toBeCalled();

    instance.onKeyDown({ keyCode: KeyCode.ESCAPE });
    expect(instance.cancel).toHaveBeenCalledTimes(1);
  });

  test('misc', () => {
    const target = {};
    const wrapper = setup({ popupOptions: { target }, popupEvents: {} });
    const instance = wrapper.instance();

    jest.spyOn(instance, 'cancel');
    jest.spyOn(instance, 'getMainOffset');

    expect(instance.isAlive()).toBe(true);
    expect(instance.getTarget()).toBe(target);
    expect(instance.getWrappedComponent()).toBeInstanceOf(MockCompnent);
    expect(instance.cancel).not.toBeCalled();
    instance.onViewChange();
    expect(instance.cancel).toHaveBeenCalledTimes(1);

    wrapper.setProps({ popupOptions: { dockStyle: Dock.TOP_LEFT } });
    instance.updatePosition();
    expect(instance.getMainOffset).toHaveBeenCalledTimes(1);
  });
});
