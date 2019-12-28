export const gameSettings = {
  gameSize: 4,
  cellSize: 98,
  spaceBetween: 12
}

export const directionsCell = {
  UP: 'KEY_UP',
  DOWN: 'KEY_DOWN',
  LEFT: 'KEY_LEFT',
  RIGHT: 'KEY_RIGHT'
}

export const codeKeys = new Set([
  'KeyW',
  'KeyS',
  'KeyD',
  'KeyA',
  'ArrowUp',
  'ArrowDown',
  'ArrowRight',
  'ArrowLeft'
])

export const statesCell = {
  CREATING: 'CELL_CREATING',
  STANDING: 'CELL_STANDING',
  MOVING: 'CELL_MOVING',
  ENLARGE: 'CELL_ENLARGE',
  DESTROING: 'CELL_DESTROING'
}
