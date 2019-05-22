import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

import Dropdown from '../../src/Dropdown/Dropdown'

const simpleData = [
  {
    text: 'China',
    value: 'chs',
  },
  {
    text: 'United States of America',
    value: 'usa',
  },
]

const App = () => {
  const data = [
    {
      text: 'Canada',
      value: 'can',
    },
    {
      text: 'China',
      value: 'chs',
    },
    {
      text: 'Japan',
      value: 'jap',
    },
    {
      text: 'United States of America',
      value: 'usa',
    },
  ]

  return <Dropdown data={data} />
}

const AppWithFilter = () => {
  const data = [
    { text: 'Canada', value: 'can' },
    { text: 'China', value: 'chs' },
    { text: 'Japan', value: 'jap' },
    { text: 'United States of America', value: 'usa' },
  ]

  return <Dropdown data={data} filter className="dropdown--with-search" />
}

it("App should render right thing and don't change unexpected", () => {
  const tree = renderer.create(<App />).toJSON()

  expect(tree).toMatchSnapshot()
})

it("AppWithFilter should render right thing and don't change unexpected", () => {
  const tree = renderer.create(<AppWithFilter />).toJSON()

  expect(tree).toMatchSnapshot()
})

it("A dropdown's menu should hide by default", () => {
  const wrapper = mount(<App />)
  expect(wrapper.find('.dropdown__button').hasClass('collapse')).toBe(true)
})

it("A dropdown's menu should show up when click button", () => {
  const wrapper = mount(<App />)
  wrapper.find('.dropdown__button').simulate('click')
  expect(wrapper.find('.dropdown__button').hasClass('expand')).toBe(true)
})

it("A dropdown's menu should hide again when click button twice", () => {
  const wrapper = mount(<App />)
  wrapper.find('.dropdown__button').simulate('click')
  wrapper.find('.dropdown__button').simulate('click')
  expect(wrapper.find('.dropdown__button').hasClass('collapse')).toBe(true)
})

it("A dropdown's menu should hide when dropdown menu lost focus", () => {
  const wrapper = mount(<App />)
  wrapper.find('.dropdown__menu').simulate('blur')
  expect(wrapper.find('.dropdown__button').hasClass('collapse')).toBe(true)
})

it('Should show prefix icon if preIcon prop has a value', () => {
  const wrapper = mount(<Dropdown data={simpleData} />)

  wrapper.setProps({
    preIcon: 'icon-location',
  })

  expect(wrapper.find('.dropdown__prefix-icon').length).toBe(1)
})

it('Default option should be highlighted color with a `highlight` prop', () => {
  const wrapper = mount(
    <Dropdown data={simpleData} highlight defaultValue="chs" />,
  )
  expect(
    wrapper
      .find('li')
      .at(0)
      .hasClass('selected'),
  ).toBe(true)
})

it('Default option should not be highlighted color without a `highlight` prop', () => {
  const wrapper = mount(<Dropdown data={simpleData} defaultValue="chs" />)
  expect(
    wrapper
      .find('li')
      .at(0)
      .hasClass('selected'),
  ).toBe(false)
})

it('Highlighted color should update when defaultValue changes', () => {
  const wrapper = mount(<Dropdown data={simpleData} highlight />)

  wrapper.setProps({
    defaultValue: 'usa',
  })

  expect(
    wrapper
      .find('li')
      .at(0)
      .hasClass('selected'),
  ).toBe(false)
  expect(
    wrapper
      .find('li')
      .at(1)
      .hasClass('selected'),
  ).toBe(true)
})

it('Highlighted color should update when value changes', () => {
  const wrapper = mount(
    <Dropdown data={simpleData} highlight defaultValue="chs" />,
  )

  wrapper.setProps({
    value: 'usa',
  })

  expect(
    wrapper
      .find('li')
      .at(0)
      .hasClass('selected'),
  ).toBe(false)
  expect(
    wrapper
      .find('li')
      .at(1)
      .hasClass('selected'),
  ).toBe(true)
})

it('Highlighted color should update when data changes', () => {
  const wrapper = mount(<Dropdown data={[]} highlight defaultValue="chs" />)

  wrapper.setProps({
    data: simpleData,
  })

  expect(
    wrapper
      .find('li')
      .at(0)
      .hasClass('selected'),
  ).toBe(true)
})

it('Current option should be highlighted color with a `highlight` prop', () => {
  const wrapper = mount(<Dropdown data={simpleData} highlight />)
  const selectedLi = wrapper.find('li').at(1)

  selectedLi.find('a').simulate('click')

  expect(
    wrapper
      .find('li')
      .at(1)
      .hasClass('selected'),
  ).toBe(true) // https://github.com/airbnb/enzyme/issues/1163
})

