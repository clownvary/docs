import React from 'react'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'

import Input from '../src/Input'

it('should render without errors', () => {
  const wrapper = shallow(<Input />)

  expect(wrapper).toBeTruthy()
})

it('should render right thing', () => {
  const wrapper = shallow(<Input />)

  expect(wrapper.find('input').length === 1).toBe(true)
})

it("should render right thing and don't change unexpected", () => {
  const tree = renderer.create(<Input />).toJSON()

  expect(tree).toMatchSnapshot()
})

it('should could pass different types(email, url, phone, ...)', () => {
  const wrapper = shallow(<Input type="email" />)

  expect(wrapper.find('input').prop('type') === 'email').toBe(true)
})

it('should the .input-group by default ', () => {
  const wrapper = shallow(<Input />)

  expect(wrapper.hasClass('input-group')).toBe(true)
})

it('should has .input.input-group__field in terms of the wrappped DOM input', () => {
  const wrapper = shallow(<Input />)

  expect(wrapper.find('.input.input-group__field').length === 1).toBe(true)
})

it('should has .input-group--{size} if size={size} is provided', () => {
  const wrapperInputSm = shallow(<Input size="sm" />)
  expect(wrapperInputSm.hasClass('input-group--sm')).toBe(true)

  const wrapperInputLg = shallow(<Input size="lg" />)
  expect(wrapperInputLg.hasClass('input-group--lg')).toBe(true)
})

it('should has `.input-group--disabled` has `disabled` prop', () => {
  const wrapperInputSm = shallow(<Input disabled />)
  expect(wrapperInputSm.hasClass('input-group--disabled')).toBe(true)
})

it('should has .input-group--icon if passing `icon` as prop', () => {
  const wrapper = shallow(<Input icon />)

  expect(wrapper.hasClass('input-group--icon')).toBe(true)
})

it('should has .input-group__item if setting `preIcon`, `preText` or `postText`', () => {
  let wrapper = shallow(<Input preText="$" />)
  expect(wrapper.find('.input-group__item').length === 1).toBe(true)

  wrapper = shallow(<Input preIcon="icon-calendar" />)
  expect(wrapper.find('.input-group__item').length === 1).toBe(true)

  wrapper = shallow(<Input postText=".00" />)
  expect(wrapper.find('.input-group__item').length === 1).toBe(true)
})

it('should has .icon and .{preIcon} if setting `preIcon`', () => {
  const wrapper = shallow(<Input preIcon="icon-calendar" />)

  expect(wrapper.find('.icon.icon-calendar').length === 1).toBe(true)
})

it('should could sync props => state', () => {
  const wrapper = shallow(<Input value="test" />)

  expect(wrapper.find('input').prop('value') === 'test').toBe(true)

  wrapper.setProps({
    value: 'test again',
  })

  expect(wrapper.find('input').prop('value') === 'test again').toBe(true)
})

it('set the preText={preText}', () => {
  const preText = '.00'
  const wrapper = shallow(<Input preText={preText} />)

  expect(wrapper.find('.input-group__item').text() === preText).toBe(true)
})

it('set the postText={postText}', () => {
  const postText = '.00'
  const wrapper = shallow(<Input postText={postText} />)

  expect(wrapper.find('.input-group__item').text() === postText).toBe(true)
})

it('PostComponent', () => {
  const PostComponent = () => <button>SAVE</button>
  const InputComponent = <Input PostComponent={PostComponent} />
  const tree = renderer.create(InputComponent).toJSON()
  const wrapper = mount(InputComponent)

  expect(tree).toMatchSnapshot()
  expect(wrapper.text()).toMatch('SAVE')
})

it("don't handle `onChange` event when setting `disabled` as true", () => {
  const value = 'test'
  const onChangeMock = jest.fn()
  const wrapper = shallow(
    <Input disabled value={value} onChange={onChangeMock} />,
  )
  const changedValue = 'test done'

  wrapper.find('input').simulate('change', {
    target: {
      value: changedValue,
    },
  })

  expect(onChangeMock).not.toBeCalled()
})

it('should handle the `onChange` event', () => {
  const value = 'test'
  const onChangeMock = jest.fn()
  const wrapper = shallow(<Input value={value} onChange={onChangeMock} />)
  const changedValue = 'test done'

  wrapper.find('input').simulate('change', {
    target: {
      value: changedValue,
    },
  })

  expect(onChangeMock).toBeCalled()
  expect(onChangeMock).toBeCalledWith(
    expect.objectContaining({
      target: expect.objectContaining({
        value: changedValue,
      }),
    }),
  )
})

it('should could call `stopPropagation` & `preventDefault`', () => {
  const stopPropagationMock = jest.fn()
  const preventDefaultMock = jest.fn()
  const onChangeMock = jest.fn(e => {
    e.stopPropagation()
    e.preventDefault()
  })
  const wrapper = shallow(<Input onChange={onChangeMock} />)

  wrapper.find('input').simulate('change', {
    target: {
      value: 'test',
    },
    stopPropagation: stopPropagationMock,
    preventDefault: preventDefaultMock,
  })

  expect(stopPropagationMock).toBeCalled()
  expect(preventDefaultMock).toBeCalled()
})
