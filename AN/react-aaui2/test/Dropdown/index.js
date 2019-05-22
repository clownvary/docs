import React from 'react'
import { mount } from 'enzyme'
import MediaQuery from 'react-responsive'

import { Select } from '../../src/Dropdown'

const simpleData = [
  {
    text: 'China',
    value: 'chs',
  },
  {
    text: 'United States of America',
    value: 'usa',
  },
]

describe('mobile dropdown test', () => {
  beforeAll(() => {
    MediaQuery.defaultProps.values = { width: 700 }
  })

  afterAll(() => {
    MediaQuery.defaultProps.values = {}
  })

  it('should render without errors', () => {
    const wrapper = mount(<Select data={simpleData} />)

    expect(wrapper).toBeTruthy()
  })

  it('should using default select when in mobile view', () => {
    const wrapper = mount(
      <Select data={simpleData} preIcon="search" isMoreButton />,
    )

    expect(wrapper.find('select').length).toBe(1)
  })

  it('should trigger onchange when reselect in mobile view', () => {
    const onChange = jest.fn()
    const wrapper = mount(
      <Select defaultValue="chs" data={simpleData} onChange={onChange} />,
    )

    wrapper.find('select').simulate('change', { target: { value: 'usa' } })

    expect(onChange).toBeCalled()
  })
})
