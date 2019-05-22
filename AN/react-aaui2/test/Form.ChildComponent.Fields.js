import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

import Form from 'form'
import L10nProvider from 'shared/L10nProvider'
import Combobox from 'form/Combobox'
import TextInput from 'form/TextInput'

const name = 'name'
const age = 'age'
const sports = 'sports'
const dropdownData = [
  {
    text: 'Tennis',
    value: 'tennis',
  },
  {
    text: 'Basketball',
    value: 'basketball',
  },
]
const setup = (props = {}) => {
  const ChildComponent = childProps => (
    <div>
      <Form.HField
        name={age}
        label="Age"
        component={TextInput}
        {...childProps}
      />
      <Form.HField
        name={sports}
        label="Sport"
        component={Combobox}
        data={dropdownData}
        {...childProps}
      />
    </div>
  )
  const component = (
    <L10nProvider>
      <Form {...props}>
        <Form.HField
          name={name}
          label="Name"
          component={TextInput}
          required={props.required}
        />
        <ChildComponent required={props.required} />
        <button name="button" type="submit">
          Submit
        </button>
      </Form>
    </L10nProvider>
  )
  const wrapper = mount(component)

  return {
    props,
    component,
    wrapper,
  }
}

it('should render withoug errors', () => {
  const { wrapper } = setup()

  expect(wrapper).toBeTruthy()
})

it('should render correct thing', () => {
  const { wrapper } = setup()

  expect(wrapper.find(Form.HField).length === 3).toBe(true)
  expect(wrapper.find('button[name="button"]').length === 1).toBe(true)
})

it("should render right thing and don't change unexpected", () => {
  const { component } = setup({ onSubmit: () => {}, required: true })
  const tree = renderer.create(component).toJSON()

  expect(tree).toMatchSnapshot()
})

it('initialize Form fields in the component hierarchy', () => {
  const tennis = 'tennis'
  const basketball = 'basketball'
  let fields = {
    name,
    age,
    sports: basketball,
  }
  const { wrapper } = setup({ fields, required: true })
  let nameField = wrapper.find(`[name="${name}"]`).last()
  let ageField = wrapper.find(`[name="${age}"]`).last()
  let sportsField = wrapper.find(Combobox)

  expect(nameField.prop('name') === name).toBe(true)
  expect(nameField.prop('value') === name).toBe(true)
  expect(ageField.prop('name') === age).toBe(true)
  expect(ageField.prop('value') === age).toBe(true)

  expect(sportsField.prop('name') === sports).toBe(true)
  expect(sportsField.prop('value') === basketball).toBe(true)
  expect(sportsField.prop('required') === true).toBe(true)

  fields = {
    name: `${name}-updated`,
    age: `${age}-updated`,
    sports: tennis,
  }

  const { wrapper: anotherWrapper } = setup({ fields, required: false })

  nameField = anotherWrapper.find(`[name="${name}"]`).last()
  ageField = anotherWrapper.find(`[name="${age}"]`).last()
  sportsField = anotherWrapper.find(Combobox)

  expect(nameField.prop('name') === name).toBe(true)
  expect(nameField.prop('value') === `${name}-updated`).toBe(true)
  expect(ageField.prop('name') === age).toBe(true)
  expect(ageField.prop('value') === `${age}-updated`).toBe(true)

  expect(sportsField.prop('name') === sports).toBe(true)
  expect(sportsField.prop('value') === tennis).toBe(true)
  expect(sportsField.prop('required') === false).toBe(true)
})
