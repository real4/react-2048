import { createCell } from '../createCell'
import { randomRange } from '../../utils/randomRange'
import { gameSettings } from '../../utils/constants'

export const initCells = () => {
  const cells = Array.from(Array(gameSettings.gameSize), () =>
    Array.from(Array(gameSettings.gameSize), () => 0)
  )

  const x = [randomRange(0, 3), randomRange(0, 3)]
  const y = [randomRange(0, 3), randomRange(0, 3)]

  if (x[0] === x[1] && y[0] === y[1]) {
    x[1] = x[1] === 0 ? 1 : x[1] - 1
  }

  cells[y[0]][x[0]] = createCell(x[0], y[0], 2)
  cells[y[1]][x[1]] = createCell(x[1], y[1], 2)

  return cells
}
