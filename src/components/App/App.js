import React, { Component } from 'react'

import { GlobalStyles } from '../../theme/GlobalStyles'
import { Content } from '../Content'
import { Field } from '../Field'

import { directionsCell } from '../../utils/constants'

import { initCells, moveCells, updateMergedCells } from '../../game'

export class App extends Component {
  state = {
    cells: initCells(),
    moving: false
  }

  codeDirections = {
    KeyW: directionsCell.UP,
    ArrowUp: directionsCell.UP,
    KeyS: directionsCell.DOWN,
    ArrowDown: directionsCell.DOWN,
    KeyD: directionsCell.RIGHT,
    ArrowRight: directionsCell.RIGHT,
    KeyA: directionsCell.LEFT,
    ArrowLeft: directionsCell.LEFT
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyDownHandler)
    document.addEventListener('transitionend', this.transitionendHandler)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown')
    document.removeEventListener('transitionend')
  }

  composeActions = (cells, direction) => updateMergedCells(moveCells(cells, direction))

  keyDownHandler = (event) => {
    if (
      !this.state.moving &&
      ['KeyW', 'ArrowUp', 'KeyS', 'ArrowDown', 'KeyD', 'ArrowRight', 'KeyA', 'ArrowLeft'].includes(
        event.code
      )
    ) {
      this.setState(({ cells }) => ({
        cells: this.composeActions(cells, this.codeDirections[event.code]),
        moving: true
      }))
    }
  }

  transitionendHandler = () => this.setState({ moving: false })

  newGameHandler = () => this.setState({ cells: initCells(), moving: false })

  render() {
    const { cells } = this.state

    return (
      <>
        <GlobalStyles />
        <Content>
          <h1>2048</h1>
          <button type="button" style={{ marginBottom: '20px' }} onClick={this.newGameHandler}>
            New game
          </button>
          <Field cells={cells} />
        </Content>
      </>
    )
  }
}
