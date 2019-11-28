import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Main = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  padding: 20px 0;
`

const Layout = styled.div`
  justify-self: center;
  align-self: center;
`

export const Content = ({ children }) => (
  <Main>
    <Layout>{children}</Layout>
  </Main>
)

Content.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string
  ]).isRequired
}
