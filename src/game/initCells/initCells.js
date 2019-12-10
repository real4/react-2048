import { createCell } from '../createCell'
import { gameSettings } from '../../utils/constants'
import { randomRange } from '../../utils/randomRange'

export const initCells = () => {
  const randomCell = () => randomRange(0, gameSettings.gameSize - 1)

  const x = [randomCell(), randomCell()]
  const y = [randomCell(), randomCell()]

  if (x[0] === x[1] && y[0] === y[1]) {
    x[1] = x[1] === 0 ? 1 : x[1] - 1
  }

  // return [createCell(x[0], y[0], 2), createCell(x[1], y[1], 2)]
  return [
    { id: 'test1', x: 0, y: 0, value: 2, state: 'CELL_STANDING' },
    { id: 'test2', x: 3, y: 0, value: 2, state: 'CELL_STANDING' },
    { id: 'test3', x: 0, y: 2, value: 2, state: 'CELL_STANDING' },
    { id: 'test4', x: 3, y: 2, value: 2, state: 'CELL_STANDING' }
  ]
}
