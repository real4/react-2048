import React, { Component } from 'react'

import { GlobalStyles } from '../../UI/GlobalStyles'
import { Content } from '../../UI/Content'
import { Field } from '../../UI/Field'

import { gameSettings } from '../../utils/constants'

import { initCells } from '../../game/initCells'

export class App extends Component {
  state = {
    cells: initCells()
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
