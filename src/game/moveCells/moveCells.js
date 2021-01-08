import rotateMatrix from '../../utils/rotateMatrix'
import { statesCell, gameSettings } from '../../utils/constants'

function updateCell(x, y, cells) {
  const matrix = [...cells]

  for (let step = x - 1, current = x; step >= 0; step--) {
    if (matrix[y][step] === 0 && matrix[y][step].state !== statesCell.DESTROYING) {
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
      matrix[y][step].state = statesCell.DESTROYING
      matrix[y][step].killingBy = matrix[y][current].id
      matrix[y][step] = matrix[y][current]

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

const moveCells = (cells, direction) => {
  let cloneCells = [...cells]

  // create matrix with cells
  let matrix = Array.from(new Array(gameSettings.gameSize), () =>
    Array.from(new Array(gameSettings.gameSize), () => 0)
  )

  // destroy old cells
  cloneCells = cloneCells.filter((cell) => cell.state !== statesCell.DESTROYING)

  // push cells in matrix
  cloneCells.forEach((cell) => (matrix[cell.y][cell.x] = cell))

  // rotate matrix to left x move, like direction
  matrix = rotateMatrix(matrix, direction)

  // update matrix cells, move left logic
  arrayForEach(matrix, updateCell)

  // rotate back to default
  matrix = rotateMatrix(matrix, direction, true)

  // update cell props
  arrayForEach(matrix, (x, y) => {
    matrix[y][x].x = x
    matrix[y][x].y = y
  })

  // update destroying cell position
  cloneCells.forEach((cell) => {
    if (cell.state === statesCell.DESTROYING) {
      const killerCell = cloneCells.filter((cl) => cl.id === cell.killingBy)

      cell.x = killerCell[0].x
      cell.y = killerCell[0].y
    }
  })

  return cloneCells
}

export default moveCells
