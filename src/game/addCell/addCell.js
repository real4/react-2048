import { createCell } from '../createCell'
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

  cells[fields[numField].y][fields[numField].x] = createCell(
    fields[numField].x,
    fields[numField].y,
    Math.floor(Math.random() * 2) === 0 ? 2 : 4
  )

  return hasField ? cells : mat
}
