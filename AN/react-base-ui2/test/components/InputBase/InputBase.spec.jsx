import React from 'react';
import { mount } from 'enzyme';
import InputBase from 'src/components/InputBase';

const initProps = {
  placeholder: 'input',
  disabled: true,
  showTrigger: true,
  showTrigger2: true,
  allowKeySpin: false,
  onFocus: jest.fn(),
  onKeyDown: jest.fn(),
  onBlur: jest.fn(),
  onKeyUp: jest.fn(),
  onKeyPress: jest.fn(),
  onChange: jest.fn(),
  onTextChange: jest.fn(),
  onPaste: jest.fn(),
  onInvalidInput: jest.fn(),
  onListClose: jest.fn()
};

const setup = (props = {}) => mount(<InputBase {...props} />);

jest.mock('src/services/decoration', () => ({
  disableClearable: () => {},
  enableClearable: () => {}
}));

jest.mock('src/components/List', () => ({
  SelectionMode: {},
  ListType: {},
  popup: (obj) => {
    obj.onChange();
    return {
      result: {
        then: (callback) => {
          callback(); return {
            catch: (cback) => { cback(); }
          };
        }
      }
    };
  }
}));

jest.mock('src/utils/caret', () => ({
  getCaret() {
    return 1;
  },
  select() {
    return 2;
  }
}));

