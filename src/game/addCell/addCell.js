import { createCell } from '../createCell'
import { statesCell } from '../../utils/constants'
import { randomRange } from '../../utils/randomRange'

export const addCell = (mat) => {
  const cells = [...mat]
  const fields = []
  let hasField = false

  cells.forEach((row, y) =>
    row.forEach((cell, x) => {
      if (cell === 0) {
        fields.push({ x, y })

        hasField = true
      }
    })
  )

  const numField = randomRange(0, fields.length - 1)
  const x = fields[numField].y
  const y = fields[numField].x
  const value = Math.floor(Math.random() * 2) === 0 ? 2 : 4

  cells[x][y] = createCell(y, x, value)
  cells[x][y].state = statesCell.CREATING

  return hasField ? cells : mat
}
