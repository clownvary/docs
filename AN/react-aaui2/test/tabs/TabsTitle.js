import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import TabsTitle from 'tabs/TabsTitle'

const context = {
  auiTabsAPI: {
    select: () => {},
    getSelected: () => 'test',
  },
}

it("should render right thing and don't change unexpected", () => {
  const tree = renderer.create(<TabsTitle {...context} />).toJSON()

  expect(tree).toMatchSnapshot()
})

it('should render without errors', () => {
  const wrapper = shallow(<TabsTitle {...context} />)

  expect(wrapper).toBeTruthy()
})

it('should render right thing', () => {
  const wrapper = shallow(<TabsTitle className="tabs-title" {...context} />)

  expect(wrapper.find('a.tabs-title').length === 1).toBe(true)
})

it('should handle events right', () => {
  const tabsTitleName = 'test'
  const selectMock = jest.fn()
  const getSelectedMock = jest.fn()
  const mockContext = {
    auiTabsAPI: {
      select: selectMock,
      getSelected: getSelectedMock,
    },
  }

  const wrapper = shallow(<TabsTitle name={tabsTitleName} {...mockContext} />)

  expect(getSelectedMock).toBeCalled()

  wrapper.find('a').simulate('click')

  expect(selectMock).toBeCalled()
  expect(selectMock).toBeCalledWith(tabsTitleName)
})
