import React from 'react'
import renderer from 'react-test-renderer'
import { mount, shallow } from 'enzyme'

import TagEditor from 'TagEditor'
import Tag from 'Tag'

const data = [
  {
    text: 'first',
  },
]

beforeEach(() => {
  document.activeElement && document.activeElement.blur()
})

it('should render without errors', () => {
  const wrapper = shallow(<TagEditor />)

  expect(wrapper).toBeTruthy()
})

it("should render right thing and don't change unexpected", () => {
  const tree = renderer.create(<TagEditor data={data} />).toJSON()

  expect(tree).toMatchSnapshot()
})

it('should has `.tageditor.is-errored` when setting errored as true', () => {
  const wrapper = shallow(<TagEditor errored />)

  expect(wrapper.hasClass('is-errored')).toBe(true)
})

it('should call `handleClick` right', () => {
  const onChangeMock = jest.fn()
  const wrapper = shallow(<TagEditor data={data} onChange={onChangeMock} />)
  const tagEditor = wrapper.instance()

  tagEditor.handleClick()

  expect(onChangeMock).toBeCalled()
  expect(onChangeMock).toBeCalledWith([
    {
      text: 'first',
    },
    {
      isNew: true,
      text: 'your tag name',
    },
  ])
})

it('should call `handleTagClose` right', () => {
  const onChangeMock = jest.fn()
  const wrapper = shallow(<TagEditor data={data} onChange={onChangeMock} />)
  const tagEditor = wrapper.instance()

  tagEditor.handleTagClose(0)()

  expect(onChangeMock).toBeCalled()
  expect(onChangeMock).toBeCalledWith([])
})

it('should call `handleTabCancel` right', () => {
  const onChangeMock = jest.fn()

  data[0].isNew = true
  const wrapper = shallow(<TagEditor data={data} onChange={onChangeMock} />)
  const tagEditor = wrapper.instance()

  tagEditor.handleTabCancel(0)()

  expect(onChangeMock).toBeCalled()
  expect(onChangeMock).toBeCalledWith([])
})

it('should call `handleTagChange` right', () => {
  const onChangeMock = jest.fn()
  const wrapper = shallow(<TagEditor data={data} onChange={onChangeMock} />)
  const tagEditor = wrapper.instance()

  tagEditor.handleTagChange(0)('Updated tag text')

  expect(onChangeMock).toBeCalled()
  expect(onChangeMock).toBeCalledWith([
    {
      text: 'Updated tag text',
    },
  ])

  tagEditor.handleTagChange(0)('Updated tag text', true)

  expect(onChangeMock).toBeCalled()
  expect(onChangeMock).toBeCalledWith([
    {
      text: 'Updated tag text',
    },
    {
      isNew: true,
      text: 'your tag name',
    },
  ])
})

it('should call componentDidUpdate right', () => {
  const onChangeMock = jest.fn()
  const wrapper = mount(<TagEditor data={data} onChange={onChangeMock} />)
  const tagEditor = wrapper.instance()
  wrapper.setProps({
    data: data.concat({
      text: 'text',
    }),
  })
  wrapper.find('.tageditor').simulate('mouseDown')
  tagEditor.handleTagChange(0)('', true)
  wrapper
    .find('.tageditor')
    .childAt(0)
    .simulate('click')
  wrapper.setProps({
    data: data.concat([
      {
        text: 'text',
      },
      {
        text: 'text2',
      },
    ]),
  })
  expect(onChangeMock).toBeCalled()
})

it('should support custom props for every tag', () => {
  const customProps = {
    className: 'errored',
    a: 1,
    b: 2,
  }
  const customData = [
    {
      text: 'first',
      ...customProps,
    },
  ]
  const Component = <TagEditor data={customData} />
  const wrapper = mount(Component)
  const tree = renderer.create(Component).toJSON()

  expect(wrapper.find(Tag).props()).toMatchObject(
    expect.objectContaining(customProps),
  )
  expect(tree).toMatchSnapshot()
})

it('should render `placeholder` when `data` is empty', () => {
  const Component = (
    <TagEditor
      placeholder={<p className="strong">Your placeholder is here!</p>}
    />
  )

  expect(renderer.create(Component).toJSON()).toMatchSnapshot()
})

it('should could disable the editing with `editMode` as false', () => {
  const onChange = jest.fn()
  const Component = <TagEditor onChange={onChange} editMode={false} />
  const wrapper = mount(Component)

  expect(renderer.create(Component).toJSON()).toMatchSnapshot()

  wrapper.find('.tageditor').simulate('mouseDown')
  wrapper.find('.tageditor').simulate('click')
  expect(onChange).not.toBeCalled()
})
