import React from 'react'
import { mount } from 'enzyme'

import L10nProvider from 'shared/L10nProvider'
import L10nMessage from 'shared/L10nMessage'
import injectL10n from 'shared/injectL10n'

import UpdateBlocker from '../__mocks__/UpdateBlocker'
import NonUpdateBlocker from '../__mocks__/NonUpdateBlocker'
import L10nPage from '../__mocks__/L10nPage'

beforeAll(() => {
  jest.useRealTimers()
})

function makeCallback(done, callback) {
  return (...args) => {
    try {
      callback(...args)
      done()
    } catch (error) {
      done.fail(error)
    }
  }
}

const setup = (
  {
    messages = { a: 1 },
    locale = 'en_US',
    Child = UpdateBlocker,
    ...rest
  } = {},
) => {
  const Component = (
    <L10nProvider locale={locale} messages={messages} {...rest}>
      <Child />
    </L10nProvider>
  )

  const wrapper = mount(Component)

  return {
    wrapper,
    Component,
  }
}

it('should has en_US locale by default', () => {
  const { wrapper } = setup()

  expect(wrapper.prop('locale')).toBe('en_US')
})

it('should support passing custom locale prop', () => {
  const { wrapper } = setup({ locale: 'zh_CN' })

  expect(wrapper.prop('locale')).toBe('zh_CN')
})

it('do nothing when no props change', () => {
  const locale = 'zh_CN'
  const { wrapper } = setup({ locale })

  wrapper.setProps({ locale })

  expect(wrapper.prop('locale')).toBe(locale)
})

describe('should render right messages for nested child components', () => {
  it('should render right', done => {
    const Child = () => <L10nMessage id="country.displayName.CN" />
    const { wrapper } = setup({ Child })

    expect(wrapper.text()).toBe('China')

    wrapper.setProps({ locale: 'zh_CN' })

    setTimeout(
      makeCallback(done, () => {
        expect(wrapper.text()).toBe('中国')
      }),
      0,
    )
  })

  it('should get right message from messagePath', done => {
    const Child = () => <L10nMessage id="custom.country.name" />
    const { wrapper } = setup({
      messagePath:
        '../../test/shared/__mocks__/testlocale/customMessage_{locale}.json',
      Child,
    })

    setTimeout(
      makeCallback(done, () => {
        expect(wrapper.text()).toBe('Custom-China')
        wrapper.setProps({ locale: 'zh_CN' })

        setTimeout(
          makeCallback(done, () => {
            expect(wrapper.text()).toBe('自定义-中国')
          }),
          0,
        )
      }),
      0,
    )
  })

  it('should use message prop properties', done => {
    const Child = () => <L10nMessage id="country.displayName.CN" />
    const { wrapper } = setup({ Child })

    setTimeout(
      makeCallback(done, () => {
        expect(wrapper.text()).toBe('China')
        wrapper.setProps({
          messages: { 'country.displayName.CN': 'Inline-Message' },
        })

        setTimeout(
          makeCallback(done, () => {
            expect(wrapper.text()).toBe('Inline-Message')
          }),
          0,
        )
      }),
      0,
    )
  })

  it('should render right inside the `UpdateBlocker`', done => {
    const Child = () => (
      <UpdateBlocker>
        <L10nMessage id="country.displayName.CN" />
      </UpdateBlocker>
    )
    const { wrapper } = setup({ Child })

    expect(wrapper.text()).toBe('China')

    wrapper.setProps({ locale: 'zh_CN' })

    setTimeout(
      makeCallback(done, () => {
        expect(wrapper.text()).toBe('中国')
      }),
      0,
    )
  })

  it('should render right inside the `NonUpdateBlocker`', done => {
    const Child = () => (
      <NonUpdateBlocker>
        <L10nMessage id="country.displayName.CN" />
      </NonUpdateBlocker>
    )
    const { wrapper } = setup({ Child })

    expect(wrapper.text()).toBe('China')

    wrapper.setProps({ locale: 'zh_CN' })

    setTimeout(
      makeCallback(done, () => {
        expect(wrapper.text()).toBe('中国')
      }),
      0,
    )
  })

  it('should render right when calling `l10n.formatMessage` reside in `NonUpdateBlocker`', done => {
    const InjectedPage = injectL10n()(L10nPage)
    const Child = () => (
      <NonUpdateBlocker>
        <InjectedPage />
      </NonUpdateBlocker>
    )

    const { wrapper } = setup({ Child })

    expect(wrapper.text()).toBe('China')

    wrapper.setProps({ locale: 'zh_CN' })

    setTimeout(
      makeCallback(done, () => {
        expect(wrapper.text()).toBe('中国')
      }),
      0,
    )
  })

  it('should render right when calling `l10n.formatMessage` reside in `UpdateBlocker`', done => {
    const InjectedPage = injectL10n()(L10nPage)
    const Child = () => (
      <UpdateBlocker>
        <InjectedPage />
      </UpdateBlocker>
    )

    const { wrapper } = setup({ Child })

    expect(wrapper.text()).toBe('China')

    wrapper.setProps({ locale: 'zh_CN' })

    setTimeout(
      makeCallback(done, () => {
        expect(wrapper.text()).toBe('中国')
      }),
      0,
    )
  })
})
