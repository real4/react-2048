import { createCell } from '../createCell'
import { randomRange } from '../../utils/randomRange'

export const initCells = () => {
  const cells = [
    createCell(randomRange(0, 3), randomRange(0, 3), 2),
    createCell(randomRange(0, 3), randomRange(0, 3), 2)
  ]

  // cell 1 === cell 2 => cell1.x = 1 || -1
  if (cells[0].x === cells[1].x && cells[0].y === cells[1].y) {
    cells[1].x = cells[1].x === 0 ? 1 : cells[1].x - 1
  }

  return cells
}
