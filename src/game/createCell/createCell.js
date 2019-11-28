import uniqid from 'uniqid'

export const createCell = (x, y, value, id) => ({
  id: id || uniqid(),
  x,
  y,
  value
})
