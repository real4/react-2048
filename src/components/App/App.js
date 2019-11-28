import React from 'react'

import { GlobalStyles } from '../../UI/GlobalStyles'
import { Content } from '../../UI/Content'
import { Field } from '../../UI/Field'

import { gameSetting } from '../../utils/constants'

export const App = () => {
  const cells = [
    { id: 1, x: 0, y: 0, value: 2 },
    { id: 2, x: 1, y: 0, value: 4 },
    { id: 4, x: 2, y: 0, value: 16 },
    { id: 5, x: 3, y: 0, value: 32 },
    { id: 6, x: 0, y: 1, value: 64 },
    { id: 7, x: 1, y: 1, value: 128 },
    { id: 8, x: 2, y: 1, value: 256 },
    { id: 9, x: 3, y: 1, value: 512 },
    { id: 10, x: 0, y: 2, value: 1024 },
    { id: 11, x: 1, y: 2, value: 2048 },
    { id: 12, x: 2, y: 2, value: 4096 },
    { id: 13, x: 3, y: 2, value: 8192 },
    { id: 14, x: 0, y: 3, value: 16384 },
    { id: 15, x: 1, y: 3, value: 32768 },
    { id: 16, x: 2, y: 3, value: 65536 },
    { id: 17, x: 3, y: 3, value: 131072 }
  ]

  return (
    <>
      <GlobalStyles />
      <Content>
        <h1>2048</h1>
        <Field settings={gameSetting} cells={cells} />
      </Content>
    </>
  )
}
