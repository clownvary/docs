import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

import RadioGroup from 'form/RadioGroup'
import Radio from 'radio/Radio'
import formMountOptions from '../__mocks__/formMountOptions'

const setup = props => {
  const Componet = (
    <RadioGroup name="sports" size="" value="tennis" {...props}>
      <Radio value="basketball">Basketball</Radio>
      <Radio value="tennis">Tennis</Radio>
      <Radio value="swimming">Swimming</Radio>
      <button />
    </RadioGroup>
  )

  const wrapper = mount(Componet, formMountOptions)

  return {
    Componet,
    wrapper,
  }
}

it('should render without errors', () => {
  const { wrapper } = setup()

  expect(wrapper).toBeTruthy()
})

it("should render right thing and don't change unexpected", () => {
  const { Componet } = setup()
  const tree = renderer.create(Componet).toJSON()

  expect(tree).toMatchSnapshot()
})

it('should work without `onChange`', () => {
  const { wrapper } = setup({ value: undefined })

  wrapper
    .find('input[type="radio"]')
    .first()
    .simulate('change', {
      target: {
        checked: true,
      },
    })

  expect(wrapper).toBeTruthy()
})

it('should render trigger outer `onChange` when offered', () => {
  const onChange = jest.fn()
  const { wrapper } = setup({ onChange, value: 'tennis' })
  const event = { target: { checked: true, value: 'basketball' } }

  wrapper
    .find('input[type="radio"]')
    .first()
    .simulate('change', {
      persist: () => {},
      preventDefault: () => {},
      ...event,
    })

  expect(onChange).toBeCalledWith(expect.objectContaining(event))
})
