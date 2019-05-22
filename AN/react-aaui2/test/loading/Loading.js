import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import Loading from 'loading/Loading'

it('should render without errors', () => {
  const wrapper = shallow(<Loading />)

  expect(wrapper).toBeTruthy()
})

it('should render right thing', () => {
  const wrapper = shallow(<Loading />)

  expect(wrapper.hasClass('loading')).toBe(true)
})

it("should render right thing and don't change unexpected", () => {
  const tree = renderer.create(<Loading />).toJSON()

  expect(tree).toMatchSnapshot()
})
