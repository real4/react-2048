import { directionsCell } from './constants'

const flipMatrix = (matrix) => {
  // reverse the rows
  matrix = matrix.reverse()

  // swap the symmetric elements
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < i; j++) {
      const temp = matrix[i][j]
      matrix[i][j] = matrix[j][i]
      matrix[j][i] = temp
    }
  }
}

export const rotateMatrix = (matrix, direction, from = false) => {
  if (!from) {
    switch (direction) {
      case directionsCell.UP:
        flipMatrix(matrix)
        flipMatrix(matrix)
        flipMatrix(matrix)
        break

      case directionsCell.DOWN:
        flipMatrix(matrix)
        break

      case directionsCell.RIGHT:
        flipMatrix(matrix)
        flipMatrix(matrix)
        break

      default:
        return matrix
    }
  } else {
    switch (direction) {
      case directionsCell.UP:
        flipMatrix(matrix)
        break

      case directionsCell.DOWN:
        flipMatrix(matrix)
        flipMatrix(matrix)
        flipMatrix(matrix)
        break

      case directionsCell.RIGHT:
        flipMatrix(matrix)
        flipMatrix(matrix)
        break

      default:
        return matrix
    }
  }

  return matrix
}
