import React, { Component } from 'react'

import { GlobalStyles } from '../../theme/GlobalStyles'
import { Content } from '../Content'
import { Field } from '../Field'

import { directionsCell } from '../../utils/constants'

import { initCells, moveCells, updateMergedCells } from '../../game'

const waitAnimation = (time) => new Promise((resolve) => setTimeout(resolve, time))

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
    document.addEventListener('keyup', this.keyUpHandler)
    document.addEventListener('keydown', this.keyDownHandler)
    document.addEventListener('transitionend', this.transitionendHandler)
    document.addEventListener('transitionstart', this.transitionstartHandler)
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.keyUpHandler)
    document.removeEventListener('keydown', this.keyDownHandler)
    document.removeEventListener('transitionstart', this.transitionstartHandler)
    document.removeEventListener('transitionend', this.transitionendHandler)
  }

  keyDownHandler = async (event) => {
    if (
      !this.isAnimated &&
      !this.isKeyPressed &&
      ['KeyW', 'ArrowUp', 'KeyS', 'ArrowDown', 'KeyD', 'ArrowRight', 'KeyA', 'ArrowLeft'].includes(
        event.code
      )
    ) {
      this.isKeyPressed = true

      // this.setState(({ cells }) => ({
      //   cells: moveCells(cells, this.codeDirections[event.code])
      // }))

      // await waitAnimation(200)

      // this.setState(({ cells }) => ({
      //   cells: updateMergedCells(cells)
      // }))
    }
  }

  keyUpHandler = () => (this.isKeyPressed = false)

  transitionstartHandler = () => (this.isAnimated = true)

  transitionendHandler = () => (this.isAnimated = false)

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