it('Current option should not be highlighted color without a `highlight` prop', () => {
  const wrapper = mount(<Dropdown data={simpleData} />)
  const selectedLi = wrapper.find('li').at(1)

  selectedLi.find('a').simulate('click')
  wrapper.update()

  expect(selectedLi.hasClass('selected')).toBe(false)
})

it('A dropdown text should be set after select menu', () => {
  const wrapper = mount(<App />)
  wrapper.find('.dropdown__button').simulate('click')
  wrapper.find('ul').simulate('keyDown', { keyCode: 40 })
  wrapper.find('ul').simulate('keyDown', { keyCode: 38 })
  wrapper.find('ul').simulate('keyDown', { keyCode: 13 })
  wrapper
    .find('ul')
    .childAt(1)
    .find('a')
    .simulate('click')
  expect(wrapper.find('.dropdown__button-text').text()).toBe(
    wrapper
      .find('ul')
      .childAt(1)
      .find('a')
      .text(),
  )
})

it('A dropdown with filter should can search', () => {
  const wrapper = mount(<AppWithFilter />)
  wrapper.find('button').simulate('click')
  wrapper.find('.input').simulate('change', { target: { value: 'Cana' } })
  wrapper
    .find('ul')
    .childAt(2)
    .find('a')
    .simulate('click')
  expect(wrapper.find('.dropdown__button-text').text()).toBe(
    wrapper
      .find('ul')
      .childAt(2)
      .find('a')
      .text(),
  )
})

it('Should show dropdown menu after pressed the blank key (keyCode=32)', () => {
  const wrapper = mount(<App />)
  wrapper.find('.dropdown__button').simulate('keyDown', { keyCode: 32 })
  expect(wrapper.find('ul').hasClass('show')).toBe(true)
})

it('Should show dropdown menu after pressed the Up key (keyCode=38)', () => {
  const wrapper = mount(<App />)
  wrapper.find('.dropdown__button').simulate('keyDown', { keyCode: 38 })
  expect(wrapper.find('ul').hasClass('show')).toBe(true)
})

it('Should show dropdown menu after pressed the Down key (keyCode=40)', () => {
  const wrapper = mount(<App />)
  wrapper.find('.dropdown__button').simulate('keyDown', { keyCode: 40 })
  expect(wrapper.find('ul').hasClass('show')).toBe(true)
})

it('Should hide dropdown menu after pressed the Esc key (keyCode=27)', () => {
  const wrapper = mount(<App />)
  wrapper.find('.dropdown__button').simulate('keyDown', { keyCode: 32 })
  wrapper.find('.dropdown__button').simulate('keyDown', { keyCode: 27 })
  expect(wrapper.find('ul').hasClass('show')).toBe(false)

  wrapper.find('.dropdown__button').simulate('keyDown', { keyCode: 38 })
  wrapper.find('.dropdown__button').simulate('keyDown', { keyCode: 27 })
  expect(wrapper.find('ul').hasClass('show')).toBe(false)

  wrapper.find('.dropdown__button').simulate('keyDown', { keyCode: 40 })
  wrapper.find('.dropdown__button').simulate('keyDown', { keyCode: 27 })
  expect(wrapper.find('ul').hasClass('show')).toBe(false)
})

it('Should hide dropdown menu after pressed the Enter key (keyCode=13)', () => {
  const wrapper = mount(<App />)

  wrapper.find('.dropdown__button').simulate('keyDown', { keyCode: 38 })
  wrapper.find('.dropdown__button').simulate('keyDown', { keyCode: 13 })
  expect(wrapper.find('ul').hasClass('show')).toBe(false)

  wrapper.find('.dropdown__button').simulate('keyDown', { keyCode: 40 })
  wrapper.find('.dropdown__button').simulate('keyDown', { keyCode: 13 })
  expect(wrapper.find('ul').hasClass('show')).toBe(false)

  wrapper.find('.dropdown__button').simulate('keyDown', { keyCode: 32 })
  wrapper.find('.dropdown__button').simulate('keyDown', { keyCode: 38 })
  wrapper.find('.dropdown__button').simulate('keyDown', { keyCode: 13 })
  expect(wrapper.find('ul').hasClass('show')).toBe(false)
})

it('Should active the first item after pressed the Up key (keyCode=38)', () => {
  const wrapper = mount(<App />)
  wrapper.find('.dropdown__button').simulate('keyDown', { keyCode: 38 })
  expect(
    wrapper
      .find('li')
      .last()
      .hasClass('selected'),
  ).toBe(true)
})

