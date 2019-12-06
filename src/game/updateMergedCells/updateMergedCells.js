import { statesCell } from '../../utils/constants'
import { addCell } from '../addCell'

export const updateMergedCells = (cells) => {
  let matrix = [...cells]
  let isMovingCells = false

  matrix = matrix.map((arr) =>
    arr.map((item) => {
      if (typeof item === 'object') {
        if (item.state === statesCell.MOVING || item.state === statesCell.ENLARGE) {
          isMovingCells = true
        }

        if (item.killingCell != null && item.state === statesCell.ENLARGE) {
          delete item.killingCell

          item.value *= 2
        }
        item.state = statesCell.STANDING
      }
      return item
    })
  )

  return isMovingCells ? addCell(matrix) : matrix
}
