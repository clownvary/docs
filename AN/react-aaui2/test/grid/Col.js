import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

import Col from 'grid/Col'

it('should render without errors', () => {
  const wrapper = shallow(
    <Col span={1} className="class">
      Test
    </Col>,
  )

  expect(wrapper).toBeTruthy()
})

it("should render right thing and don't change unexpected", () => {
  const tree = renderer.create(<Col span={6} />).toJSON()

  expect(tree).toMatchSnapshot()
})

it('should has classname `col` by default', () => {
  const wrapper = shallow(<Col />)

  expect(wrapper.hasClass('col')).toBe(true)
})

it('should has the right default value for `span`', () => {
  const wrapper = shallow(<Col />)

  expect(wrapper.hasClass('col-12')).toBe(true)
})

it('should could set right span', () => {
  const wrapper = shallow(<Col span={6} />)

  expect(wrapper.hasClass('col-6')).toBe(true)
})

it('should could set right sm', () => {
  const wrapper = shallow(<Col sm={6} />)

  expect(wrapper.hasClass('col-sm-6')).toBe(true)
})

it('should could set right md', () => {
  const wrapper = shallow(<Col md={6} />)

  expect(wrapper.hasClass('col-md-6')).toBe(true)
})

it('should could set right lg', () => {
  const wrapper = shallow(<Col lg={6} />)

  expect(wrapper.hasClass('col-lg-6')).toBe(true)
})
