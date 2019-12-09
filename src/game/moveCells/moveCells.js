import { rotateMatrix } from '../../utils/rotateMatrix'
import { statesCell } from '../../utils/constants'

function updateCell(x, y, cells) {
  const matrix = [...cells]

  for (let step = x - 1, current = x; step >= 0; step--) {
    if (matrix[y][step] === 0 && matrix[y][step].state !== statesCell.DESTROING) {
      matrix[y][step] = matrix[y][current]
      matrix[y][step].state = statesCell.MOVING
      matrix[y][current] = 0

      current = step
    } else if (
      matrix[y][step].value === matrix[y][current].value &&
      (matrix[y][step].state === statesCell.STANDING ||
        matrix[y][step].state === statesCell.MOVING ||
        matrix[y][step].state === statesCell.CREATING)
    ) {
      matrix[y][step].state = statesCell.DESTROING
      matrix[y][step].prevX = matrix[y][step].x
      matrix[y][step].prevY = matrix[y][step].y
      matrix[y][step] = {
        ...matrix[y][current],
        killingCell: matrix[y][step]
      }

      matrix[y][step].state = statesCell.ENLARGE
      matrix[y][current] = 0

      current = step
    } else {
      break
    }
  }

  return matrix
}

// func have side effects for array
function arrayForEach(matrix, func) {
  matrix.forEach((row, y) =>
    row.forEach((item, x) => {
      if (item !== 0) {
        matrix = func(x, y, matrix)
      }
    })
  )
}

export const moveCells = (cells, direction) => {
  let matrix = [...cells]
  matrix = rotateMatrix(matrix, direction)

  // update matrix cells
  arrayForEach(matrix, updateCell)

  matrix = rotateMatrix(matrix, direction, true)

  // update cell props
  arrayForEach(matrix, (x, y) => {
    matrix[y][x].x = x
    matrix[y][x].y = y
  })

  return matrix
}
