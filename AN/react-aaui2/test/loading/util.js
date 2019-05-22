import { show, hide, reset } from 'loading/util'

afterEach(() => {
  reset()
  document.body.innerHTML = ''
})

it('show', () => {
  show()

  expect(document.querySelectorAll('.loading').length).toBe(1)
  expect(document.body.innerHTML).toMatchSnapshot()
})

it('hide', () => {
  show()
  hide()

  expect(document.querySelectorAll('.loading').length).toBe(0)
  expect(document.body.innerHTML).toMatchSnapshot()
})

it('show()#close', () => {
  const { close, counter } = show()

  show()
  show()

  expect(document.querySelectorAll('.loading').length).toBe(1)
  close()
  expect(document.querySelectorAll('.loading').length).toBe(0)
  expect(counter.isEmpty()).toBeTruthy()
})
