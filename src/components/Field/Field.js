import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { gameSettings } from '../../utils/constants'

import { getCellProps } from '../../utils/getCellProps'

const FieldWrapper = styled.div`
  position: relative;
`

const Background = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ gameSize }) => gameSize}, ${({ cellSize }) => cellSize}px);
  grid-template-rows: repeat(${({ gameSize }) => gameSize}, ${({ cellSize }) => cellSize}px);
  grid-gap: ${({ spaceBetween }) => spaceBetween}px;

  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  padding: ${({ spaceBetween }) => spaceBetween}px;
  border-radius: 5px;
  background-color: #776e65;
`

const BackgroundCell = styled.div`
  height: ${({ cellSize }) => cellSize}px;
  width: ${({ cellSize }) => cellSize}px;
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

const Cell = styled(BackgroundCell)`
  /* grid-row-start: ${({ y }) => y + 1};
  grid-column-start: ${({ x }) => x + 1}; */
  position: absolute;
  padding-top: ${({ cellSize, fontSize }) => cellSize / 2 - fontSize / 1.6}px;
  color: ${({ color }) => color};
  background-color: ${({ background }) => background};
  font-size: ${({ fontSize }) => fontSize}px;
  font-weight: bold;
  text-align: center;
  transform: translate(
    ${({ x, cellSize, spaceBetween }) => cellSize * x + spaceBetween * x}px, 
    ${({ y, cellSize, spaceBetween }) => cellSize * y + spaceBetween * y}px
  );
`

const calculateFieldSize = (gameSize, cellSize, spaceBetween) =>
  cellSize * gameSize + spaceBetween * (gameSize + 1)

export const Field = ({ cells }) => {
  const { gameSize, cellSize, spaceBetween } = gameSettings
  const fieldSize = calculateFieldSize(gameSize, cellSize, spaceBetween)
  const playgroundCells = []

  const backgroundCells = Array.from(new Array(gameSettings.gameSize ** 2), (_, i) => (
    <BackgroundCell key={i} cellSize={cellSize} />
  ))

  cells.forEach((row) =>
    row.forEach((item) => {
      if (typeof item === 'object') {
        const { color, background, fontSize } = getCellProps(item.value)

        playgroundCells.push(
          <Cell
            key={item.id}
            x={item.x}
            y={item.y}
            cellSize={cellSize}
            spaceBetween={spaceBetween}
            color={color}
            background={background}
            fontSize={fontSize}
          >
            {item.value}
          </Cell>
        )
      }
    })
  )

  return (
    <FieldWrapper>
      <Background
        size={fieldSize}
        gameSize={gameSize}
        cellSize={cellSize}
        spaceBetween={spaceBetween}
      >
        {backgroundCells}
      </Background>
      <Playground
        size={fieldSize}
        gameSize={gameSize}
        cellSize={cellSize}
        spaceBetween={spaceBetween}
      >
        {playgroundCells}
      </Playground>
    </FieldWrapper>
  )
}

Field.propTypes = {
  settings: PropTypes.shape({
    gameSize: PropTypes.number,
    cellSize: PropTypes.number,
    spaceBetween: PropTypes.number
  }),
  cells: PropTypes.arrayOf(PropTypes.array)
}

Field.defaultProps = {
  settings: {
    gameSize: 4,
    cellSize: 98,
    spaceBetween: 12
  },
  cells: []
}
