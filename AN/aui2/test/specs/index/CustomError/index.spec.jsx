import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import { SafeText } from 'react-base-ui/lib/components/SafeText';

import CustomError from 'index/CustomError';

const defaultProps = {
  initialData: {
    errorMessage: 'this is a error'
  }
};
const setup = (props) => {
  const mockStore = configureStore(middlewares);

  const store = mockStore({...defaultProps, ...props});

  const component = mount(
    <CustomError
      {...props}
    />,
    { context: { store } }
  );

  return {
    component
  }
}

describe('index/CustomError/index', () => {
  test('index.jsx should work well', () => {
    const { component } = setup();

    expect(component).toHaveLength(1);
    expect(component.find(SafeText)).toHaveLength(1);
  });
});
