import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import { Row, Col } from 'grid'

const baseProps = {
  fluid: false,
  gutter: 0,
  align: 'start',
  justify: 'start',
  style: {},
}

it('should render without errors', () => {
  const wrapper = shallow(<Row {...baseProps}>Test</Row>)

  expect(wrapper).toBeTruthy()
})

it("should render right thing and don't change unexpected", () => {
  const tree = renderer
    .create(
      <Row {...baseProps}>
        <div>Col</div>
      </Row>,
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})

it('should render without errors when gutter greater than 0', () => {
  const wrapper = shallow(
    <Row {...baseProps} gutter={2}>
      <div>Col</div>
    </Row>,
  )

  expect(wrapper).toBeTruthy()
})

it('should render fluid rightly', () => {
  const wrapper = shallow(<Row {...baseProps} fluid />)

  const justifier = wrapper.find('.row-fluid')
  expect(justifier.length).toBe(1)

  expect(wrapper).toBeTruthy()
})

it('should render justify rightly', () => {
  const wrapper = shallow(<Row {...baseProps} justify={'around'} />)

  const justifier = wrapper.find('.row-justify-space-around')
  expect(justifier.length).toBe(1)

  expect(wrapper).toBeTruthy()
})

it('should support gutter with bool type', () => {
  const wrapper = shallow(<Row gutter />)

  expect(wrapper.hasClass('row-gutter')).toBe(true)
})

it('should support gutter with number type', () => {
  const tree = renderer
    .create(
      <Row gutter={30}>
        <Col>Col1</Col>
      </Row>,
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})

it('should support gutter with string type', () => {
  const tree = renderer
    .create(
      <Row gutter={30}>
        <Col>Col1</Col>
      </Row>,
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
