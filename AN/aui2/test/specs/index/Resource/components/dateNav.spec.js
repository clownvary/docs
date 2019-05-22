import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';
import { fromJS } from 'immutable';
import DateNav from 'index/Resource/components/DateNav';

const props = {
  defaultDate: moment(),
  monthView: fromJS({showDayView: true})
};

describe('index/Resource/components/DateNav', () => {
  const setup = initProps => mount(<DateNav {...initProps} />);

  it('DateNav Components should render without errors', () => {
    const onGotoDate = jest.fn();
    const component = setup({ ...props, onGotoDate });

    const prevButton = component.find('.datenav__prev-button');
    prevButton.simulate('click');
    expect(onGotoDate).toHaveBeenCalledTimes(1);

    component.find('.datenav__date-text').simulate('click');
    component.node.calendar.wrappedComponent.props.valueChanged([moment().add(1, 'day')]);
    expect(onGotoDate).toHaveBeenCalledTimes(2);
    component.setProps({ monthView: fromJS({showDayView: false}) });
    component.find('.datenav__next-button').simulate('click');
    expect(onGotoDate).toHaveBeenCalledTimes(3);
  });


  it('DateNav Components props is null should render without errors', () => {
    const onGotoDate = jest.fn();
    const component = setup({ onGotoDate, monthView: fromJS({showDayView: true}) });
    const prevButton = component.find('.datenav__prev-button');
    prevButton.simulate('click');
    expect(onGotoDate).toHaveBeenCalledTimes(1);
    component.find('.datenav__next-button').simulate('click');
    expect(onGotoDate).toHaveBeenCalledTimes(2);
    component.setProps({ monthView: fromJS({showDayView: false}) });
    component.find('.datenav__date-text').simulate('click');
    component.node.calendar.wrappedComponent.props.valueChanged([moment().add(1, 'day')]);
    expect(onGotoDate).toHaveBeenCalledTimes(3);
  });
});
