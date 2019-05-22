import React from 'react'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'
import Breadcrumb from '../src/breadcrumb'

const component = (
  <Breadcrumb className="myCls">
    <Breadcrumb.Item href="/a" className="hasHref">
      a
    </Breadcrumb.Item>
    <Breadcrumb.Item className="noHref">b</Breadcrumb.Item>
  </Breadcrumb>
)

const data = [
  {
    text: 'test 1',
    href: '/',
  },
  {
    text: 'test 2',
  },
]

it('should render without errors', () => {
  const wrapper = shallow(component)

  expect(wrapper).toBeTruthy()
  expect(wrapper.hasClass('myCls')).toBe(true)
})

it("should render right thing and don't change unexpected", () => {
  const tree = renderer.create(component).toJSON()

  expect(tree).toMatchSnapshot()
})

it('should render a with href', () => {
  const wrapper = mount(component)

  expect(wrapper.children().length).toBe(1)
  expect(wrapper.find('.hasHref a').prop('href')).toBe('/a')
  expect(wrapper.find('.noHref a').length).toBe(0)
})

it('should render by data', () => {
  const wrapper = mount(<Breadcrumb data={data} />)

  expect(wrapper.children().length).toBe(1)

  expect(wrapper.find('a').get(0).props.href).toBe('/')
  expect(wrapper.find('a').get(1)).toBeUndefined()
})
