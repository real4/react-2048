import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { gameSettings, statesCell } from '../../utils/constants'
import { getCellProps } from '../../utils/getCellProps'

const FieldWrapper = styled.div`
  position: relative;
`

const Background = styled.div`
  display: grid;
  grid-template-columns: repeat(${gameSettings.gameSize}, ${gameSettings.cellSize}px);
  grid-template-rows: repeat(${gameSettings.gameSize}, ${gameSettings.cellSize}px);
  grid-gap: ${gameSettings.spaceBetween}px;

  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  padding: ${gameSettings.spaceBetween}px;
  border-radius: 5px;
  background-color: #776e65;
`

const BackgroundCell = styled.div`
  width: ${gameSettings.cellSize}px;
  height: ${gameSettings.cellSize}px;
  border-radius: 5px;
  background-color: rgba(238, 228, 218, 0.35);
`

const Playground = styled(Background)`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  background-color: transparent;
  user-select: none;
`

const calculateCellPos = (pos) => gameSettings.cellSize * pos + gameSettings.spaceBetween * pos

const Cell = styled(BackgroundCell)`
  position: absolute;
  width: ${gameSettings.cellSize}px;
  height: ${gameSettings.cellSize}px;
  background-color: transparent;

  ${({ killingCell, x, y, translateToX, translateToY }) => {
    const posX = calculateCellPos(x)
    const posY = calculateCellPos(y)
    const newX = translateToX !== undefined ? calculateCellPos(translateToX) : null
    const newY = translateToY !== undefined ? calculateCellPos(translateToY) : null

    if (x === translateToX && y === translateToY) {
      killingCell = false
    }

    return !killingCell
      ? `
    transform: translate(
      ${posX}px,
      ${posY}px
    );
    transition-property: transform;
    transition: 150ms;
  `
      : `
      transform: translate(
      ${newX}px,
      ${newY}px
    );
    transition-property: transform;
    transition: 150ms;
  `
  }}
`
/*

 */
const InnerCell = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  color: ${({ color }) => color};
  background-color: ${({ background }) => background};
  font-size: ${({ fontSize }) => fontSize}px;
  font-weight: bold;
  text-align: center;
  line-height: 97px;
  ${({ state }) =>
    state === statesCell.CREATING
      ? `
  animation: appear 200ms ease 100ms;
  animation-fill-mode: backwards;`
      : null}
`

const calculateFieldSize = (gameSize, cellSize, spaceBetween) =>
  cellSize * gameSize + spaceBetween * (gameSize + 1)

export const Field = ({ cells }) => {
  const fieldSize = calculateFieldSize(
    gameSettings.gameSize,
    gameSettings.cellSize,
    gameSettings.spaceBetween
  )
  const playgroundCells = []

  const backgroundCells = Array.from(new Array(gameSettings.gameSize ** 2), (_, i) => (
    <BackgroundCell key={i} />
  ))

  cells.forEach((row) =>
    row.forEach((item) => {
      if (typeof item === 'object') {
        const { color, background, fontSize } = getCellProps(item.value)

        playgroundCells.push(
          <Cell key={item.id} x={item.x} y={item.y}>
            <InnerCell state={item.state} color={color} background={background} fontSize={fontSize}>
              {item.value}
            </InnerCell>
          </Cell>
        )
      }
    })
  )

  return (
    <FieldWrapper>
      <Background size={fieldSize}>{backgroundCells}</Background>
      <Playground size={fieldSize}>{playgroundCells}</Playground>
    </FieldWrapper>
  )
}

// Field.propTypes = {
//   settings: PropTypes.shape({
//     gameSize: PropTypes.number,
//     cellSize: PropTypes.number,
//     spaceBetween: PropTypes.number
//   }),
//   cells: PropTypes.arrayOf(PropTypes.array)
// }

// Field.defaultProps = {
//   settings: {
//     gameSize: 4,
//     cellSize: 98,
//     spaceBetween: 12
//   },
//   cells: []
// }
