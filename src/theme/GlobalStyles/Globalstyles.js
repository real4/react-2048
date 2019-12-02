import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after,
  html {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    color: #776e65;
    background-color: #faf8ef;
    font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;
    font-size: 18px;
  }
`
