import React from 'react';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import Error from 'shared/components/Error';

describe('shared/components/Error', () => {

  let store;

  beforeEach(() => {
    const mockStore = configureStore();
    store = mockStore();
  });

  afterEach(() => {
    store.clearActions();
  });

  const setup = props => mount(
    <Error display {...props} store={store} />
  );

  it('Error component should render correctly if no error', () => {
    const props = {
      error: {
        list: []
      }
    };
    const component = setup(props);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('Error component should render correctly with errors', () => {
    const props = {
      title: 'Error for snapshot',
      error: {
        list: [
          {
            message: 'error message1'
          },
          {
            message: 'error message2'
          },
          {
            message: 'error message3'
          },
        ]
      }
    };

    const component = setup(props);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('Error component should work fine if no reload require with normal error', () => {
    const props = {
      error: {
        list: [
          {
            message: 'error message'
          }
        ]
      }
    };

    const component = setup(props);

    component.find('button').simulate('click');
  });

  it('Error component should work fine if reload required with normal error', () => {
    const props = {
      reload: true,
      error: {
        list: [
          {
            message: 'error message'
          }
        ]
      }
    };

    const component = setup(props);

    component.find('button').simulate('click');
  });

  it('Error component should work fine with session timeout error', () => {
    const props = {
      error: {
        list: [
          {
            code: '0002',
            message: 'error message'
          }
        ]
      }
    };

    const component = setup(props);

    component.find('button').simulate('click');
  });
});
