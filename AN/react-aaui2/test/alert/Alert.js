import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import Alert from '../../src/alert'

it('should render without errors', () => {
  const wrapper = shallow(<Alert />)

  expect(wrapper).toBeTruthy()
})

it('should render right thing', () => {
  const wrapper = shallow(<Alert />)

  expect(wrapper.find('button').length === 1).toBe(true)
})

it("should render right thing and don't change unexpected", () => {
  ;['success', 'warning', 'info', 'danger', 'error'].forEach(type => {
    expect(renderer.create(<Alert type={type} />).toJSON()).toMatchSnapshot()
  })
})

it('has type="info" by default', () => {
  const wrapper = shallow(<Alert />)

  expect(wrapper.hasClass('alert-info')).toBe(true)
})

it('has close button by default', () => {
  const wrapper = shallow(<Alert />)

  expect(wrapper.find('button.close').length === 1).toBe(true)
})

it('Alert#inverse', () => {
  ;['success', 'warning', 'info', 'danger', 'error'].forEach(type => {
    expect(
      renderer.create(<Alert inverse type={type} />).toJSON(),
    ).toMatchSnapshot()
  })
})

it('onClose should be called if click evenyt occurs on the close button', () => {
  const onCloseMock = jest.fn()
  const wrapper = shallow(<Alert onClose={onCloseMock} />)
  const closeButton = wrapper.find('button')

  closeButton.simulate('click')

  expect(onCloseMock).toHaveBeenCalledTimes(1)
})
