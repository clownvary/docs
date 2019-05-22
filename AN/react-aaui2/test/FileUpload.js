import React from 'react'
import { mount } from 'enzyme'

import FileUpload from '../src/FileUpload'

const didMountFunc = jest.fn()
const cancelFunc = jest.fn()

beforeEach(() => {
  global.URL = {}
  global.URL.createObjectURL = () => 'data:fileDataUrl'
  global.confirm = () => {
    cancelFunc()
    return true
  }
  document.addEventListener = (e, fn) => {
    fn({ preventDefault: didMountFunc })
  }
})

it('should render without errors', () => {
  const wrapper = mount(
    <FileUpload size="sm" text="Select One" defaultText="No file selected" />,
  )

  expect(wrapper).toBeTruthy()
})

it('should trigger `onChange` when file changed', () => {
  const onChange = jest.fn()
  const wrapper = mount(
    <FileUpload
      size="sm"
      onChange={onChange}
      text="Select One"
      defaultText="No file selected"
    />,
  )

  wrapper.find('input[type="file"]').simulate('change', {
    target: {
      files: [{ type: 'image/png', filename: 'test' }],
    },
  })

  expect(onChange).toBeCalled()
})

it('should trigger `onChange` when file dropped', () => {
  const onChange = jest.fn()
  const wrapper = mount(
    <FileUpload
      size="sm"
      onChange={onChange}
      text="Select One"
      defaultText="No file selected"
    />,
  )

  wrapper.find('input[type="file"]').simulate('change', {
    dataTransfer: {
      files: [{ type: 'image/png', filename: 'test' }],
    },
  })

  expect(onChange).toBeCalled()
})

it('should render right when file changed to `empty` ', () => {
  const wrapper = mount(
    <FileUpload size="sm" text="Select One" defaultText="No file selected" />,
  )

  wrapper.find('input[type="file"]').simulate('change', {
    dataTransfer: {
      files: [],
    },
  })

  expect(wrapper).toBeTruthy()
})

it('should render `file-error` when wrong file type', () => {
  const wrapper = mount(
    <FileUpload size="sm" text="Select One" defaultText="No file selected" />,
  )

  wrapper.find('input[type="file"]').simulate('change', {
    dataTransfer: {
      files: [{ type: 'other', filename: 'test', size: 4000 * 1024 }],
    },
  })

  expect(wrapper.find('.file-error').length === 1).toBe(true)
})

it('should set value nothing when file size is too large ', () => {
  const onChange = jest.fn()
  const wrapper = mount(
    <FileUpload
      size="sm"
      onChange={onChange}
      text="Select One"
      defaultText="No file selected"
    />,
  )

  wrapper.find('input[type="file"]').simulate('change', {
    dataTransfer: {
      files: [{ type: 'image', filename: 'test', size: 30000 * 1024 + 1 }],
    },
  })

  expect(wrapper.state().selectedFile).toBe('')
})

it('should delete selected image file ', () => {
  const onChange = jest.fn()
  const wrapper = mount(
    <FileUpload
      ForImage
      size="sm"
      onChange={onChange}
      text="Select One"
      defaultText="No file selected"
    />,
  )

  wrapper.find('input[type="file"]').simulate('change', {
    dataTransfer: {
      files: [{ type: 'image/png', filename: 'test', size: 1024 }],
    },
  })

  wrapper.find('.icon-delete').simulate('click')
  expect(wrapper.state().selectedFile).toBe(null)
})

it('should set `dropOnDocument` property and `cancel` be called ', () => {
  const onChange = jest.fn()
  const wrapper = mount(
    <FileUpload
      dropOnDocument
      ForImage
      size="sm"
      onChange={onChange}
      text="Select One"
      defaultText="No file selected"
    />,
  )

  wrapper.find('input[type="file"]').simulate('change', {
    dataTransfer: {
      files: [{ type: 'image/png', filename: 'test', size: 1024 }],
    },
  })

  wrapper.find('.icon-delete').simulate('click')
  expect(cancelFunc).toBeCalled()
})

it('should not trigger `cancel` when window `confirm` result false', () => {
  global.confirm = () => false
  const wrapper = mount(
    <FileUpload
      dropOnDocument
      ForImage
      size="sm"
      text="Select One"
      defaultText="No file selected"
    />,
  )

  wrapper.find('input[type="file"]').simulate('change', {
    dataTransfer: {
      files: [{ type: 'image/png', filename: 'test', size: 1024 }],
    },
  })

  wrapper.find('.icon-delete').simulate('click')
  expect(!!wrapper.state().selectedFile).toBe(true)
})
