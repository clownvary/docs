import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

import Combobox from '../../src/form/Combobox'
import L10nProvider from '../../src/shared/L10nProvider'
import KEY_CODES from '../../src/shared/keyCodes'
import formMountOptions from '../__mocks__/formMountOptions'

const dropdownData = [
  {
    text: 'Canada',
    value: 'can',
  },
  {
    text: 'China',
    value: 'chs',
  },
  {
    text: 'Japan1',
    value: 'jap1',
  },
]

const APP = () => (
  <L10nProvider>
    <Combobox name="Country" data={dropdownData} />
  </L10nProvider>
)

it('should render without errors', () => {
  const wrapper = mount(<APP />, formMountOptions)

  expect(wrapper).toBeTruthy()
})

it('should render correct things', () => {
  const wrapper = mount(<APP />, formMountOptions)

  expect(wrapper.find('.dropdown').length === 1).toBe(true)
})

it("should render right thing and don't change unexpected", () => {
  const tree = renderer
    .create(
      <L10nProvider>
        <Combobox
          name="Country"
          data={dropdownData}
          aauiFormStore={formMountOptions.context.aauiFormStore}
        />
      </L10nProvider>,
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})

it('should trigger `onChange` when selecting item', () => {
  const wrapper = mount(<APP />, formMountOptions)

  wrapper
    .find('.dropdown__button')
    .simulate('keyDown', { keyCode: KEY_CODES.SPACE })
  wrapper
    .find('.dropdown__button')
    .simulate('keyDown', { keyCode: KEY_CODES.DOWNARROW })
  wrapper
    .find('.dropdown__button')
    .simulate('keyDown', { keyCode: KEY_CODES.ENTER })
})
