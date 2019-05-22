import React from 'react'
import { mount } from 'enzyme'

import DateRangeInput from 'form/DateRangeInput'
import formMountOptions from '../__mocks__/formMountOptions'

it('should render without errors', () => {
  const wrapper = mount(<DateRangeInput name="dateRange" />, formMountOptions)

  expect(wrapper).toBeTruthy()
})

it('should render correct things', () => {
  const wrapper = mount(<DateRangeInput name="date" />, formMountOptions)

  expect(wrapper.find('input').length === 2).toBe(true)
  expect(wrapper.prop('name') === 'date').toBe(true)
})

it('can select date which is valid', () => {
  const onChangeMock = jest.fn()
  const wrapper = mount(
    <DateRangeInput
      name="date"
      value={{ startDate: '2017-02-11', endDate: '2017-03-22' }}
      onChange={onChangeMock}
    />,
    formMountOptions,
  )

  wrapper
    .find('input')
    .first()
    .instance().value =
    '2017-01-12'
  wrapper
    .find('input')
    .first()
    .simulate('blur')

  expect(onChangeMock).toHaveBeenCalledWith({
    values: { endDate: '2017-03-22', startDate: '2017-01-12' },
  })
})

it('can not select end date which is before start date', () => {
  const onChangeMock = jest.fn()
  const wrapper = mount(
    <DateRangeInput
      name="date"
      value={{ startDate: '2017-03-11', endDate: '2017-03-22' }}
      onChange={onChangeMock}
    />,
    formMountOptions,
  )

  wrapper
    .find('DateInput')
    .at(1)
    .find('td')
    .at(10)
    .simulate('click')

  expect(onChangeMock).not.toHaveBeenCalled()

  wrapper
    .find('DateInput')
    .at(1)
    .find('td')
    .at(19)
    .simulate('click')

  expect(onChangeMock).toHaveBeenCalled()
})
