import { cellStates } from '../../utils/constants'
import { addCell } from '../addCell'

export const updateMergedCells = (cells) => {
  let matrix = [...cells]
  let isMovingCells = false

  matrix = matrix.map((arr) =>
    arr.map((item) => {
      if (typeof item === 'object') {
        if (item.state === cellStates.MOVING) {
          isMovingCells = true
        }

        if (item.killingCell != null && item.state === cellStates.ENLARGE) {
          delete item.killingCell

          item.value *= 2
        }
        item.state = cellStates.STANDING
      }
      return item
    })
  )

  return isMovingCells ? addCell(matrix) : matrix
}
