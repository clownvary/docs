import React from 'react'
import { shallow } from 'enzyme'

import Alert from 'alert'
import Alert2 from 'alert/Alert'
import Alert3 from 'alert/AlertBar'
import Input from 'Input'
import Dropdown from 'Dropdown'
import Checkbox from 'Checkbox/Checkbox'
import Radio from 'radio/Radio'
import Radio2 from 'radio/RadioComponent'
import DatePicker from 'DatePicker'
import Button from 'Button'
import Label from 'Label'
import Modal from 'modal'
import Popover from 'Popover'

describe('valid data-qa-id', () => {
  const testId = 'testId'
  const customProps = {
    'data-qa-id': testId,
    'aria-labelledby': testId,
    wrongProps: testId,
  }
  const assert = wrapper => {
    expect(wrapper.find(`[data-qa-id="${testId}"]`).length).toEqual(1)
    expect(wrapper.find(`[aria-labelledby="${testId}"]`).length).toEqual(1)
  }

  it('Alert should render valid props: data-*, role, aria-*', () => {
    const validateControls = [Alert, Alert2, Alert3]

    validateControls.forEach(Control => {
      const wrapper = shallow(<Control {...customProps} />)
      assert(wrapper)
    })
  })

  it('Radio should render valid props: data-*, role, aria-*', () => {
    const validateControls = [Radio, Radio2]

    validateControls.forEach(Control => {
      const wrapper = shallow(<Control {...customProps} />)
      assert(wrapper)
    })
  })

  it('Input should render valid props: data-*, role, aria-*', () => {
    const wrapper = shallow(<Input {...customProps} />)
    assert(wrapper)
  })

  it('DatePicker should render valid props: data-*, role, aria-*', () => {
    const wrapper = shallow(<DatePicker {...customProps} />)
    assert(wrapper)
  })

  it('Checkbox should render valid props: data-*, role, aria-*', () => {
    const wrapper = shallow(<Checkbox {...customProps} />)
    assert(wrapper)
  })

  it('Button should render valid props: data-*, role, aria-*', () => {
    const wrapper = shallow(<Button {...customProps} />)
    assert(wrapper)
  })

  it('Label should render valid props: data-*, role, aria-*', () => {
    const wrapper = shallow(<Label {...customProps} />)
    assert(wrapper)
  })

  it('Modal should render valid props: data-*, role, aria-*', () => {
    const wrapper = shallow(<Modal {...customProps} />)
    assert(wrapper)
  })

  it('Popover should render valid props: data-*, role, aria-*', () => {
    const wrapper = shallow(<Popover {...customProps} />)
    assert(wrapper)
  })

  it('Dropdown should render valid props: data-*, role, aria-*', () => {
    const data = [
      {
        text: 'Canada',
        value: 'can',
      },
      {
        text: 'China',
        value: 'chs',
      },
      {
        text: 'Japan',
        value: 'jap',
      },
      {
        text: 'United States of America',
        value: 'usa',
      },
    ]
    const wrapper = shallow(<Dropdown {...customProps} data={data} />)
    assert(wrapper)
  })
})
