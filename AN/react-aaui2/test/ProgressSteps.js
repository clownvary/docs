import React from 'react'
import { mount } from 'enzyme'

import ProgressSteps from '../src/ProgressSteps'

const App = props => {
  const data = [
    { text: 'Installation', status: 'past' },
    { text: 'Quick Start', status: 'active' },
    { text: 'API', status: 'next' },
    { text: 'Contributing', status: 'next' },
  ]

  return <ProgressSteps steps={data} {...props} />
}

it('A ProgressSteps should has progress-steps class name', () => {
  const wrapper = mount(<App />)

  expect(wrapper.find('ul').hasClass('progress-steps')).toBe(true)
})

it('Support passing size for ProgressSteps', () => {
  const wrapper = mount(<App size="sm" />)

  expect(wrapper.find('ul').hasClass('progress-steps--sm')).toBe(true)
})

it('A ProgressSteps should has some items stands for it steps.', () => {
  const wrapper = mount(<App />)

  expect(
    wrapper
      .find('ul')
      .childAt(0)
      .hasClass('progress-steps__step'),
  ).toBe(true)
  expect(
    wrapper
      .find('ul')
      .childAt(0)
      .hasClass('past'),
  ).toBe(true)

  expect(
    wrapper
      .find('ul')
      .childAt(1)
      .hasClass('progress-steps__step'),
  ).toBe(true)
  expect(
    wrapper
      .find('ul')
      .childAt(1)
      .hasClass('active'),
  ).toBe(true)

  expect(
    wrapper
      .find('ul')
      .childAt(2)
      .hasClass('progress-steps__step'),
  ).toBe(true)

  expect(
    wrapper
      .find('ul')
      .childAt(3)
      .hasClass('progress-steps__step'),
  ).toBe(true)
  expect(
    wrapper
      .find('ul')
      .childAt(3)
      .hasClass('next'),
  ).toBe(true)
})
