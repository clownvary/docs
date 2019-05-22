import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

import CheckboxGroup from 'form/CheckboxGroup'
import Checkbox from 'Checkbox/Checkbox'
import formMountOptions from '../__mocks__/formMountOptions'

const setup = props => {
  const Componet = (
    <CheckboxGroup
      name="sports"
      size=""
      value={['basketball', 'tennis']}
      {...props}
    >
      <Checkbox value="basketball">Basketball</Checkbox>
      <Checkbox value="tennis">Tennis</Checkbox>
      <Checkbox value="swimming">Swimming</Checkbox>
      <button />
    </CheckboxGroup>
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
    .find('input[type="checkbox"]')
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
  const { wrapper } = setup({ onChange, value: ['basketball', 'tennis'] })

  wrapper
    .find('input[type="checkbox"]')
    .first()
    .simulate('change', {
      persist: () => {},
      preventDefault: () => {},
      target: {
        checked: true,
      },
    })

  expect(onChange).toBeCalledWith(['tennis'])
})
