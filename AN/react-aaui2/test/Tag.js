import React from 'react'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'

import Tag from 'Tag'
import KEY_CODES from 'shared/keyCodes'

it('should render without errors', () => {
  const wrapper = shallow(<Tag />)

  expect(wrapper).toBeTruthy()
})

it('should render right thing', () => {
  const wrapper = shallow(<Tag />)

  expect(wrapper.find('.badge').length === 1).toBe(true)
})

it("should render right thing and don't change unexpected", () => {
  const tree = renderer.create(<Tag editMode />).toJSON()

  expect(tree).toMatchSnapshot()
})

it('should has .tag-input for editable tag', () => {
  const wrapper = shallow(<Tag editMode />)

  expect(wrapper.hasClass('tag-input')).toBe(true)
})

it('should call onClose callback when clicking close icon', () => {
  const onClose = jest.fn()
  const wrapper = shallow(<Tag editMode onClose={onClose} />)

  wrapper.find('.badge .icon-close-thin').simulate('click')
  expect(onClose).toBeCalled()
})

it('should change to input when clicking tag text', () => {
  const wrapper = shallow(<Tag editMode />)

  expect(wrapper.find('input').length === 0).toBe(true)
  wrapper.find('.badge > span').simulate('click')
  expect(wrapper.find('input').length === 1).toBe(true)
})

it('should display tag label when losing focus on the tag input ', () => {
  const onChangeMock = jest.fn()
  const wrapper = shallow(<Tag editMode onChange={onChangeMock} />)

  expect(wrapper.find('input').length === 0).toBe(true)

  wrapper.find('.badge > span').simulate('click')
  wrapper.find('input').simulate('blur', {
    target: {
      value: '',
    },
  })

  expect(wrapper.find('input').length === 0).toBe(true)
  expect(onChangeMock).toBeCalled()
})

it('should display tag label when escaping on the tag input ', () => {
  const onCancelMock = jest.fn()
  const wrapper = shallow(<Tag editMode onCancel={onCancelMock} />)

  expect(wrapper.find('input').length === 0).toBe(true)

  wrapper.find('.badge > span').simulate('click')
  wrapper.setState({ isInputCancel: true })
  wrapper.find('input').simulate('blur', {
    target: {
      value: '',
    },
  })

  expect(wrapper.find('input').length === 0).toBe(true)
  expect(onCancelMock).toBeCalled()
})

it('should could call `toInput` outside of compoent for changing it to tag-input', () => {
  const wrapper = shallow(<Tag />)
  const focusMock = jest.fn()
  const selectMock = jest.fn()

  wrapper.instance().input = { focus: focusMock, select: selectMock }
  wrapper.instance().toInput({ stopPropagation: () => {} })

  expect(focusMock).toBeCalled()
  expect(selectMock).toBeCalled()
})

it('should hanlde keyDown event right', () => {
  const blurMock = jest.fn()
  const wrapper = shallow(<Tag editMode />)

  wrapper.find('.badge > span').simulate('click')
  wrapper.find('input').simulate('keyDown', {
    keyCode: KEY_CODES.ENTER,
    preventDefault: () => {},
    target: {
      blur: blurMock,
    },
  })
  wrapper.find('input').simulate('keyDown', {
    keyCode: KEY_CODES.ESCAPE,
    preventDefault: () => {},
    target: {
      blur: blurMock,
    },
  })
  wrapper.find('input').simulate('keyDown', {
    keyCode: KEY_CODES.ENTER,
    preventDefault: () => {},
    target: {
      blur: blurMock,
    },
  })
  wrapper.find('input').simulate('keyDown', {
    keyCode: KEY_CODES.TAB,
    preventDefault: () => {},
    target: {
      blur: blurMock,
    },
  })

  expect(blurMock).toBeCalled()
})

it('should hanlde keyDown event right with other key code', () => {
  const blurMock = jest.fn()
  const wrapper = shallow(<Tag editMode />)

  wrapper.find('.badge > span').simulate('click')

  wrapper.find('input').simulate('keyDown', {
    keyCode: 108,
    preventDefault: () => {},
    target: {
      blur: blurMock,
    },
  })
  wrapper.find('input').simulate('keyDown', {
    keyCode: 53,
    preventDefault: () => {},
    target: {
      blur: blurMock,
    },
  })

  expect(blurMock).not.toBeCalled()
})

it('should has input for editable tag with `isInput` state as true', () => {
  const wrapper = mount(<Tag value="Jogging" editMode isNew />)

  wrapper.setState({ isInput: true })

  expect(wrapper.find('input').length === 1).toBe(true)
})
