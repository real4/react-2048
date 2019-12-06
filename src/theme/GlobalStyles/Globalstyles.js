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

  /* animations */
  @keyframes appear {
    0% {
      opacity: 0;
      transform: scale(0);
    }
    100% {
      opacity: 1;
      transform: scale(1); 
    } 
  }
  /* animation: pop 200ms ease 100ms;
  animation-fill-mode: backwards; */
  @keyframes pop {
    0% {
      transform: scale(0); 
    }
    50% {
      transform: scale(1.2); 
    }
    100% {
      transform: scale(1);
    } 
  }
`
