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
  z-index: ${({ state }) => (state === statesCell.DESTROING ? 0 : 1)};
  width: ${gameSettings.cellSize}px;
  height: ${gameSettings.cellSize}px;
  background-color: transparent;

  ${({ x, y }) => `
      transform: translate(
        ${calculateCellPos(x)}px,
        ${calculateCellPos(y)}px
      );
    `};
  transition-property: transform;
  transition: 100ms;
`

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
        animation-fill-mode: backwards;
      `
      : state === statesCell.DESTROING
      ? `
          animation: pop 200ms ease 150ms;
          animation-fill-mode: backwards;
        `
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

  const backgroundCells = Array.from(new Array(gameSettings.gameSize ** 2), (_, i) => (
    <BackgroundCell key={i} />
  ))

  const playgroundCells = cells.map((cell) => {
    const { color, background, fontSize } = getCellProps(cell.value)

    return (
      <Cell key={cell.id} state={cell.state} x={cell.x} y={cell.y}>
        <InnerCell state={cell.state} color={color} background={background} fontSize={fontSize}>
          {cell.value}
        </InnerCell>
      </Cell>
    )
  })

  return (
    <FieldWrapper>
      <Background size={fieldSize}>{backgroundCells}</Background>
      <Playground size={fieldSize}>{playgroundCells}</Playground>
    </FieldWrapper>
  )
}

Field.propTypes = {
  settings: PropTypes.shape({
    gameSize: PropTypes.number,
    cellSize: PropTypes.number,
    spaceBetween: PropTypes.number
  }),
  cells: PropTypes.arrayOf(PropTypes.object)
}

Field.defaultProps = {
  settings: {
    gameSize: 4,
    cellSize: 98,
    spaceBetween: 12
  },
  cells: []
}
