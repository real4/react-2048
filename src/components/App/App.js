import React, { Component } from 'react'

import { GlobalStyles } from '../../theme/GlobalStyles'
import { Content } from '../Content'
import { Field } from '../Field'

import { gameSettings, directionsCell } from '../../utils/constants'

import { initCells } from '../../game/initCells'

export class App extends Component {
  state = {
    cells: initCells()
  }

  codeDirections = {
    ['KeyW' || 'ArrowUp']: directionsCell.UP,
    ['KeyS' || 'ArrowDown']: directionsCell.DOWN,
    ['KeyD' || 'ArrowRight']: directionsCell.RIGHT,
    ['KeyA' || 'ArrowLeft']: directionsCell.LEFT
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyDownHandler)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown')
  }

  keyDownHandler = (event) => {
    if (
      ['KeyW', 'ArrowUp', 'KeyS', 'ArrowDown', 'KeyD', 'ArrowRight', 'KeyA', 'ArrowLeft'].includes(
        event.code
      )
    ) {
      console.log('CODE:', event.code)
    }
  }

  render() {
    const { cells } = this.state

    return (
      <>
        <GlobalStyles />
        <Content>
          <h1>2048</h1>
          <Field settings={gameSettings} cells={cells} />
        </Content>
      </>
    )
  }
}
