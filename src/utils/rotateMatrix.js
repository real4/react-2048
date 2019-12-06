import { rotateMatrix as flipMatrix } from 'rotate-matrix'

import { directionsCell } from './constants'

export const rotateMatrix = (matrix, direction, from = false) => {
  let newMatrix = [...matrix]

  if (!from) {
    switch (direction) {
      case directionsCell.UP:
        newMatrix = flipMatrix(newMatrix, 3)
        break

      case directionsCell.DOWN:
        newMatrix = flipMatrix(newMatrix)
        break

      case directionsCell.RIGHT:
        newMatrix = flipMatrix(newMatrix, 2)
        break

      default:
        return matrix
    }
  } else {
    switch (direction) {
      case directionsCell.UP:
        newMatrix = flipMatrix(newMatrix)
        break

      case directionsCell.DOWN:
        newMatrix = flipMatrix(newMatrix, 3)
        break

      case directionsCell.RIGHT:
        newMatrix = flipMatrix(newMatrix, 2)
        break

      default:
        return newMatrix
    }
  }

  return newMatrix
}
