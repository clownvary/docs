import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import TabsContainer from 'tabs/TabsContainer'

const context = {
  auiTabsAPI: {
    select: () => {},
    getSelected: () => 'test',
  },
}

it("should render right thing and don't change unexpected", () => {
  const tree = renderer.create(<TabsContainer {...context} />).toJSON()

  expect(tree).toMatchSnapshot()
})

it('should render without errors', () => {
  const wrapper = shallow(<TabsContainer {...context} />)

  expect(wrapper).toBeTruthy()
})

it('should render right thing', () => {
  const wrapper = shallow(
    <TabsContainer className="tabs-container" {...context} />,
  )

  expect(wrapper.hasClass('tabs-container')).toBe(true)
})

it('should not change when press arrow keys', () => {
  const wrapper = shallow(
    <TabsContainer className="tabs-container" {...context} />,
  )

  const originStatus = wrapper.prop('aria-hidden')
  wrapper.find('div').simulate('keyDown', {
    keyCode: 37,
    persist: () => {},
    stopPropagation: () => {},
  })
  wrapper.find('div').simulate('keyDown', {
    keyCode: 39,
    persist: () => {},
    stopPropagation: () => {},
  })
  wrapper.find('div').simulate('keyDown', {
    keyCode: 38,
    persist: () => {},
    stopPropagation: () => {},
  })
  expect(wrapper.prop('aria-hidden')).toBe(originStatus)
})
