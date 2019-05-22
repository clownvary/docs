import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import _ from 'lodash'

import Table from 'table/index'

import { dataSource, cols, pagination } from '../__mocks__/table'

const setup = props => {
  const newProps = {
    height: '250px',
    sortBy: 'Name',
    selected: [],
    dataSource,
    cols,
    pagination,
    onSelect: () => {},
    onSort: () => {},
    onPaging: () => {},
    ...props,
  }

  const component = <Table {...newProps} />

  const wrapper = mount(component)

  return {
    props,
    component,
    wrapper,
  }
}

it('should render without errors', () => {
  const { wrapper } = setup()

  expect(wrapper).toBeTruthy()
})

it('should render right thing', () => {
  const { wrapper } = setup()

  expect(wrapper.find('table').length === 2).toBe(true)
  expect(wrapper.find('thead').length === 2).toBe(true)
  expect(wrapper.find('tbody').length === 2).toBe(true)
  expect(wrapper.find('.table-container--fixed').length === 1).toBe(true)
  expect(wrapper.find('.table-container').length === 1).toBe(true)
  expect(wrapper.find('.table--ellipsis').length === 2).toBe(true)
})

it('should render `table--ellipsis` class when `hyphenate` by `text-overflow`', () => {
  const { wrapper } = setup({ textOverflow: 'hyphenate' })

  expect(wrapper.find('.table--hyphenate').length === 2).toBe(true)
})

it("should render right thing and don't change unexpected", () => {
  const { component } = setup()
  const tree = renderer.create(component).toJSON()

  expect(tree).toMatchSnapshot()
})

it("should render right thing and don't change unexpected(without pagination)", () => {
  const { component } = setup({ pagination: {} })
  const tree = renderer.create(component).toJSON()

  expect(tree).toMatchSnapshot()
})

it('check head checkbox', () => {
  const onSelectMock = jest.fn()
  const dataSourceIndexs = dataSource.map((d, index) => index)
  const { wrapper } = setup({
    onSelect: onSelectMock,
  })
  const headCheckbox = wrapper.find(
    '.table-container--fixed table thead input[type="checkbox"]',
  )

  headCheckbox.simulate('change', { target: { checked: true } })

  expect(onSelectMock).toBeCalled()
  expect(onSelectMock).toBeCalledWith(dataSourceIndexs)
})

it('uncheck head checkbox', () => {
  const onSelectMock = jest.fn()
  const dataSourceIndexs = dataSource.map((d, index) => index)
  const { wrapper } = setup({
    onSelect: onSelectMock,
    selected: dataSourceIndexs,
  })
  const headCheckbox = wrapper.find(
    '.table-container--fixed table thead input[type="checkbox"]',
  )

  headCheckbox.simulate('change', { target: { checked: false } })

  expect(onSelectMock).toBeCalled()
  expect(onSelectMock).toBeCalledWith([])
})

it('check row checkbox', () => {
  const onSelectMock = jest.fn()
  const rowIndex = 0
  const { wrapper } = setup({
    onSelect: onSelectMock,
    dataSource: [dataSource[rowIndex]], // only one row
  })
  const rowCheckbox = wrapper.find(
    '.table-container table tbody input[type="checkbox"]',
  )

  rowCheckbox.simulate('change', { target: { checked: true } })

  expect(onSelectMock).toBeCalled()
  expect(onSelectMock).toBeCalledWith([rowIndex])
})

it('check row checkboxs with multiSelectable as false', () => {
  const onSelectMock = jest.fn()
  const { wrapper } = setup({
    onSelect: onSelectMock,
    multiSelectable: false,
  })
  const firstCheckbox = wrapper
    .find('.table-container table tbody input[type="checkbox"]')
    .first()
  const lastCheckbox = wrapper
    .find('.table-container table tbody input[type="checkbox"]')
    .last()

  firstCheckbox.simulate('change', { target: { checked: true } })
  lastCheckbox.simulate('change', { target: { checked: true } })

  expect(onSelectMock).toHaveBeenCalledTimes(2)
})

it('uncheck row checkbox', () => {
  const onSelectMock = jest.fn()
  const rowIndex = 0
  const { wrapper } = setup({
    onSelect: onSelectMock,
    dataSource: [dataSource[rowIndex]], // only one row
    selected: [rowIndex],
  })
  const rowCheckbox = wrapper.find(
    '.table-container table tbody input[type="checkbox"]',
  )

  rowCheckbox.simulate('change', { target: { checked: false } })

  expect(onSelectMock).toBeCalled()
  expect(onSelectMock).toBeCalledWith([])
})

it("won't render checkbox if set selectable as false", () => {
  const { wrapper } = setup({
    selectable: false,
  })

  expect(wrapper.find('table thead input[type="checkbox"]').length === 0).toBe(
    true,
  )
})

it("won't render head checkbox if set multiSelectable as false", () => {
  const { wrapper } = setup({
    multiSelectable: false,
  })

  expect(
    wrapper.find('.table-container--fixed table thead input[type="checkbox"]')
      .length === 0,
  ).toBe(true)
})

it('call onSort for one field with DESC by default', () => {
  const onSortMock = jest.fn()
  const colKeys = Object.keys(cols)
  const lastCol = colKeys[colKeys.length - 1]
  const { wrapper } = setup({
    onSort: onSortMock,
  })

  wrapper
    .find('.table-container--fixed th')
    .last()
    .simulate('click')

  expect(onSortMock).toBeCalled()
  expect(onSortMock).toBeCalledWith({
    column: lastCol,
    order: cols[lastCol].sorted === 'ASC' ? 'DESC' : 'ASC',
  })
})

it('call onSort for one field with ASC by default', () => {
  const onSortMock = jest.fn()
  const colKeys = Object.keys(cols)
  const col = colKeys[colKeys.length - 2]

  const { wrapper } = setup({
    onSort: onSortMock,
    sortBy: 'Address',
    cols,
  })

  wrapper
    .find('.table-container--fixed th')
    .at(colKeys.length - 1)
    .simulate('click')

  expect(onSortMock).toBeCalled()
  expect(onSortMock).toBeCalledWith({
    column: col,
    order: cols[col].sorted === 'ASC' ? 'DESC' : 'ASC',
  })
})

it("don't call onSort for one field set with sorted: false", () => {
  const onSortMock = jest.fn()
  const newCols = _.cloneDeep(cols)

  newCols.Address.sorted = false

  const { wrapper } = setup({
    onSort: onSortMock,
    sortBy: 'Address',
    cols: newCols,
  })

  wrapper
    .find('.table-container--fixed th')
    .last()
    .simulate('click')

  expect(onSortMock).not.toBeCalled()
})

it('onPaging', () => {
  const onPagingMock = jest.fn()
  const { wrapper } = setup({
    onPaging: onPagingMock,
  })

  wrapper
    .find('.pagination a')
    .first()
    .simulate('click')

  expect(onPagingMock).toBeCalled()
  expect(onPagingMock).toBeCalledWith({ currentPage: 2 })
})
