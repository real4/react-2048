function updateCell(cells, x, y) {
  const matrix = [...cells]

  for (let step = x - 1, first = x; step >= 0; step--) {
    if (matrix[y][step] === 0) {
      matrix[y][step] = matrix[y][first]
      matrix[y][first] = 0

      first = step
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

export const moveCells = (cells) => {
  let matrix = [...cells]

  // update matrix cells
  arrayForEach(matrix, (x, y, matrix) => updateCell(matrix, x, y))

  // update cell props
  arrayForEach(matrix, (x, y) => {
    matrix[y][x].x = x
    matrix[y][x].y = y
  })

  return matrix
}
