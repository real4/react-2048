import createCell from '../createCell'
import { gameSettings, statesCell } from '../../utils/constants'
import randomRange from '../../utils/randomRange'

const addCell = (cells) => {
  const occupiedCoords = new Set()

  cells.forEach((cell) => {
    if (cell.state !== statesCell.DESTROYING) {
      occupiedCoords.add(cell.x * gameSettings.gameSize + cell.y)
    }
  })

  if (occupiedCoords.size === gameSettings.gameSize ** 2) {
    return cells
  }

  let x
  let y
  const startSize = occupiedCoords.size

  do {
    x = randomRange(0, gameSettings.gameSize - 1)
    y = randomRange(0, gameSettings.gameSize - 1)

    const sum = x * gameSettings.gameSize + y

    occupiedCoords.add(sum)
  } while (startSize === occupiedCoords.size)

  const newCell = createCell(x, y, Math.floor(Math.random() * 2) === 1 ? 4 : 2)
  newCell.state = statesCell.CREATING

  return [...cells, newCell]
}

export default addCell
