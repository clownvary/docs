import React from 'react'
import ReactDOM from 'react-dom'

import { Accordion } from '../src'

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Accordion transition='height 0.2s ease'>
          <Accordion.Panel title="Lil Mud Runner kids1">
            Bring the whole family for a day of fun and fitness. Let your kids
            play in the mud and tackle obstacles on the 1-mile course, or sign
            up for the family wave so everyone can get in on the action. Stick
            around after the race for more festive family fun including tube
            rides on the lake, music and refreshments.
            Bring the whole family for a day of fun and fitness. Let your kids
            play in the mud and tackle obstacles on the 1-mile course, or sign
            up for the family wave so everyone can get in on the action. Stick
            around after the race for more festive family fun including tube
            rides on the lake, music and refreshments.
          </Accordion.Panel>
          <Accordion.Panel complete active title="Lil Mud Runner kids2">
            Bring the whole family for a day of fun and fitness. Let your kids
            play in the mud and tackle obstacles on the 1-mile course, or sign
            up for the family wave so everyone can get in on the action. Stick
            around after the race for more festive family fun including tube
            rides on the lake, music and refreshments.
            Bring the whole family for a day of fun and fitness. Let
            your kids play in the mud and tackle obstacles on the 1-mile
            course, or sign up for the family wave so everyone can get in on
            the action. Stick around after the race for more festive family
            fun including tube rides on the lake, music and refreshments.
            Bring the whole family for a day of fun and fitness. Let your kids
            play in the mud and tackle obstacles on the 1-mile course, or sign
            up for the family wave so everyone can get in on the action. Stick
            around after the race for more festive family fun including tube
            rides on the lake, music and refreshments.
          </Accordion.Panel>
          <Accordion.Panel disabled title="Lil Mud Runner kids3">
            Bring the whole family for a day of fun and fitness. Let your kids
            play in the mud and tackle obstacles on the 1-mile course, or sign
            up for the family wave so everyone can get in on the action. Stick
            around after the race for more festive family fun including tube
            rides on the lake, music and refreshments.
            Bring the whole family for a day of fun and fitness.
            Let your kids play in the mud and tackle obstacles on the 1-mile
            course, or sign up for the family wave so everyone can get in on the
            action. Stick around after the race for more festive family fun
            including tube rides on the lake, music and refreshments.
          </Accordion.Panel>
          <Accordion.Panel title="Lil Mud Runner kids3">
            Bring the whole family for a day of fun and fitness.
            Let your kids play in the mud and tackle obstacles on
            the 1-mile course, or sign up for the family wave so
            everyone can get in on the action. Stick around after the race
            for more festive family fun including tube rides on the lake,
            music and refreshments.
          </Accordion.Panel>
        </Accordion>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
