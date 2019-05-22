import Loading from 'loading'

afterEach(() => {
  document.body.innerHTML = ''
  Loading.reset()
})

const setup = ({ action }) => {
  const api = Loading[action]()

  return {
    ...api,
  }
}

it('Loading.show', () => {
  setup({ action: 'show' })
  setup({ action: 'show' })
  setup({ action: 'show' })
  setup({ action: 'show' })
  setup({ action: 'show' })

  expect(document.querySelectorAll('.loading').length === 1).toBe(true)
  expect(document.body.innerHTML).toMatchSnapshot()
})

it('Loading.hide', () => {
  setup({ action: 'show' })
  setup({ action: 'show' })
  setup({ action: 'hide' })
  setup({ action: 'hide' })

  expect(document.querySelectorAll('.loading').length === 0).toBe(true)
  expect(document.body.innerHTML).toMatchSnapshot()
})

it('Loading.show#close', () => {
  const { close } = setup({ action: 'show' })

  expect(document.querySelectorAll('.loading').length === 1).toBe(true)
  close()
  expect(document.querySelectorAll('.loading').length === 0).toBe(true)
})
