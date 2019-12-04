import uniqid from 'uniqid'

import { cellStates } from '../../utils/constants'

export const createCell = (x, y, value, id) => ({
  id: id || uniqid(),
  state: cellStates.STANDING,
  x,
  y,
  value
})
