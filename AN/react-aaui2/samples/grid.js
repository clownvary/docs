import React from 'react'
import ReactDOM from 'react-dom'

import { Row, Col, Button } from '../src'

const btnStyle = {
  marginRight: '10px',
}

const rowStyle = {
  backgroundColor: 'rgba(0,0,0,.04)',
  height: '200px',
}

const spanStyle = {
  backgroundColor: 'pink',
  border: '1px solid deeppink',
}

const colContentStyle = {
  backgroundColor: 'cyan',
  border: '1px solid blue',
}

class App extends React.Component {

  state = {
    fluid: false,
    align: 'start',
    justify: 'start',
    gutter: 0,
  }

  changeAlign = align => () => {
    this.setState({
      align,
    })
  }

  changeJustify = justify => () => {
    this.setState({
      justify,
    })
  }

  changeFluid = fluid => () => {
    this.setState({
      fluid,
    })
  }

  changeGutter = e => {
    this.setState({
      gutter: e.target.value,
    })
  }

  render() {
    const { fluid, justify, align, gutter } = this.state

    return (
      <div className="container">
        <h4>Fluid</h4>
        <Button type="sm" style={btnStyle} onClick={this.changeFluid(true)}>fluid</Button>
        <Button type="sm" style={btnStyle} onClick={this.changeFluid(false)}>no fluid</Button>
        <br />
        <h4>Align</h4>
        <Button type="sm" style={btnStyle} onClick={this.changeAlign('start')}>start</Button>
        <Button type="sm" style={btnStyle} onClick={this.changeAlign('center')}>center</Button>
        <Button type="sm" style={btnStyle} onClick={this.changeAlign('end')}>end</Button>
        <Button type="sm" style={btnStyle} onClick={this.changeAlign('stretch')}>Stretch</Button>
        <br />
        <h4>Justify</h4>
        <Button type="sm" style={btnStyle} onClick={this.changeJustify('start')}>start</Button>
        <Button type="sm" style={btnStyle} onClick={this.changeJustify('center')}>center</Button>
        <Button type="sm" style={btnStyle} onClick={this.changeJustify('end')}>end</Button>
        <Button type="sm" style={btnStyle} onClick={this.changeJustify('around')}>around</Button>
        <Button type="sm" style={btnStyle} onClick={this.changeJustify('between')}>between</Button>
        <br />
        <h4>Gutter</h4>
        <input type="range" min="0" max="100" onChange={this.changeGutter} /> {gutter}
        <br />
        <div style={rowStyle}>
          <Row style={{ height: '200px' }} fluid={fluid} justify={justify} align={align} gutter={gutter}>
            <Col style={spanStyle} lg={3} md={6} sm={12} >
              <div style={colContentStyle}>Col3</div>
            </Col>
            <Col style={spanStyle} lg={4} md={6} sm={12}>
              <div style={colContentStyle}>Col4</div>
            </Col>
            <Col style={spanStyle} span={5}><div style={colContentStyle}>Col5</div></Col>
            <Col style={spanStyle} span={4}><div style={colContentStyle}>Col4</div></Col>
            <Col style={spanStyle} span={5}><div style={colContentStyle}>Col5</div></Col>
            <Col style={spanStyle} span={6}><div style={colContentStyle}>Col6</div></Col>
          </Row>
        </div>
      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'))
