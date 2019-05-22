import React from 'react';
import { mount } from 'enzyme';
import withResponsiveProvider from 'src/services/responsive/components/Provider';

class TestComponent extends React.PureComponent {
  render() {
    return <div>test</div>;
  }
}

describe('services/responsive/components/Provider.jsx', () => {
  test('withResponsiveProvider', () => {
    const ResponsiveComponent = withResponsiveProvider(TestComponent);
    const wrapper = mount(<ResponsiveComponent />);

    expect(wrapper.find(TestComponent).length).toBe(1);
    expect(wrapper.state()).toHaveProperty('orientation');
    expect(wrapper.state()).toHaveProperty('rangeName');
    expect(wrapper.state()).toHaveProperty('screenWidth');
    expect(wrapper.state()).toHaveProperty('isLg');
    expect(wrapper.state()).toHaveProperty('isMd');
    expect(wrapper.state()).toHaveProperty('isSm');

    const instance = wrapper.instance();
    instance.onChange({ test: 'test'});
    expect(wrapper.state('test')).toBe('test');

    const componentWillUnmountSpy = jest.spyOn(instance, 'componentWillUnmount');
    wrapper.unmount();
    expect(componentWillUnmountSpy).toHaveBeenCalledTimes(1);
  });
});
