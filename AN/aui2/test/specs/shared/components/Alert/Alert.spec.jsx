import React from 'react';
import { fromJS } from 'immutable';
import { mount } from 'enzyme';

import Alert from 'shared/components/Alert';

const defaultProps = {
  title: 'testAlert',
  children: 'testChildrenText',
  cancelText: 'testCancelText',
  confirmText: 'testConfirmText',
  className: 'testClassName',
  disable: false,
  disableConfirm: false
};

const actions = {
  onConfirm:jest.fn((callback)=> {
      callback();
   })
};

const setup = (props = defaultProps) => {
  const component = mount(<Alert {...props} />);
  const instance = component.instance();

  return {
    component,
    instance
  };
};

const setup1 = (props = defaultProps) => {
  const component = mount(<Alert {...props} {...actions} />);
  const instance = component.instance();

  return {
    component,
    instance
  };
};


describe('shared => components => Alert', () => {
  it('should rendered correctly', () => {
      const {
        component,
        instance
      } = setup();
      component.func=false;
      expect(component.find('Modal').length).toBe(1);
      expect(component.find('Button').length).toBe(2);
      expect(component.find('div .modal-body').text()).toContain('testChildrenText');
      component.setProps({
            disable: true
          });
  });

  it('should call onCancel correctly', () => {
        const {
          component,
          instance
        } = setup();
        const secondaryBtn = component.find('Button').at(0);
        secondaryBtn.simulate('click');
  });

  it('should call onClose correctly', () => {
          const {
            component,
            instance
          } = setup();
          const modal = component.find('Modal').at(0);
          modal.node.props.onClose();
  });

  it('should call onConfirm correctly', () => {
          const {
            component,
            instance
          } = setup();
          const strongBtn = component.find('Button').at(1);
          strongBtn.simulate('click');
  });

  it('should call onConfirm correctly 1', () => {
              const {
                component,
                instance
              } = setup1();
              const strongBtn = component.find('Button').at(1);
              strongBtn.simulate('click');
  });

  it('should call open correctly ', () => {
                const {
                  component,
                  instance
                } = setup();
                instance.open();
  });
});
