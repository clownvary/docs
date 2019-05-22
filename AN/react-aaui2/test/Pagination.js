import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import Pagination from 'Pagination'

it('A Pagination component should have a ul named with pagination', () => {
  const wrapper = mount(
    <div>
      <Pagination
        url="myUrl?keywords=running&location=everywhere"
        total={10}
        current={10}
        around={4}
      />
    </div>,
  )
  expect(wrapper.find('ul').hasClass('pagination')).toBe(true)
})

it('A Pagination component should have user desired items and only one active item', () => {
  const wrapper = mount(
    <div>
      <Pagination
        url="myUrl?keywords=running&location=everywhere"
        total={10}
        current={10}
        around={4}
      />
    </div>,
  )
  expect(wrapper.find('.active').length).toBe(1)
  expect(wrapper.find('li').length).toBe(8)
})

it('A Pagination component can be defined with no-border with every item', () => {
  const wrapper = mount(
    <div>
      <Pagination
        theme="noborder"
        url="myUrl?keywords=running&location=everywhere"
        total={10}
        current={10}
        around={4}
      />
    </div>,
  )
  expect(wrapper.find('.pagination--noborder').length).toBe(1)
})

it('A Pagination component can be defined with pager type and the text can be defined at will', () => {
  const wrapper = mount(
    <div>
      <Pagination
        type="pager"
        startText="Previous"
        endText="Next"
        total={10}
        current={10}
      />
    </div>,
  )
  expect(wrapper.find('.pager').length).toBe(1)
  expect(wrapper.find('a').text()).toBe('Previous')
})

it("Pagination should render right thing and don't change unexpected", () => {
  const Component = (
    <Pagination
      url="myUrl?keywords=running&location=everywhere"
      total={10}
      current={10}
      around={4}
    />
  )
  const tree = renderer.create(Component).toJSON()
  expect(tree).toMatchSnapshot()
})

it('A Pagination component can be defined with pager type and the text can be defined at will case 2', () => {
  const wrapper = mount(
    <div>
      <Pagination
        type="pager"
        url={page => page}
        startText="Previous"
        endText="Next"
        total={10}
        current={5}
      />
    </div>,
  )
  expect(wrapper.find('.pager').length).toBe(1)
  expect(wrapper.find('a').length).toBe(2)
})

it('A Pagination component can be defined with pager type and the text can be defined at will case 3', () => {
  const wrapper = mount(
    <div>
      <Pagination
        url="myUrl?keywords=running&location=everywhere"
        startText="Previous"
        endText="Next"
        total={10}
        current={2}
        around={6}
      />
    </div>,
  )
  expect(wrapper.find('.pagination').length).toBe(1)
})

it('Pagination should render right with current page index', () => {
  const Component = (
    <Pagination
      type="pagination"
      url="sdjfskl"
      startText="Previous"
      endText="Next"
      total={10}
      current={1}
      around={4}
    />
  )
  const wrapper = mount(Component)
  const tree = renderer.create(Component).toJSON()

  expect(wrapper.find('.pagination').length).toBe(1)
  expect(tree).toMatchSnapshot()
})
