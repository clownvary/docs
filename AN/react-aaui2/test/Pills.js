import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import Pills from 'Pills'

it('should render without errors', () => {
  const wrapper = shallow(<Pills />)

  expect(wrapper).toBeTruthy()
})

it('should render right thing', () => {
  const wrapper = shallow(<Pills />)

  expect(wrapper.hasClass('btn-group')).toBe(true)
})

it("should render right thing and don't change unexpected", () => {
  const tree = renderer.create(<Pills />).toJSON()

  expect(tree).toMatchSnapshot()
})

it("should render right thing and don't change unexpected with different sizes", () => {
  const sizes = ['xs', 'sm', 'lg', 'xl']

  sizes.forEach(size => {
    const tree = renderer.create(<Pills size={size} />).toJSON()

    expect(tree).toMatchSnapshot()
  })
})

it("should accept different sizes(['xs', 'sm', 'lg', 'xl'])", () => {
  const smPills = shallow(<Pills size="sm" />)

  expect(smPills.hasClass('btn-group-sm')).toBe(true)
})
