import React from 'react';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme'
import BasePayer from 'index/Payment/components/BasePayer';

const clickOK = () =>{
  global.$('.dialogbox').find('.btn-strong').click();
}

const clickCancel = () =>{
  global.$('.dialogbox').find('.btn-secondary').click();
}

describe('index/Payment/components/BasePayer', () => {

  const setup = (props = {}) => mount(
    <BasePayer {...props} showChangeAlert />
  );

  it('payer alert should render without errors', () => {
    const component = setup();
    expect(toJson(component)).toMatchSnapshot();
  });

  it('payer alert\'s onCancel method should work fine', (done) => {
    const component = setup();
    component.instance().onPayerChange().catch(
      () => { done(); }
    )
    clickCancel();
  });

  it('payer alert\'s onConfirm method should work fine', (done) => {
    const component = setup();
    component.instance().onPayerChange().then(
      () => done()
    )
    clickOK();
  });

  it('onPayerChange should work fine if skipAlert is true', (done) => {
    const component = setup();
    component.instance().onPayerChange(true).then(() => {
      done();
    })
  });
});
