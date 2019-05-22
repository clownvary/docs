import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import PermitFooterBtns from 'index/PermitDetail/components/PermitFooterBtns';

const props = {
  handleSubmit: jest.fn(),
  initialData: {
    batchID: '1111111',
    receiptID: '2222222',
    receiptEntryID: '3333333'
  }
};

const store = configureStore(middlewares)(fromJS({}));

const setup = (store, props) => {
  const component = mount(<PermitFooterBtns store={store} {...props} />);

  return {
    component,
    Button: component.find('button'),
    permitBtnGroup: component.find('.permit-btn-group')
  };
};

it('PermitFooterBtns should render without errors', () => {
  const { component, Button, permitBtnGroup } = setup(store, props);
  expect(component).toBeTruthy();
  expect(permitBtnGroup).toHaveLength(1);
  Button.at(0).simulate('click');
  expect(Button.at(0).text()).toEqual('Back');
  expect(Button.at(1).text()).toEqual('Next');
});

it('PermitFooterBtns nextProps one should render without errors', () => {
  const nextProps = fromJS({
    nocharge: '1',
    autoCompeleteReceipt: 'true'
  });

  const { component, permitBtnGroup } = setup(store, props);
  component.setProps({ addToCart: nextProps });
  expect(component).toBeTruthy();
  expect(permitBtnGroup).toHaveLength(1);
});

it('PermitFooterBtns nextProps two should render without errors', () => {
  const nextProps = fromJS({
    nocharge: 'true',
    autoCompeleteReceipt: 'true'
  });

  const { component, permitBtnGroup } = setup(store, props);

  component.setProps({ addToCart: nextProps });
  expect(component).toBeTruthy();
  expect(permitBtnGroup).toHaveLength(1);
});
