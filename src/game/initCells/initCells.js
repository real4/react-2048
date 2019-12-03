import { createCell } from '../createCell'
import { randomRange } from '../../utils/randomRange'
import { gameSettings } from '../../utils/constants'

export const initCells = () => {
  const { gameSize: fieldSize } = gameSettings

  const cells = Array.from(Array(fieldSize), () => Array.from(Array(fieldSize), () => 0))

  const randomCell = () => randomRange(0, fieldSize - 1)

  const x = [randomCell(), randomCell()]
  const y = [randomCell(), randomCell()]

  if (x[0] === x[1] && y[0] === y[1]) {
    x[1] = x[1] === 0 ? 1 : x[1] - 1
  }

  cells[y[0]][x[0]] = createCell(x[0], y[0], 2)
  cells[y[1]][x[1]] = createCell(x[1], y[1], 2)

  return cells
}
