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

  it('move X right side', () => {
    const initCells = [
      [0, 0, 0],
      [0, 0, 0],
      [createCell(0, 2, 4, 'test2'), 0, 0]
    ]

    const finalCells = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, createCell(2, 2, 4, 'test2')]
    ]

    expect(moveCells(initCells, 'KEY_RIGHT')).toEqual(finalCells)
  })

  it('move Y top side', () => {
    const initCells = [
      [0, 0, 0],
      [0, 0, 0],
      [0, createCell(1, 2, 4, 'test3'), 0]
    ]

    const finalCells = [
      [0, createCell(1, 0, 4, 'test3'), 0],
      [0, 0, 0],
      [0, 0, 0]
    ]

    expect(moveCells(initCells, 'KEY_UP')).toEqual(finalCells)
  })

  it('move Y bottom side', () => {
    const initCells = [
      [createCell(0, 0, 4, 'test3'), 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]

    const finalCells = [
      [0, 0, 0],
      [0, 0, 0],
      [createCell(0, 2, 4, 'test3'), 0, 0]
    ]

    expect(moveCells(initCells, 'KEY_DOWN')).toEqual(finalCells)
  })
})