describe('components => InputBase', () => {
  let component;

  it('InputBase should works fine', () => {
    component = setup(initProps);

    component.setProps({
      triggerIconToggle: '',
      triggerIconToggle2: '',
      showTrigger: true,
      showTrigger2: true,
      icon: true,
      size: false,
      errored: true,
      disabled: false,
      showSpinner: true
    });

    component.setState({
      triggerToggled: true,
      triggerToggled2: true
    });

    const inputDom = component.find('input');
    inputDom.simulate('focus');
    expect(initProps.onFocus).toHaveBeenCalled();
    inputDom.simulate('keydown');
    expect(initProps.onKeyDown).toHaveBeenCalled();
    inputDom.simulate('keyup');
    expect(initProps.onKeyUp).toHaveBeenCalled();
    inputDom.simulate('keypress');
    expect(initProps.onKeyPress).toHaveBeenCalled();
    inputDom.simulate('change');
    expect(initProps.onChange).toHaveBeenCalled();
    expect(initProps.onTextChange).toHaveBeenCalled();
    inputDom.simulate('paste');
    expect(initProps.onPaste).toHaveBeenCalled();
    inputDom.simulate('dragenter');
    inputDom.simulate('dragover');
    inputDom.simulate('drop');
    inputDom.simulate('blur');
    expect(initProps.onBlur).toHaveBeenCalled();

    const instance = component.instance();
    instance.doSpin = jest.fn();

    const arrowUpDom = component.find('.arrow-up');
    arrowUpDom.simulate('mousedown');
    arrowUpDom.simulate('click');
    expect(instance.doSpin).toHaveBeenCalled();

    const arrowDownDom = component.find('.arrow-down');
    arrowDownDom.simulate('mousedown');
    arrowDownDom.simulate('click');
    expect(instance.doSpin).toHaveBeenCalled();

    component.setState({
      triggerToggled: true
    });

    instance.onTrigger2Click = jest.fn();
    const buttonToggler = component.find('a');
    component.setState({
      triggerToggled2: true
    });
    buttonToggler.at(1).simulate('mousedown');
    buttonToggler.at(1).simulate('click');
    expect(instance.onTrigger2Click).toHaveBeenCalled();
  });

  it('InputBase instance method should works fine', () => {
    component = setup(initProps);

    component.setProps({
      triggerIconToggle: '',
      triggerIconToggle2: '',
      showTrigger: true,
      showTrigger2: true,
      icon: true,
      size: false,
      errored: true,
      disabled: false,
      showSpinner: true
    });
    const instance = component.instance();

    expect(instance.getListItemText({ text: 23 })).toEqual('23');
    expect(instance.getListItemText({ text: null })).toEqual('');
    expect(instance.getListItemText({ text: null, value: 11 })).toEqual('11');
    instance.listItems = ['testIistItems'];
    expect(instance.onListSelected()).toEqual(undefined);
    expect(instance.onListSelected([-1])).toEqual(undefined);
    expect(instance.onListSelected([11])).toEqual(undefined);
    expect(instance.onListSelected([0])).toEqual(undefined);

    expect(instance.findInList()).toEqual([-1]);
    instance.getText = () => 'asf';
    expect(instance.findInList()).toEqual([-1]);
    expect(instance.onListClose()).toEqual(undefined);
    component.setProps({ listWidth: '', listMinWidth: 35, currency: 1 });
    instance.popupList();
    instance.listItems = null;
    expect(instance.popupList()).toEqual(undefined);
    expect(instance.isBlank()).toEqual(false);
    instance.spinCount = 11;
    expect(instance.getSpinSpeed()).toEqual('fast');
    instance.spinCount = 4;
    expect(instance.getSpinSpeed()).toEqual('medium');

    expect(instance.onSpin()).toEqual(undefined);
    instance.spinFuncs = [];
    instance.allowEdit = () => true;
    instance.textProvider = {};
    instance.onSpin();
    instance.stopSpin();
    expect(instance.spinCount).toEqual(0);

    instance.onIMEBreakThrough();
    expect(instance.onKeyPressPreview()).toEqual(false);
    expect(instance.onClear()).toEqual(undefined);
    instance.silence = true;
    expect(instance.select()).toEqual(undefined);

    instance.getSelection = () => ({
      start: 0,
      end: 1
    });
    instance.textProvider = {};
    instance.textProvider.remove = () => { };
    instance.textProvider.insertAt = () => { };
    instance.textProvider.setCurrency = () => { };
    instance.doInput();
    expect(initProps.onInvalidInput).not.toHaveBeenCalled();

    const noop = () => { };
    instance.onTriggerClick = jest.fn();
    instance.onTrigger2Click = jest.fn();
    const defaultEvent = { stopPropagation: noop, preventDefault: noop, persist: noop };

    expect(instance.handleIconKeyDown({ keyCode: 13, ...defaultEvent })).toEqual(undefined);
    instance.handleIconKeyDown({ keyCode: 13, ...defaultEvent }, 1);
    expect(instance.list).not.toEqual(null);
    expect(instance.onTriggerClick).toHaveBeenCalled();
    instance.handleIconKeyDown({ which: 13, ...defaultEvent }, 2);
    instance.handleIconKeyDown({ which: 111, ...defaultEvent }, 2);
    expect(instance.onTrigger2Click).toHaveBeenCalled();

    instance.isDisabled = () => true;
    expect(instance.onClear()).toEqual(undefined);

    instance.handleIconKeyDown({ keyCode: 13, ...defaultEvent });
    instance.handleIconKeyDown({ keyCode: 9, ...defaultEvent });
    instance.onKeyDownPreview = () => false;
    expect(instance.focus()).toEqual(undefined);

    component.setProps({ allowKeySpin: false, currency: 3 });
    instance.onInputKeyDown({ which: 38, ...defaultEvent });

    instance.onInputKeyDown({ which: 40, ...defaultEvent });
    expect(instance.typing).toEqual(true);
    expect(instance.onInputKeyDown(
      { which: 62, ...defaultEvent, ctrlKey: true })).toEqual(undefined);
    expect(instance.onInputKeyDown({ keyCode: 'dd', ...defaultEvent })).toEqual(undefined);

    instance.onKeyDownPreview = () => true;

    expect(instance.onInputKeyDown(
      { which: 63, ...defaultEvent, ctrlKey: true })).toEqual(undefined);
    instance.onInputKeyDown({ which: 9, ...defaultEvent });
    instance.onInputKeyUp({ which: 9, ...defaultEvent });
    expect(instance.typing).toEqual(false);

    instance.onInputKeyUp({ keyCode: 13, ...defaultEvent });
    expect(instance.typing).toEqual(false);
    expect(instance.onInputKeyUp({ keyCode: 38, ...defaultEvent })).toEqual(undefined);
    expect(instance.onInputKeyPress({ ...defaultEvent, metaKey: true })).toEqual(undefined);
    instance.onInputKeyPress({ ...defaultEvent, nativeEvent: {} });

    instance.inputed = false;
    instance.onInputChange();
    expect(initProps.onChange).toHaveBeenCalled();
    instance.inputed = true;
    instance.onInputChange();
    expect(initProps.onTextChange).toHaveBeenCalled();

    window.clipboardData = {
      getData: () => ''
    };

    instance.onInputPaste({ ...defaultEvent });
    expect(initProps.onPaste).toHaveBeenCalled();
    window.clipboardData = {
      getData: () => 'test'
    };
    instance.onInputPaste({ ...defaultEvent });
    expect(initProps.onPaste).toHaveBeenCalled();
    instance.isBlank = () => true;
    instance.textProvider = {
      setText: noop
    };
    instance.onInputPaste({ ...defaultEvent });
    expect(initProps.onPaste).toHaveBeenCalled();

    instance.silence = false;
    instance.isDisabled = () => false;
    instance.select(10, 20);

    instance.input = {
      value: 1,
      focus: noop
    };

    instance.textProvider.setText = noop;
    instance.textProvider.remove = noop;

    instance.getText = () => 2;
    instance.syncText();
    expect(initProps.onTextChange).toHaveBeenCalled();

    instance.clearable = {};
    instance.clearable.show = noop;
    instance.isFocused = () => true;
    instance.updateClear();

    instance.allowEdit = () => false;
    expect(instance.deleteSelection()).toEqual(undefined);

    instance.allowEdit = () => true;
    instance.getSelection = () => ({
      start: 5,
      end: 5
    });
    expect(instance.deleteSelection(true)).toEqual(undefined);
    expect(initProps.onTextChange).toHaveBeenCalled();
    instance.getSelection = () => ({
      start: 5,
      end: 6
    });
    expect(instance.deleteSelection(true)).toEqual(undefined);
    expect(initProps.onTextChange).toHaveBeenCalled();
    instance.focus();

    component.unmount();
  });
});
