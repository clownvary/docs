import React from 'react'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import renderer from 'react-test-renderer'

import Panel from 'accordion/AccordionPanel'

const props = {
  onInitChildren: jest.fn(),
  setStatus: jest.fn(),
  index: 1,
  transition: 'height 0.3s ease',
  height: 30,
  active: true,
  title: 'test title',
  disabled: false,
  complete: false,
}

it('should render without errors', () => {
  const wrapper = shallow(<Panel {...props}>Test</Panel>)

  expect(wrapper).toBeTruthy()
})

it("should render right thing and don't change unexpected", () => {
  const tree = renderer.create(<Panel {...props}>Test</Panel>).toJSON()

  expect(tree).toMatchSnapshot()
})

it('should render self defined class name', () => {
  const wrapper = mount(
    <Panel {...props} className="test">
      Test
    </Panel>,
  )

  expect(wrapper.hasClass('test')).toBe(true)
})

it('should render right with disabled', () => {
  const wrapper = mount(
    <Panel {...props} disabled>
      Test
    </Panel>,
  )

  expect(wrapper.find('.accordion--disabled').length).toBe(1)
})

it('should render right with complete', () => {
  const wrapper = mount(
    <Panel {...props} complete>
      Test
    </Panel>,
  )

  expect(wrapper.find('.accordion--complete').length).toBe(1)
})

it('should render right with no active', () => {
  const wrapper = mount(
    <Panel {...props} active={false}>
      Test
    </Panel>,
  )

  expect(wrapper.find('.icon-plus').length).toBe(1)
})

it('should trigger onInit and onClick', () => {
  const clickFun = jest.fn()
  const wrapper = mount(
    <Panel {...props} transition="height 0.2s ease" setStatus={clickFun}>
      Test
    </Panel>,
  )

  wrapper.find('.accordion__header-icon a').simulate('click')
  expect(props.onInitChildren).toBeCalled()
  expect(clickFun).toBeCalledWith(props.index, false)
})

it('should not trigger onInit and onClick when disabled', () => {
  const clickFun = sinon.spy()
  const wrapper = mount(
    <Panel {...props} disabled setStatus={clickFun}>
      Test
    </Panel>,
  )

  wrapper.find('.accordion__header-icon a').simulate('click')
  expect(clickFun.callCount).toBe(0)
})
