import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import Infobar from '../src/Infobar'

it('should render without errors', () => {
  const wrapper = shallow(<Infobar />)

  expect(wrapper).toBeTruthy()
})

it('should render right thing', () => {
  const wrapper = shallow(<Infobar />)

  expect(wrapper.find('div').length === 1).toBe(true)
})

it('should has .infobar by default', () => {
  const wrapper = shallow(<Infobar />)

  expect(wrapper.hasClass('infobar')).toBe(true)
})

it('should has close button by default', () => {
  const wrapper = shallow(<Infobar />)

  expect(wrapper.find('button.close').length === 1).toBe(true)
})

it('should hide close button if setting noClose={true} ', () => {
  const wrapper = shallow(<Infobar noClose />)

  expect(wrapper.find('button.close').length === 0).toBe(true)
})

it('should call onClose callback when clicking close button', () => {
  const onCloseSpy = sinon.spy()
  const wrapper = shallow(<Infobar onClose={onCloseSpy} />)

  wrapper.find('button.close').simulate('click')

  expect(onCloseSpy.callCount === 1).toBe(true)
})
