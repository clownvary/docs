import React from 'react';
import * as ReactIntl from 'react-intl';
import { decodeHtmlStr } from 'react-base-ui/lib/utils';

import { mountWithIntl } from '../../utils/enzymeWithIntl';
import * as Formatted from 'shared/translation/formatted';


const initialState = {
  id: 'app.buttons.add'
};
function setup(_state = initialState, componentType = 'FormattedDate') {
  const state = Object.assign({}, initialState, _state);
  const CType = Formatted[componentType];
  const component = mountWithIntl(<CType {...state} />);
  return {
    component
  };
}

describe('shared/translation', () => {
  it('should render FormattedDate component correctly', () => {
    const { component } = setup({ value: new Date(1459832991883) });
    const tempComponent = component.find(ReactIntl.FormattedDate);
    expect(tempComponent.length).toEqual(1);
    expect(tempComponent.props().children).toEqual(initialState.children);
  });
  it('should render FormattedMessage component correctly', () => {
    const testObj = { testA: 'testA_value' };
    const { component } = setup({ values: testObj }, 'FormattedMessage');
    const tempComponent = component.find(ReactIntl.FormattedMessage);
    expect(tempComponent.prop('values').testA).toEqual(decodeHtmlStr(testObj.testA));

    const testObj2 = { testB: 20 };
    component.setProps({ values: testObj2 });
    expect(tempComponent.prop('values').testB).toEqual(testObj2.testB);

    component.setProps({ values: null });
    expect(tempComponent.prop('values')).toEqual({});

    expect(tempComponent.length).toEqual(1);
  });
  it('should render FormattedNumber component correctly when browser is not IE', () => {
    const { component } = setup({
      numberStyle: 'currency',
      currencyDisplay: 'code',
      currency: 'USD',
      value: 20
}, 'FormattedNumber');
    expect(component.text()).toEqual('$20.00');
  });

  it('should render FormattedNumber component correctly when have children', () => {
    const { component } = setup({
      numberStyle: 'currency',
      currencyDisplay: 'code',
      currency: 'USD',
      value: -20,
      children: x => `test${x}`
    }, 'FormattedNumber');
    const _ins = component.instance();
    expect(_ins.getCurrency()).toEqual('test-$20.00');

    component.setProps({ children: null });
    expect(_ins.getCurrency()).toEqual('-$20.00');
  });

  it('should render FormattedNumber component correctly when have numberStyle is percent', () => {
    const { component } = setup({
      numberStyle: 'percent',
      currencyDisplay: 'code',
      currency: 'USD',
      value: -20.1356
    }, 'FormattedNumber');
    const _ins = component.instance();
    expect(_ins.getCurrency()).toEqual('-20.14%');

    component.setProps({value: 15.256});
    expect(_ins.getCurrency()).toEqual('15.26%');

    component.setProps({value: 15.254});
    expect(_ins.getCurrency()).toEqual('15.25%');

    component.setProps({value: 15.2});
    expect(_ins.getCurrency()).toEqual('15.20%');

    component.setProps({value: 0.2});
    expect(_ins.getCurrency()).toEqual('0.20%');

    component.setProps({value: 0});
    expect(_ins.getCurrency()).toEqual('0.00%');

    component.setProps({value: -4});
    expect(_ins.getCurrency()).toEqual('-4.00%');

    component.setProps({value: -4.256});
    expect(_ins.getCurrency()).toEqual('-4.26%');

    component.setProps({value: -4.254});
    expect(_ins.getCurrency()).toEqual('-4.25%');

    component.setProps({value: -5.1});
    expect(_ins.getCurrency()).toEqual('-5.10%');
  });

  it('should render FormattedPlural component correctly', () => {
    const { component } = setup({ other: 'test', value: 'test' }, 'FormattedPlural');
    const tempComponent = component.find(ReactIntl.FormattedPlural);
    expect(tempComponent.length).toEqual(1);
    expect(tempComponent.props().children).toEqual(initialState.children);
  });
  it('should render FormattedTime component correctly', () => {
    const { component } = setup({ value: new Date(1459832991883) }, 'FormattedTime');
    const tempComponent = component.find(ReactIntl.FormattedTime);
    expect(tempComponent.length).toEqual(1);
    expect(tempComponent.props().children).toEqual(initialState.children);
  });
  it('should render FormattedDyncMessage component correctly', () => {
    const { component } = setup({ value: null }, 'FormattedDyncMessage');
    const tempComponent = component.find('span');
    expect(tempComponent.length).toEqual(1);
  });
  it('should render FormattedRelative component correctly', () => {
    const { component } = setup({ value: new Date(1459832991883) }, 'FormattedRelative');
    const tempComponent = component.find(ReactIntl.FormattedRelative);
    expect(tempComponent.length).toEqual(1);
    expect(tempComponent.props().children).toEqual(initialState.children);
  });
  it('should render FormattedHtmlMessage component correctly', () => {
    const { component } = setup({ value: null }, 'FormattedHtmlMessage');
    const tempComponent = component.find('span');
    expect(tempComponent.length).toEqual(1);
  });
});