it('Should active the last item after pressed the Down key (keyCode=40)', () => {
  const wrapper = mount(<App />)
  wrapper.find('.dropdown__button').simulate('keyDown', { keyCode: 40 })
  expect(
    wrapper
      .find('li')
      .first()
      .hasClass('selected'),
  ).toBe(true)
})

it('Should active the second item after pressed the Down key (keyCode=40) and press Down key again', () => {
  const wrapper = mount(<App />)
  wrapper.find('.dropdown__button').simulate('keyDown', { keyCode: 40 })
  wrapper.find('.dropdown__button').simulate('keyDown', { keyCode: 40 })
  expect(
    wrapper
      .find('li')
      .at(1)
      .hasClass('selected'),
  ).toBe(true)
})

it('The text of button eaquals the selectd li text after pressed the Down key (keyCode=40) and press Down key again and press the Enter key ', () => {
  const wrapper = mount(<App />)
  wrapper.find('.dropdown__button').simulate('click')
  wrapper.find('.dropdown__button').simulate('keyDown', { keyCode: 40 })
  wrapper.find('.dropdown__button').simulate('keyDown', { keyCode: 40 })
  wrapper.find('.dropdown__button').simulate('keyDown', { keyCode: 13 })
  expect(
    wrapper
      .find('.dropdown__button')
      .find('span')
      .first()
      .text(),
  ).toBe('China')
})

it('Should active the second item after pressed the Down key (keyCode=40) and press J key, then press U key', () => {
  const wrapper = mount(<App />)
  wrapper.find('.dropdown__button').simulate('keyDown', { keyCode: 40 })
  wrapper.find('.dropdown__button').simulate('keyDown', { keyCode: 74 }) // Start with J
  expect(
    wrapper
      .find('li')
      .at(2)
      .hasClass('selected'),
  ).toBe(true)
  wrapper.find('.dropdown__button').simulate('keyDown', { keyCode: 85 }) // Start with U
  expect(
    wrapper
      .find('li')
      .at(3)
      .hasClass('selected'),
  ).toBe(false)
  setTimeout(() => {
    wrapper.find('.dropdown__button').simulate('keyDown', { keyCode: 85 }) // Start with U
    expect(
      wrapper
        .find('li')
        .at(3)
        .hasClass('selected'),
    ).toBe(true)
  }, 500)
})

it('Should active the second item after pressed the Down key (keyCode=40) and press E key', () => {
  const wrapper = mount(<App />)
  wrapper.find('.dropdown__button').simulate('keyDown', { keyCode: 40 })
  wrapper.find('.dropdown__button').simulate('keyDown', { keyCode: 69 }) // Start with E
  expect(
    wrapper
      .find('li')
      .at(0)
      .hasClass('selected'),
  ).toBe(true) // Still selected the first item
})

it("drop down's value can be updated from code directly ", () => {
  const wrapper = mount(<Dropdown data={simpleData} />)
  wrapper.find('.dropdown__button').simulate('click')
  wrapper
    .find('ul')
    .childAt(1)
    .find('a')
    .simulate('click')
  const originalResult = wrapper.instance().value
  wrapper.setProps({
    value: undefined,
  })
  wrapper.instance().value = 'chs'
  expect(wrapper.instance().value).not.toBe(originalResult)
})

it("automatically improve drop down's scrollTop when rendering ", () => {
  const wrapper = mount(<Dropdown data={simpleData} />)
  wrapper.instance().itemMenu.querySelector = () => ({
    offsetTop: 20,
    offsetHeight: 10,
    focus: () => {},
  })
  wrapper.setState({
    isExpanded: true,
  })
  wrapper.setProps({
    placeholder: 'ok',
  })
  expect(wrapper.instance().itemMenu.scrollTop).toBe(20)
})

it('can collapse and cancel it', () => {
  jest.useFakeTimers()
  const wrapper = mount(<Dropdown data={simpleData} />)
  wrapper.setState({
    isExpanded: true,
  })
  wrapper.instance().giveFocus({
    target: wrapper.instance().itemMenu,
  })
  wrapper.instance().tryCollapse()
  jest.runAllTimers()
  wrapper.instance().cancelCollapseTimeout()
  wrapper.find('.dropdown__button').simulate('keyDown', { keyCode: 32 })
  wrapper.find('.dropdown__button').simulate('keyDown', { keyCode: 9 })
  wrapper.find('.dropdown__button').simulate('mouseDown')
  expect(wrapper.find('ul').hasClass('show')).toBe(true)
})

