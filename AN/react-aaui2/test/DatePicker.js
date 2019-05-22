import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

import DatePicker from 'DatePicker'

it("A date picker's calendar should hide by default", () => {
  const wrapper = mount(<DatePicker defaultValue={new Date()} />)

  expect(wrapper.find('.date-picker__calendar').hasClass('u-hidden')).toBe(true)
})

it("A date picker's calendar should show when focus", () => {
  const wrapper = mount(<DatePicker defaultValue={new Date()} />)

  wrapper.find('input').simulate('focus')

  expect(wrapper.find('.date-picker__calendar').hasClass('u-hidden')).toBe(
    false,
  )
})

it("A date picker's calendar should hide again when lose focus", () => {
  const wrapper = mount(<DatePicker defaultValue={new Date()} />)

  wrapper.find('input').simulate('blur')

  expect(wrapper.find('.date-picker__calendar').hasClass('u-hidden')).toBe(true)
})

it("should render right thing and don't change unexpected", () => {
  const datePicker = () => (
    <DatePicker
      defaultValue={new Date(1995, 11, 17)}
      today={new Date(1995, 11, 17)}
    />
  )
  const tree = renderer.create(datePicker()).toJSON()

  expect(tree).toMatchSnapshot()
})

it("A date picker's calendar should have right value", () => {
  const d = new Date()
  const wrapper = mount(<DatePicker defaultValue={d} />)

  expect(wrapper.instance().input.value).toBe(
    `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`,
  )
})

it("A date picker's calendar should be '' when null default date input", () => {
  const wrapper = mount(<DatePicker />)

  expect(wrapper.instance().input.value).toBe('')
})

it("A date picker's calendar should format the date value by the outer formatDate", () => {
  const newDate = new Date()
  const formatDate = d =>
    `${d.getMonth() + 1}/${d.getFullYear()}/${d.getDate()}`
  const wrapper = mount(
    <DatePicker defaultValue={newDate} formatDate={formatDate} />,
  )

  expect(wrapper.instance().input.value).toBe(formatDate(newDate))
})

it("A date picker's calendar should call onFocus once offered", () => {
  const onFocus = jest.fn()
  const wrapper = mount(
    <DatePicker defaultValue={new Date()} onFocus={onFocus} />,
  )

  wrapper.find('input').simulate('focus')

  expect(onFocus).toBeCalled()
})

it("A date picker's calendar should call onBlur once offered", () => {
  const onBlur = jest.fn()
  const wrapper = mount(
    <DatePicker defaultValue={new Date()} onBlur={onBlur} />,
  )

  wrapper.find('input').simulate('blur')

  expect(onBlur).toBeCalled()
})

it("A date picker's calendar should call onChange once offered", () => {
  const onChange = jest.fn()
  const wrapper = mount(
    <DatePicker defaultValue={new Date()} onChange={onChange} />,
  )

  wrapper.find('input').simulate('focus')
  wrapper.find('input').simulate('blur')

  expect(onChange).toBeCalled()
})

it("A date picker's calendar should call getDateStatus once offered", () => {
  const getDateStatus = jest.fn()
  const wrapper = mount(
    <DatePicker defaultValue={new Date()} getDateStatus={getDateStatus} />,
  )

  wrapper.find('input').simulate('focus')
  wrapper.find('input').simulate('blur')

  expect(getDateStatus).toBeCalled()
})

it("A date picker's calendar should call setDateClass once offered", () => {
  const setDateClass = jest.fn()

  mount(<DatePicker defaultValue={new Date()} setDateClass={setDateClass} />)

  expect(setDateClass).toBeCalled()
})

it("A date picker's calendar should call onClickDate once offered", () => {
  const onClickDate = jest.fn(() => true)
  const wrapper = mount(
    <DatePicker defaultValue={new Date()} onClickDate={onClickDate} />,
  )
  const tdDates = []

  wrapper.find('td').forEach(v => {
    tdDates.push(v)
  })
  wrapper.find('input').simulate('focus')
  tdDates[22].simulate('click')

  expect(onClickDate).toBeCalled()
})

it("A date picker's calendar should work well without onClickDate ", () => {
  const onChange = jest.fn()
  const wrapper = mount(<DatePicker value={new Date()} onChange={onChange} />)
  const tdDates = []

  wrapper.find('td').forEach(v => {
    tdDates.push(v)
  })
  wrapper.find('input').simulate('focus')
  tdDates[22].simulate('click')

  expect(onChange).toBeCalled()
})

it("A date picker's calendar should work well without status ready ", () => {
  const wrapper = mount(<DatePicker defaultValue={new Date()} />)

  wrapper.find('input').simulate('focus')
  wrapper.setState({ isDisplayed: false })
  wrapper.instance().preventStealingFocus({ preventDefault: jest.fn() })
  wrapper.find('input').simulate('click')

  expect(wrapper.find('.date-picker__calendar').hasClass('u-hidden')).toBe(true)
})

it("A date picker's calendar should has correct style when set date to today", () => {
  const now = new Date()
  const wrapper = mount(<DatePicker defaultValue={new Date()} />)

  wrapper.instance().goPrevMonth()
  wrapper.instance().goNextMonth()
  wrapper.instance().setDateClass(now, now, now)

  expect(wrapper.find('.date-picker__calendar').hasClass('u-hidden')).toBe(true)
})

it("when date picker's outer props change the value should update", () => {
  const wrapper = mount(<DatePicker defaultValue={new Date()} />)
  const oldDate = wrapper.instance().input.value

  wrapper.setProps({ value: new Date(0) })

  expect(oldDate === wrapper.instance().input.value).toBe(false)
})

it("date picker's value should reset to null when it blur with invalid value ", () => {
  const onChange = jest.fn()
  const wrapper = mount(<DatePicker value={null} onChange={onChange} />)

  wrapper.find('input').simulate('blur')

  expect(onChange).toBeCalledWith(null, '')
})

it('date picker should be hidden when it blur with correct value ', () => {
  const now = new Date()
  const wrapper = mount(<DatePicker value={now} showIcon />)

  wrapper.setState({ value: null })
  wrapper.find('input').simulate('focus')
  wrapper.setState({ value: now, showOnTop: true })
  wrapper.setProps({ transformDate: () => now })
  wrapper.find('input').simulate('blur')

  expect(wrapper.state().isDisplayed).toBe(false)
})

it("date picker's value should not update when we change default value ", () => {
  const now = new Date()
  const formatDate = d =>
    `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`
  const wrapper = mount(<DatePicker value={now} />)

  wrapper.setProps({ defaultValue: new Date() })

  expect(wrapper.instance().input.value).toBe(formatDate(now))
})

it("date picker's value can be updated from code directly ", () => {
  const wrapper = mount(<DatePicker defaultValue={new Date(1995, 11, 17)} />)
  const originalResult = wrapper.instance().value

  wrapper.instance().value = new Date(1986, 11, 13)

  expect(wrapper.instance().input.value).not.toBe(originalResult)
})
