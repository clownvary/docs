import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import Sidebar from 'Sidebar'

const data = [
  {
    text: 'Enter the age',
    href: '#',
  },
  {
    text: 'Select the gender',
    href: '#',
  },
  {
    text: 'Select the interests',
    href: '#',
  },
  {
    text: 'Enter a nickname',
    href: '#',
  },
  {
    text: 'Save and view results',
    href: '#',
  },
]

it("should render right thing with data and don't change unexpected", () => {
  const tree = renderer
    .create(
      <Sidebar
        priority="5"
        title="Progress steps to add a Family Member"
        steps
        active={1}
        past={0}
        data={data}
        style={{ width: 250 }}
      />,
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})

it('should render without errors', () => {
  const sidebar = shallow(<Sidebar />)

  expect(sidebar).toBeTruthy()
})

it('should render right thing', () => {
  const sidebar = shallow(<Sidebar />)

  expect(sidebar.find('aside').length === 1).toBe(true)
  expect(sidebar.hasClass('sidebar')).toBe(true)
})

it('should has .sidebar--links if setting links as true', () => {
  const sidebar = shallow(<Sidebar links />)

  expect(sidebar.hasClass('sidebar')).toBe(true)
  expect(sidebar.hasClass('sidebar--links')).toBe(true)
})

it('should render links right', () => {
  const sidebar = shallow(
    <Sidebar
      priority="5"
      title="Progress steps to add a Family Member"
      steps
      active={1}
      past={0}
      data={data}
      style={{ width: 250 }}
    />,
  )

  expect(sidebar.find('a.past')).toHaveLength(1)
  expect(sidebar.find('a.active')).toHaveLength(1)
})

it('should has no step numbers by default', () => {
  const sidebar = shallow(
    <Sidebar
      priority="5"
      title="Progress steps to add a Family Member"
      active={1}
      past={0}
      data={data}
      style={{ width: 250 }}
    />,
  )

  // prettier-ignore
  expect(
    sidebar
      .find('ul')
      .childAt(0)
      .find('a')
      .text()
      .trim(),
  ).toBe(data[0].text)
})
