import { createGlobalStyle } from 'styled-components';
import { useColourHex } from './components/app/theming/utils';

const GlobalStyles = createGlobalStyle`
  /* Box sizing reset */
  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  /* Ensure all parent elements are the full size
  of the window without any margin and padding */
  html,
  body,
  :root {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  /* General theming and defaults */
  :root {
    font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;

    color: ${(props) => useColourHex(props, 'foreground')};
    background-color: ${(props) => useColourHex(props, 'background')};

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

  /* a {
    font-weight: 500;
    color: #646cff;
    text-decoration: inherit;
  }

  a:hover {
    color: #535bf2;
  }

  h1 {
    text-align: center;
  }

  input,
  button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    color: ${(props) => useColourHex(props, 'foreground')};
    background-color: ${(props) => useColourHex(props, 'inputBackground')};
    transition: border-color 0.25s;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  }

  button {
    cursor: pointer;
  }

  button:hover {
    border-color: ${(props) => useColourHex(props, 'focusBorder')};
  }

  button:active {
    border-color: ${(props) => useColourHex(props, 'focusBorder')};
    background-color: #e8e8e8;
  }

  input,
  button {
    outline: none;
  } */
`;

export default GlobalStyles;
