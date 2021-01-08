import uniqid from 'uniqid'

import { statesCell } from '../../utils/constants'

const createCell = (x, y, value, id = uniqid()) => ({
  id,
  state: statesCell.STANDING,
  x,
  y,
  value
})

export default createCell
