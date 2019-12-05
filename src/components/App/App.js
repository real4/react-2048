import React, { Component } from 'react'

import { GlobalStyles } from '../../theme/GlobalStyles'
import { Content } from '../Content'
import { Field } from '../Field'

import { directionsCell } from '../../utils/constants'

import { initCells, moveCells, updateMergedCells } from '../../game'

export class App extends Component {
  state = {
    cells: initCells()
  }

  isAnimated = false

  isKeyPressed = false

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
    document.addEventListener('keyup', () => (this.isKeyPressed = false))
    document.addEventListener('keydown', this.keyDownHandler)
    document.addEventListener('transitionstart', () => (this.isAnimated = true))
  }

  componentWillUnmount() {
    document.removeEventListener('keyup')
    document.removeEventListener('keydown')
    document.removeEventListener('transitionstart')
  }

  composeActions = (cells) => {
    return updateMergedCells(cells)
  }

  keyDownHandler = (event) => {
    if (
      !this.isAnimated &&
      !this.isKeyPressed &&
      ['KeyW', 'ArrowUp', 'KeyS', 'ArrowDown', 'KeyD', 'ArrowRight', 'KeyA', 'ArrowLeft'].includes(
        event.code
      )
    ) {
      this.setState(({ cells }) => ({ cells: moveCells(cells, this.codeDirections[event.code]) }))

      this.startListenerTransitionend()
    }

    this.isKeyPressed = true
  }

  startListenerTransitionend = () =>
    new Promise((resolve) => {
      document.addEventListener('transitionend', () => this.transitionedHandler(resolve))
    })

  transitionedHandler = (resolve) => {
    this.isAnimated = false

    this.setState(({ cells }) => ({ cells: this.composeActions(cells) }))

    document.removeEventListener('transitionend')

    resolve()
  }

  newGameHandler = () => {
    this.isAnimated = false
    this.isKeyPressed = false
    this.setState({ cells: initCells() })
  }

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
