import { cellStates } from '../../utils/constants'

export const updateMergedCells = (cells) => {
  const matrix = [...cells]

  return matrix.map((arr) =>
    arr.map((item) => {
      if (item.killingCell != null && item.state === cellStates.ENLARGE) {
        delete item.killingCell
        item.state = cellStates.STANDING
        item.value *= 2
      }

      return item
    })
  )
}
