import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import uniqid from 'uniqid'

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
  border-radius: 5px;
  background-color: rgba(238, 228, 218, 0.35);
`

const Playground = styled(Background)`
  position: absolute;
  top: 0;
  left: 0;
  background-color: transparent;
  user-select: none;
`

const Cell = styled(BackgroundCell)`
  grid-row-start: ${({ y }) => y + 1};
  grid-column-start: ${({ x }) => x + 1};
  width: ${({ cellSize }) => cellSize}px;
  height: ${({ cellSize }) => cellSize}px;
  padding-top: ${({ cellSize, fontSize }) => cellSize / 2 - fontSize / 1.6}px;
  color: ${({ color }) => color};
  background-color: ${({ background }) => background};
  font-size: ${({ fontSize }) => fontSize}px;
  font-weight: bold;
  text-align: center;
`

const calculateFieldSize = (gameSize, cellSize, spaceBetween) =>
  cellSize * gameSize + spaceBetween * (gameSize + 1)

export const Field = ({ settings, cells }) => {
  const { gameSize, cellSize, spaceBetween } = settings
  const fieldSize = calculateFieldSize(gameSize, cellSize, spaceBetween)
  const playgroundCells = []

  const backgroundCells = cells.map((row) =>
    row.map((item) => {
      if (typeof item === 'object') {
        const { color, background, fontSize } = getCellProps(item.value)

        playgroundCells.push(
          <Cell
            key={item.id}
            x={item.x}
            y={item.y}
            cellSize={cellSize}
            color={color}
            background={background}
            fontSize={fontSize}
          >
            {item.value}
          </Cell>
        )
      }

      return <BackgroundCell key={uniqid()} />
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