it('can handle keydown when filtered', () => {
  const wrapper = mount(<Dropdown data={simpleData} />)
  wrapper.setProps({
    filter: true,
  })
  wrapper
    .find('.dropdown__menu__search-box input')
    .simulate('keyDown', { keyCode: 38 })
  wrapper
    .find('.dropdown__menu__search-box input')
    .simulate('keyDown', { keyCode: 13 })
  wrapper
    .find('.dropdown__menu__search-box input')
    .simulate('keyDown', { keyCode: 10 })
  expect(wrapper.find('ul').hasClass('show')).toBe(false)
})

it('can handle keydown when filtered case 2', () => {
  const wrapper = mount(<Dropdown data={simpleData} />)
  wrapper.setProps({
    filter: true,
  })
  wrapper.instance().filterData('', simpleData)
  expect(wrapper.find('ul').hasClass('show')).toBe(false)
})

it('should clear keyboard value when trigger keyUp on the wrapper', () => {
  const wrapper = mount(<Dropdown data={simpleData} />)
  wrapper.setProps({
    disabled: false,
  })
  wrapper
    .find('div.dropdown')
    .simulate('keyUp', { keyCode: 38, persist: () => true })
  expect(wrapper.instance().keyboardValue).toBe('')
})

it('should handle keyUp event from the wrapper correctly', () => {
  const wrapper = mount(<Dropdown data={simpleData} />)
  const keyboardValue = 57
  wrapper.setProps({
    disabled: false,
    data: [
      { text: '5', value: 5 },
      { text: '7', value: 7 },
      { text: '57', value: 57 },
    ],
  })
  wrapper.setState({
    keyWords: '5',
    activeItemIndex: 4,
  })
  wrapper.instance().keyboardValue = '5'
  wrapper.find('div.dropdown').simulate('keyDown', { keyCode: 55 })
  expect(wrapper.instance().keyboardValue).toBe(keyboardValue.toString())
})

it('should handle keyUp event from the wrapper correctly 2', () => {
  const wrapper = mount(<Dropdown data={simpleData} />)
  const keyboardValue = 5
  wrapper.setProps({
    disabled: false,
    data: [
      { text: '5', value: 5 },
      { text: '7', value: 7 },
      { text: '57', value: 57 },
    ],
  })
  wrapper.setState({
    keyWords: '5',
    activeItemIndex: 4,
  })
  wrapper.instance().keyboardValue = '5'
  wrapper.find('div.dropdown').simulate('keyDown', { keyCode: 38 })
  expect(wrapper.instance().keyboardValue).toBe(keyboardValue.toString())
})

it('should not handle keyUp event when disbaled', () => {
  const wrapper = mount(<Dropdown data={simpleData} />)
  wrapper.setProps({
    disabled: true,
  })
  wrapper.find('div.dropdown').simulate('keyDown', { keyCode: 55 })
  expect(wrapper.instance().keyboardValue).toBe('')
})

it('should show initValue correctly', () => {
  const wrapper = mount(<Dropdown data={simpleData} />)
  wrapper.setProps({
    disabled: true,
    defaultValue: 'usa',
  })
  wrapper.find('div.dropdown').simulate('keyDown', { keyCode: 55 })
  expect(wrapper.instance().keyboardValue).toBe('')
})

it('should show initValue correctly without state change case 1', () => {
  const wrapper = mount(<Dropdown data={simpleData} />)
  wrapper.setState({
    value: '5',
  })
  wrapper.setProps({
    disabled: true,
    defaultValue: 'usa',
  })
  wrapper.find('div.dropdown').simulate('keyDown', { keyCode: 38 })
  expect(wrapper.instance().keyboardValue).toBe('')
})

it('should show initValue correctly without state change case 2', () => {
  const wrapper = mount(<Dropdown data={simpleData} />)
  wrapper.setState({
    isExpanded: true,
  })
  wrapper.find('div.dropdown').simulate('keyDown', { keyCode: 32 })
  expect(wrapper.instance().keyboardValue).toBe('')
})

it('should call onExpand when state set isExpanded to true', () => {
  const onExpand = jest.fn()
  const wrapper = mount(<Dropdown data={simpleData} onExpand={onExpand} />)
  wrapper.setState({
    isExpanded: true,
  })
  expect(onExpand).toBeCalled()
})

it('should call onCollapse when state set isExpanded to false from true', () => {
  const onExpand = jest.fn()
  const onCollapse = jest.fn()
  const wrapper = mount(
    <Dropdown data={simpleData} onExpand={onExpand} onCollapse={onCollapse} />,
  )
  wrapper.setState({
    isExpanded: true,
  })
  expect(onExpand).toBeCalled()
  wrapper.setState({
    isExpanded: false,
  })
  expect(onCollapse).toBeCalled()
})
