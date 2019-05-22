import React from 'react';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import AsyncContent, { PlaceHolderType, createAsyncContent } from 'src/components/AsyncContent';


const component = <div>test</div>;

describe('src/components/AsyncContent', () => {
  test('rendering', () => {
    const wrapper = mount(<AsyncContent component={component} />);
    expect(toJSON(wrapper)).toMatchSnapshot();

    wrapper.setProps({ placeHolderType: PlaceHolderType.ICON });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  test('createAsyncContent', () => {
    let AsyncComponent = createAsyncContent(
      null,
      {
        placeHolder: 'loading',
        prefix: 'an',
        'data-qa-id': 'test',
        placeHolderType: PlaceHolderType.TEXT
      }
    );

    let wrapper = mount(<AsyncComponent />);
    expect(toJSON(wrapper)).toMatchSnapshot();


    AsyncComponent = AsyncComponent = createAsyncContent(
      () => null,
      {
        placeHolder: 'loading',
        prefix: 'an',
        'data-qa-id': 'test',
        placeHolderType: PlaceHolderType.TEXT
      }
    );
    wrapper = mount(<AsyncComponent />);
    expect(toJSON(wrapper)).toMatchSnapshot();

    AsyncComponent = AsyncComponent = createAsyncContent(
      Promise.reject(),
      {
        placeHolder: 'loading',
        prefix: 'an',
        'data-qa-id': 'test',
        placeHolderType: PlaceHolderType.TEXT
      }
    );
    wrapper = mount(<AsyncComponent />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
