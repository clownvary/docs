import React from 'react';
import { mount } from 'enzyme';
import Steps from 'src/components/Steps';
import StepItem from 'src/components/Steps/StepItem';

const dataSource = [
  {
    title: 'Finished',
    description: 'description'
  },
  {
    title: 'In process',
    description: 'description'
  },
  {
    title: 'In process',
    description: 'description'
  },
  {
    title: 'error',
    status: 'error',
    description: 'description'
  },
  null
];

const props = {
  labelPlacement: 'vertical',
  current: 2,
  dataSource
};


const setup = initProps => mount(<Steps {...initProps} />);
describe('Steps Component', () => {
  it('Steps should render without errors', () => {
    const component = setup(props);

    expect(component.find('.an-steps')).toHaveLength(1);
    expect(component.find('.an-steps-label--vertical')).toHaveLength(1);
    expect(component.find(StepItem)).toHaveLength(4);
  });

  it('Steps dataSource is [] and not children should render without errors', () => {
    const component = setup({ ...props, dataSource: [] });

    expect(component.find('.an-steps')).toHaveLength(0);
    expect(component.find(StepItem)).toHaveLength(0);
  });

  it('Steps have children should without errors', () => {
    const data = dataSource.filter(v => v);
    const component = mount(
      <Steps {...props}>
        {
          data.map(item => (
            <StepItem title={item.title} description={item.description} status={item.status} />
            )
          )
        }
      </Steps>
    );
    expect(component.find('.an-steps-label--vertical')).toHaveLength(1);
    expect(component.find(StepItem)).toHaveLength(4);
  });

  it('Steps getSetpStatus should work fine', () => {
    const component = setup(props);
    const instance = component.instance();

    expect(instance.getSetpStatus({ status: 'error' })).toEqual('error');
    expect(instance.getSetpStatus({}, 0)).toEqual('finish');
    expect(instance.getSetpStatus({}, 1)).toEqual('process');
    expect(instance.getSetpStatus({}, 2)).toEqual('wait');
  });

  it('Steps getSetpItemClassName should work fine', () => {
    const component = setup(props);
    const instance = component.instance();

    expect(instance.getSetpItemClassName(null, 0)).toEqual('');
    expect(instance.getSetpItemClassName(null, 2)).toEqual('an-steps__item-next--error');
  });
});
