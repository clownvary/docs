import { alert, clear } from 'alert/util'

beforeAll(() => {
  jest.useFakeTimers()
})

afterAll(() => {
  jest.useRealTimers()
})

afterEach(() => {
  document.body.innerHTML = ''
})

const setup = props => {
  const api = alert({
    message: 'I AM A GLOBAL MESSAGE',
    ...props,
  })

  return {
    ...api,
  }
}

it('alert', () => {
  const { close } = setup({ type: 'success' })

  expect(document.body.innerHTML).toMatchSnapshot()

  close()

  expect(document.body.innerHTML).toMatchSnapshot()
})

it('clear', () => {
  // open 4 Alerts at first
  const { close } = setup({ type: 'success', multiple: true })
  setup({ type: 'success', multiple: true })
  setup({ type: 'success', multiple: true })
  setup({ type: 'success', multiple: true })

  jest.runAllTimers()

  expect(document.querySelectorAll('.alert-bar.show').length).toBe(4)
  expect(document.body.innerHTML).toMatchSnapshot()

  // then close one of them
  close()

  expect(document.querySelectorAll('.alert-bar.show').length).toBe(3)

  // close all after all
  clear()

  expect(document.querySelectorAll('.alert-bar.show').length).toBe(0)
  expect(document.body.innerHTML).toMatchSnapshot()
})
