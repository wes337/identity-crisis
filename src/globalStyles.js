import { createGlobalStyle } from "styled-components";
import styles from "./constants/styles";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "DOS";
    src: url(${process.env.PUBLIC_URL}/fonts/Fixedsys500c.eot);
    src: local("☺"), url(${process.env.PUBLIC_URL}/fonts/Fixedsys500c.woff) format("woff"),
      url(${process.env.PUBLIC_URL}/fonts/Fixedsys500c.ttf) format("truetype"),
      url(${process.env.PUBLIC_URL}/fonts/Fixedsys500c.svg) format("svg");
    font-weight: normal;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: auto;
    -moz-osx-font-smoothing: unset;
    font-family: DOS, Monaco, Menlo, Consolas, "Courier New", monospace;
    font-weight: 300;
  }

  body {
    color: ${styles.colors.gray};
    background-color: ${styles.colors.blue};
    overflow-x: hidden;
  }

  h1,
  h2,
  h3,
  h4,
  p {
    margin: 0;
  }
`;

export default GlobalStyle;
