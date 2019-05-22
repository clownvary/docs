import React from 'react'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'

import Accordion from 'accordion/Accordion'
import KEY_CODES from 'shared/keyCodes'

it('should render without errors', () => {
  const wrapper = shallow(
    <Accordion multiSelectable>
      <Accordion.Panel title="title">1</Accordion.Panel>
    </Accordion>,
  )

  expect(wrapper).toBeTruthy()
})

it("should render right thing and don't change unexpected", () => {
  const tree = renderer
    .create(
      <Accordion multiSelectable>
        <Accordion.Panel title="title">1</Accordion.Panel>
      </Accordion>,
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})

it('should render self defined class name', () => {
  const wrapper = mount(
    <Accordion multiSelectable className="test">
      <Accordion.Panel title="title">1</Accordion.Panel>
    </Accordion>,
  )

  expect(wrapper.hasClass('test')).toBe(true)
})

it('should trigger click rightly', () => {
  const wrapper = mount(
    <Accordion multiSelectable className="test">
      <Accordion.Panel title="title">1</Accordion.Panel>
      <Accordion.Panel active title="title">
        1
      </Accordion.Panel>
      <Accordion.Panel active title="title">
        1
      </Accordion.Panel>
    </Accordion>,
  )
  wrapper
    .find('.accordion__header-icon a')
    .first()
    .simulate('click')
  expect(wrapper.state().status[0]).toBe(true)
})

it('should trigger click rightly without `multiSelectable`', () => {
  const wrapper = mount(
    <Accordion className="test">
      <Accordion.Panel title="title">1</Accordion.Panel>
      <Accordion.Panel active title="title">
        1
      </Accordion.Panel>
      <Accordion.Panel active title="title">
        1
      </Accordion.Panel>
    </Accordion>,
  )

  wrapper
    .find('.accordion__header-icon a')
    .first()
    .simulate('click')
  expect(wrapper.state().status[0]).toBe(true)
  expect(wrapper.state().status[1]).toBe(false)
  expect(wrapper.state().status[2]).toBe(false)
})

it('should response rightly when keyboard event', () => {
  const wrapper = mount(
    <Accordion className="test">
      <Accordion.Panel title="title">1</Accordion.Panel>
      <Accordion.Panel disabled active title="title">
        1
      </Accordion.Panel>
      <Accordion.Panel disabled active title="title">
        1
      </Accordion.Panel>
      <Accordion.Panel active title="title">
        1
      </Accordion.Panel>
      <Accordion.Panel active title="title">
        1
      </Accordion.Panel>
    </Accordion>,
  )

  const firstHeaders = wrapper.find('.accordion__header')
  const container = wrapper.find('.accordion__body-container')

  firstHeaders.at(0).simulate('focus')
  firstHeaders.at(0).simulate('keyDown', { keyCode: 27 })
  firstHeaders.at(0).simulate('keyDown', { keyCode: KEY_CODES.ENTER })
  expect(wrapper.state().status[0]).toBe(true)
  container.at(0).simulate('transitionEnd')
  firstHeaders.at(0).simulate('keyDown', { keyCode: KEY_CODES.ENTER })
  expect(wrapper.state().status[0]).toBe(false)
  container.at(0).simulate('transitionEnd')
  firstHeaders.at(1).simulate('keyDown', { keyCode: KEY_CODES.ENTER })
  firstHeaders.at(0).simulate('keyDown', { keyCode: KEY_CODES.UPARROW })
  firstHeaders.at(4).simulate('keyDown', { keyCode: KEY_CODES.UPARROW })
  firstHeaders.at(0).simulate('keyDown', { keyCode: KEY_CODES.DOWNARROW })
  firstHeaders.at(4).simulate('keyDown', { keyCode: KEY_CODES.DOWNARROW })
  expect(wrapper.state().status[1]).toBe(false)
  container.at(1).simulate('transitionEnd')
})

it('should trigger click and keyboard event rightly with `transition ={" "}`', () => {
  const wrapper = mount(
    <Accordion transition={' '}>
      <Accordion.Panel title="title">1</Accordion.Panel>
    </Accordion>,
  )

  wrapper
    .find('.accordion__header-icon a')
    .first()
    .simulate('click')
  expect(wrapper.state().status[0]).toBe(true)
  wrapper
    .find('.accordion__header')
    .first()
    .simulate('keyDown', { keyCode: KEY_CODES.ENTER })
  expect(wrapper.state().status[0]).toBe(false)
})

it('should stop change status when transition have not finished', () => {
  const wrapper = mount(
    <Accordion transition={`'height 1s ease'`}>
      <Accordion.Panel title="title">1</Accordion.Panel>
    </Accordion>,
  )

  wrapper
    .find('.accordion__header-icon a')
    .first()
    .simulate('click')
    .simulate('click')
  expect(wrapper.state().status[0]).toBe(true)
})
