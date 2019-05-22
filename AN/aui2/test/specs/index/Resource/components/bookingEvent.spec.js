import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import BookingEvent from 'index/Resource/components/BookingInformation/BookingEvent';

const setup = props => mount(<BookingEvent {...props} />);

describe('index/resource/components/BookingInformation/BookingEvent', () => {
  describe('render booking event information', () => {
    let component = null;
    let container = null;

    const error = {
      entity: {
        eventName: 'event name is invalid',
        scheduleTypeID: 'event name is invalid'
      }
    };

    const props = {
      eventName: '&lt;Annual Party&gt;',
      scheduleTypes: fromJS([
        { id: 31, text: 'nulla', value: 31 },
        { id: 32, text: 'veniam', value: 32 },
        { id: 33, text: 'est', value: 33 }
      ]),
      scheduleTypeID: 31,
      error: fromJS(error),
      syncDataFromBookingInfoToCalendar: jest.fn(),
      updateBookingInfoEvent: jest.fn(),
      changeEventName: jest.fn(),
      changeScheduleType: jest.fn()
    };

    beforeEach(() => {
      component = setup(props);
      container = component.find('.section-event');
    });
    afterEach(() => {
      component.unmount();
      component = null;
      container = null;
    });

    it('component and initialization works fine', () => {
      expect(container.find('#eventName')).toHaveLength(1);
      expect(container.find('#eventName').node.value).toEqual('<Annual Party>');

      const scheduleTypeContainer = container.find('.aaui-dropdown');
      expect(scheduleTypeContainer).toHaveLength(1);
      expect(scheduleTypeContainer.find('div.aaui-dropdown__button-text').text()).toEqual(' nulla');
      const scheduleTypeOptions = scheduleTypeContainer.find('li[role]');
      expect(scheduleTypeOptions).toHaveLength(3);
      expect(scheduleTypeOptions.get(0).textContent).toEqual('nulla');
      expect(scheduleTypeOptions.get(1).textContent).toEqual('veniam');
      expect(scheduleTypeOptions.get(2).textContent).toEqual('est');
      expect(component.find(Dropdown).props().data).toEqual(props.scheduleTypes.toJS());
      expect(component.find(Dropdown).props().value).toEqual(31);
    });

    it('show correct highlight error styles if validate failed', () => {
      expect(component.find('.input-group').hasClass('error-field')).toBe(true);
      expect(component.find('.aaui-dropdown').hasClass('error-field')).toBe(true);
    });

    it('event name bind event works fine', () => {
      const eventNameInput = component.find('#eventName');
      eventNameInput.simulate('focus');
      eventNameInput.simulate('change', 'Annual Party');
      expect(props.changeEventName).not.toHaveBeenCalled();
      expect(props.updateBookingInfoEvent).toHaveBeenCalledTimes(1);
    });

    it('schedule type dropdown bind event works fine negative', () => {
      const nextError = {
        entity: {
          eventName: '',
          scheduleTypeID: ''
        }
      };
      const nextProps = { ...props, ...{ error: fromJS(nextError) }, display: true };
      component.setProps({ ...nextProps });

      const scheduleItem = component.find('ul li[role="option"]');
      scheduleItem.at(1).simulate('click');
      expect(props.changeScheduleType).not.toHaveBeenCalled();
      scheduleItem.at(0).simulate('click');
      expect(props.updateBookingInfoEvent).toHaveBeenCalledTimes(3);
    });
  });
});
