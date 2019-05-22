import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import TabsHeader from 'tabs/TabsHeader'

it("should render right thing and don't change unexpected", () => {
  const tree = renderer.create(<TabsHeader />).toJSON()

  expect(tree).toMatchSnapshot()
})

it('should render without errors', () => {
  const wrapper = shallow(<TabsHeader />)

  expect(wrapper).toBeTruthy()
})

it('should render right thing', () => {
  const wrapper = shallow(<TabsHeader />)

  expect(wrapper.hasClass('nav-tabs')).toBe(true)
})
