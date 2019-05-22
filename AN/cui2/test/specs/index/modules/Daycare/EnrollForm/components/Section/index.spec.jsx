import React from 'react';
import { mount } from 'enzyme';

import Section from 'index/modules/Daycare/EnrollForm/components/Section';

class Test extends React.PureComponent {
  render() {
    return <div className="test-component">test</div>;
  }
}

const setup = (props) => {
  const component = mount(
    <Section
      name={'test'}
      {...props}
    >
      <Test />
    </Section>
  );

  return component;
};

describe('index/modules/Daycare/EnrollForm/components/ParticipantSection', () => {
  it('should render and expand correctly', () => {
    let component = setup();
    expect(component.find(Test).length).toBe(1);
    expect(component.find('.an-collapse-item').length).toBe(1);
    expect(component.find('.an-collapse-item.is-expanded').length).toBe(0);

    component = setup({ expanded: true });
    expect(component.find('.an-collapse-item.is-expanded').length).toBe(1);
  });
});
