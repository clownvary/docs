import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import Button from 'Button'

it('should render without errors', () => {
  const wrapper = shallow(<Button />)

  expect(wrapper).toBeTruthy()
})

it('should render right thing', () => {
  const wrapper = shallow(<Button />)

  expect(wrapper.find('button').length).toBe(1)
})

it("should render right thing and don't change unexpected", () => {
  const tree = renderer.create(<Button />).toJSON()

  expect(tree).toMatchSnapshot()
})

it("should render right thing and don't change unexpected when loading state", () => {
  const tree = renderer.create(<Button loading />).toJSON()

  expect(tree).toMatchSnapshot()
})

it('has a .btn and .btn-secondary by default', () => {
  const wrapper = shallow(<Button />)

  expect(wrapper.hasClass('btn')).toBe(true)
  expect(wrapper.hasClass('btn-secondary')).toBe(true)
})

it('has a type=submit by default', () => {
  const wrapper = shallow(<Button />)

  expect(wrapper.prop('type')).toBe('submit')
})

it('has a type=button when setting noSubmit', () => {
  const wrapper = shallow(<Button noSubmit />)

  expect(wrapper.prop('type')).toBe('button')
})

it('has a .btn-primary when setting type="primary"', () => {
  const wrapper = shallow(<Button type="primary" />)

  expect(wrapper.hasClass('btn-primary')).toBe(true)
})

it('has a .btn--{size} when setting size={size}', () => {
  const wrapper = shallow(<Button size="size" />)

  expect(wrapper.hasClass('btn--size')).toBe(true)
})

it('has a custom when setting className={className}', () => {
  const wrapper = shallow(<Button className="my-button" />)

  expect(wrapper.hasClass('my-button')).toBe(true)
})

it('should call `onClick` callback when clicking button', () => {
  const onClick = jest.fn()
  const wrapper = shallow(<Button onClick={onClick} className="my-button" />)

  wrapper.simulate('click')

  expect(onClick).toBeCalled()
})
