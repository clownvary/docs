import React from 'react'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'

import SearchInput from 'SearchInput'
import KEY_CODES from 'shared/keyCodes'

beforeAll(() => {
  jest.useFakeTimers()
})

afterAll(() => {
  jest.useRealTimers()
})

it('should render without errors', () => {
  const wrapper = shallow(<SearchInput />)

  expect(wrapper).toBeTruthy()
})

it('should render right thing', () => {
  const wrapper = mount(<SearchInput />)

  expect(wrapper.find('input').length).toBe(1)
  expect(wrapper.find('button').length).toBe(1)
})

it('should support adding `className`', () => {
  const customClassName = 'my-custom-className'
  const wrapper = shallow(<SearchInput className={customClassName} />)

  expect(wrapper.hasClass(customClassName)).toBe(true)
})

it('should not render search button when trigger is not `button`', () => {
  const trigger = 'enter'
  const wrapper = shallow(<SearchInput trigger={trigger} />)

  expect(wrapper.find('button').length === 0).toBe(true)
})

it("should render right thing and don't change unexpected", () => {
  const tree = renderer.create(<SearchInput />).toJSON()

  expect(tree).toMatchSnapshot()
})

it('should render different sizes depending on size prop', () => {
  const size = 'lg'
  const wrapper = shallow(<SearchInput size={size} />)

  expect(wrapper.hasClass(`search-box--${size}`)).toBe(true)
})

it('should set state value to be the `value` prop by default', () => {
  const wrapper = shallow(<SearchInput value="abc" />)

  expect(wrapper.state('value')).toBe('abc')
})

it('should change state value when the `value` prop updates', () => {
  const wrapper = shallow(<SearchInput value="abc" />)

  wrapper.setProps({
    value: 'xyz',
  })

  expect(wrapper.state('value')).toBe('xyz')
})

it('should keep the state value when the `value` prop does NOT update', () => {
  const value = 'test'
  const wrapper = shallow(<SearchInput value={value} />)

  wrapper.setProps({
    value,
  })

  expect(wrapper.state('value')).toBe(value)
})

it('should call `onSearch` callback after clicking the button when trigger is `button` by default', () => {
  const onSearch = jest.fn()
  const wrapper = mount(<SearchInput onSearch={onSearch} />)
  const value = 'TEST'

  wrapper.find('input').simulate('change', {
    persist: () => {},
    target: {
      value,
    },
  })

  wrapper.find('button').simulate('click')

  jest.runAllTimers()

  expect(onSearch).toBeCalled()
  expect(onSearch).toBeCalledWith(value)
})

it('should call `onSearch` callback after inputing texts when trigger is `input`', () => {
  const onSearch = jest.fn()
  const wrapper = mount(<SearchInput trigger="input" onSearch={onSearch} />)
  const value = 'TEST'

  wrapper.find('input').simulate('change', {
    persist: () => {},
    target: {
      value,
    },
  })

  jest.runAllTimers()

  expect(onSearch).toBeCalled()
  expect(onSearch).toBeCalledWith(value)
})

it('should call `onSearch` callback after press the ENTER key when trigger is `enter`', () => {
  const onSearch = jest.fn()
  const value = 'TEST'
  const wrapper = mount(<SearchInput trigger="enter" onSearch={onSearch} />)

  wrapper.find('input').simulate('change', {
    persist: () => {},
    target: {
      value,
    },
  })

  wrapper.find('input').simulate('keyDown', {
    persist: () => {},
    keyCode: KEY_CODES.ENTER,
  })

  jest.runAllTimers()

  expect(onSearch).toBeCalled()
  expect(onSearch).toBeCalledWith(value)
})

it('should call `onSearch` callback after press the ENTER key when trigger is `button`', () => {
  const onSearch = jest.fn()
  const value = 'TEST'
  const wrapper = mount(<SearchInput trigger="button" onSearch={onSearch} />)

  wrapper.find('input').simulate('change', {
    persist: () => {},
    target: {
      value,
    },
  })

  wrapper.find('input').simulate('keyDown', {
    persist: () => {},
    keyCode: KEY_CODES.ENTER,
  })

  jest.runAllTimers()

  expect(onSearch).toBeCalled()
  expect(onSearch).toBeCalledWith(value)
})

it('should NOT call `onSearch` callback after press other keys(other than the ENTER key) when trigger is `button`', () => {
  const onSearch = jest.fn()
  const value = 'TEST'
  const wrapper = mount(<SearchInput trigger="button" onSearch={onSearch} />)

  wrapper.find('input').simulate('change', {
    persist: () => {},
    target: {
      value,
    },
  })

  wrapper.find('input').simulate('keyDown', {
    persist: () => {},
    keyCode: KEY_CODES.LEFTARROW,
  })

  jest.runAllTimers()

  expect(onSearch).not.toBeCalled()
})

it('should clear input and trigger search after clicking the close icon', () => {
  const onSearch = jest.fn()
  const wrapper = mount(<SearchInput onSearch={onSearch} />)
  const value = 'TEST'

  wrapper.find('input').simulate('change', {
    persist: () => {},
    target: {
      value,
    },
  })

  jest.runAllTimers()

  expect(wrapper.state('value')).toBe(value)

  wrapper.find('.icon-close').simulate('click')

  expect(wrapper.state('value')).toBe('')
  expect(onSearch).toBeCalled()
  expect(onSearch).toBeCalledWith('')
})
