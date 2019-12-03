import { moveCells } from './moveCells'
import { createCell } from '../createCell'

describe('moveCells test', () => {
  it('move X left side', () => {
    const initCells = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, createCell(2, 2, 4, 'test')]
    ]

    const finalCells = [
      [0, 0, 0],
      [0, 0, 0],
      [createCell(0, 2, 4, 'test'), 0, 0]
    ]

    expect(moveCells(initCells, 'KEY_LEFT')).toEqual(finalCells)
  })
})
