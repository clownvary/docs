import React from 'react'
import ReactDOM from 'react-dom'
import { Dropdown } from '../../src/index'

class App extends React.Component {
  state = {
    val: 'chs',
    d1: [
      { text: 'Canada', value: 'can' },
      { text: 'China', value: 'chs' },
      { text: 'Japan', value: 'jap' },
      { text: 'United States of America', value: 'usa' },
    ],
    isChecked: false,
  }

  showValue = ({ value }) => {
    console.log(`You selected: ${value}`)
  }

  showValue2 = () => {
    console.log(this.d1.value)
  }

  render() {
    const data1 = [
      { text: 'Canada', value: 'can' },
      { text: 'China', value: 'chs' },
      { text: 'Japan1', value: 'jap1' },
      { text: 'Japan2', value: 'jap2' },
      { text: 'Japan3', value: 'jap3' },
      { text: 'Japan4', value: 'jap4' },
      { text: 'Japan5', value: 'jap5' },
      { text: 'Japan6', value: 'jap6' },
      { text: 'Japan7', value: 'jap7' },
      { text: 'Japan8', value: 'jap8' },
      { text: 'Japan9', value: 'jap9' },
      { text: 'Japan10', value: 'jap10' },
      { text: 'Japan11', value: 'jap11' },
      { text: 'Japan12', value: 'jap12' },
      { text: 'Japan13', value: 'jap13' },
      { text: 'Japan14', value: 'jap14' },
      { text: 'Japan15', value: 'jap15' },
      { text: 'Japan16', value: 'jap16' },
      { text: 'Japan17', value: 'jap17' },
      { text: 'Japan18', value: 'jap18' },
      { text: 'Japan19', value: 'jap19' },
      { text: 'Japan20', value: 'jap20' },
      { text: 'Japan21', value: 'jap21' },
      { text: 'Japan22', value: 'jap22' },
      { text: 'Japan23', value: 'jap23' },
      { text: 'Japan24', value: 'jap24' },
      { text: 'Japan25', value: 'jap25' },
      { text: 'Japan26', value: 'jap26' },
      { text: 'Japan27', value: 'jap27' },
      { text: 'United States of America', value: 'usa' },
    ]

    const data2 = new Array(100)
    for (let i = 1; i <= 100; i += 1) {
      data2[i - 1] = { text: i.toString(), value: i }
    }

    return (
      <div style={{ fontFamily: 'ProximaNova, Arial, sans-serif', color: 'gray' }}>
        <Dropdown name="d1" ref={input => { this.d1 = input }} data={this.state.d1} placeholder="Choose..." onChange={this.showValue2} />
        <br />
        <Dropdown data={data1} defaultValue="usa" onChange={this.showValue} />
        <br />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
