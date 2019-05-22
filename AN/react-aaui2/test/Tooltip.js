import React from 'react'
import { shallow, mount } from 'enzyme'

import Tooltip from 'Tooltip'

it('should has class tooltips', () => {
  const wrapper = shallow(
    <Tooltip label="Tooltip North" direction="n">
      I&apos;m a Tooltip!
    </Tooltip>,
  )
  expect(wrapper.hasClass('tooltips')).toBe(true)
})

it('should be oriented', () => {
  const wrapper = mount(
    <div>
      <Tooltip className="t1" label="Tooltip North" direction="n">
        I&apos;m a Tooltip!
      </Tooltip>
      <Tooltip className="t2" label="Tooltip North East" direction="ne">
        I&apos;m a Tooltip!
      </Tooltip>
      <Tooltip className="t3" label="Tooltip East" direction="e">
        I&apos;m a Tooltip!
      </Tooltip>
      <Tooltip className="t4" label="Tooltip South East" direction="se">
        I&apos;m a Tooltip!
      </Tooltip>
      <Tooltip className="t5" label="Tooltip South" direction="s">
        I&apos;m a Tooltip!
      </Tooltip>
      <Tooltip className="t6" label="Tooltip South West" direction="sw">
        I&apos;m a Tooltip!
      </Tooltip>
      <Tooltip className="t7" label="Tooltip West" direction="w">
        I&apos;m a Tooltip!
      </Tooltip>
      <Tooltip className="t8" label="Tooltip North West" direction="nw">
        I&apos;m a Tooltip!
      </Tooltip>
    </div>,
  )

  expect(wrapper.findWhere(n => n.is('.t1.tooltips--n')).length).toBe(1)
  expect(wrapper.findWhere(n => n.is('.t2.tooltips--ne')).length).toBe(1)
  expect(wrapper.findWhere(n => n.is('.t3.tooltips--e')).length).toBe(1)
  expect(wrapper.findWhere(n => n.is('.t4.tooltips--se')).length).toBe(1)
  expect(wrapper.findWhere(n => n.is('.t5.tooltips--s')).length).toBe(1)
  expect(wrapper.findWhere(n => n.is('.t6.tooltips--sw')).length).toBe(1)
  expect(wrapper.findWhere(n => n.is('.t7.tooltips--w')).length).toBe(1)
  expect(wrapper.findWhere(n => n.is('.t8.tooltips--nw')).length).toBe(1)
})

it('should could be switched to light theme', () => {
  const wrapper = shallow(
    <Tooltip label="Tooltip North" theme="light" direction="n">
      I&apos;m a Tooltip!
    </Tooltip>,
  )
  expect(wrapper.hasClass('t-light')).toBe(true)
})
