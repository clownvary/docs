import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

import DoB from '../../src/form/DoB'
import L10nProvider from '../../src/shared/L10nProvider'
import KEY_CODES from '../../src/shared/keyCodes'
import formMountOptions from '../__mocks__/formMountOptions'

const APP = props => (
  <L10nProvider>
    <DoB name="dob" defaultValue={new Date(1995, 2, 22)} {...props} />
  </L10nProvider>
)

it('should render without errors', () => {
  const wrapper = mount(<APP />, formMountOptions)

  expect(wrapper).toBeTruthy()
})

it('should render correct things', () => {
  const wrapper = mount(<APP />, formMountOptions)

  expect(wrapper.find('.dropdown').length === 3).toBe(true)
})

it("should render right thing and don't change unexpected", () => {
  const tree = renderer
    .create(
      <L10nProvider>
        <DoB
          name="dob"
          aauiFormStore={formMountOptions.context.aauiFormStore}
        />
      </L10nProvider>,
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})

it('should trigger `onChange` when selecting item', () => {
  const wrapper = mount(<APP defaultValue={undefined} />, formMountOptions)

  const yearDropdown = wrapper.find('.dropdown__button').first()

  yearDropdown.simulate('keyDown', { keyCode: KEY_CODES.SPACE })
  yearDropdown.simulate('keyDown', { keyCode: KEY_CODES.DOWNARROW })
  yearDropdown.simulate('keyDown', { keyCode: KEY_CODES.ENTER })
})

it('should trigger outer `onChange` when selecting item', () => {
  const onChange = jest.fn()
  const wrapper = mount(
    <APP defaultValue={new Date(2012, 0, 31)} onChange={onChange} />,
    formMountOptions,
  )
  const yearDropdown = wrapper.find('.dropdown__button').at(0)

  yearDropdown.simulate('keyDown', { keyCode: KEY_CODES.SPACE })
  yearDropdown.simulate('keyDown', { keyCode: KEY_CODES.DOWNARROW })
  yearDropdown.simulate('keyDown', { keyCode: KEY_CODES.DOWNARROW })
  yearDropdown.simulate('keyDown', { keyCode: KEY_CODES.ENTER })

  expect(onChange).toBeCalled()
})
