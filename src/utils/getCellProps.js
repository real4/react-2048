export const getCellProps = (value) => {
  const cellColors = {
    2: '#eee4da',
    4: '#ede0c8',
    8: '#f2b179',
    16: '#f59563',
    32: '#f67c5f',
    64: '#f65e3b',
    128: '#edcf72',
    256: '#edcc61',
    512: '#edc850',
    1024: '#edc53f',
    2048: '#edc22e',
    4096: '#76d275',
    8192: '#388e3c',
    16384: '#2e7d32',
    32768: '#0097a7',
    65536: '#00838f',
    131072: '#1565c0'
  }

  const getFontSize = () => {
    switch (value) {
      case 2:
      case 4:
      case 8:
      case 16:
      case 32:
      case 64:
        return 53
      case 128:
      case 256:
      case 512:
        return 43
      case 1024:
      case 2048:
      case 4096:
      case 8192:
        return 33
      default:
        return 23
    }
  }

  return {
    color: value === 2 || value === 4 ? '#776e65' : '#f9f6f2',
    background: cellColors[value],
    fontSize: getFontSize(value)
  }
}
