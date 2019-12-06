import uniqid from 'uniqid'

import { statesCell } from '../../utils/constants'

export const createCell = (x, y, value, id = uniqid()) => ({
  id,
  state: statesCell.STANDING,
  x,
  y,
  value
})
