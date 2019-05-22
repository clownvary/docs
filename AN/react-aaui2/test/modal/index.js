import Modal from 'modal'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('Modal.confirm', () => {
  const setup = (props = {}) => {
    const api = Modal.confirm({
      title: 'Remove',
      content: 'Do you really want to remove it?',
      ...props,
    })

    return {
      ...api,
    }
  }

  it('confirm', () => {
    setup()

    expect(document.body.innerHTML).toMatchSnapshot()
  })

  it('with default values', () => {
    Modal.confirm()

    expect(document.body.innerHTML).toMatchSnapshot()
  })

  it('Modal.confirm#close', () => {
    const onCancel = jest.fn()
    const { close } = setup({
      onCancel,
    })

    close()
    expect(onCancel).not.toBeCalled()
    expect(document.body.innerHTML).toMatchSnapshot()
  })

  it('Modal#onClose', () => {
    const onCancel = jest.fn()

    setup({
      onCancel,
    })

    document.querySelector('.icon-close').click()

    expect(onCancel).toBeCalled()
    expect(document.body.innerHTML).toMatchSnapshot()
  })

  it('onCancel', () => {
    const onCancel = jest.fn()

    setup({
      onCancel,
    })

    document.querySelector('.btn-secondary').click()

    expect(onCancel).toBeCalled()
    expect(document.body.innerHTML).toMatchSnapshot()
  })

  it('onCancel with returnning value as promise', () => {
    const resolvePayload = { a: 1 }
    const promise = Promise.resolve(resolvePayload)
    const onOkMock = jest.fn()
    const onCancel = jest.fn(() => promise)

    setup({
      onOk: onOkMock,
      onCancel,
    })

    document.querySelector('.btn-secondary').click()

    expect(onCancel).toBeCalled()
    expect(onOkMock).not.toBeCalled()

    return promise.then(() => {
      expect(document.body.innerHTML).toMatchSnapshot()
    })
  })

  it('onOk', () => {
    const onOkMock = jest.fn()

    setup({
      onOk: onOkMock,
    })

    document.querySelector('.btn-primary').click()

    expect(onOkMock).toBeCalled()
    expect(document.body.innerHTML).toMatchSnapshot()
  })

  it('onOk with returnning value as promise', () => {
    const resolvePayload = { a: 1 }
    const promise = Promise.resolve(resolvePayload)
    const onOkMock = jest.fn(() => promise)
    const onCancel = jest.fn()

    setup({
      onOk: onOkMock,
      onCancel,
    })

    document.querySelector('.btn-primary').click()

    expect(onOkMock).toBeCalled()
    expect(onCancel).not.toBeCalled()

    return promise.then(() => {
      expect(document.body.innerHTML).toMatchSnapshot()
    })
  })

  it('custom props', () => {
    const customClassName = 'my-custom-classname'
    setup({
      className: customClassName,
    })

    expect(document.querySelector(`.${customClassName}`)).toBeTruthy()
    expect(document.body.innerHTML).toMatchSnapshot()
  })

  it('suppressCancel', () => {
    setup({
      suppressCancel: true,
    })

    expect(document.querySelector('[type="secondary"]')).toBeFalsy()
    expect(document.body.innerHTML).toMatchSnapshot()
  })

  it('suppressOk', () => {
    setup({
      suppressOk: true,
    })

    expect(document.querySelector('[type="primary"]')).toBeFalsy()
    expect(document.body.innerHTML).toMatchSnapshot()
  })
})
