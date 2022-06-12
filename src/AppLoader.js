import { useEffect } from "react";
import init386 from "386-animation";
import "386-animation/386.css";
import App from "./App";
import { pingServer } from "./api";
import GlobalStyle from "./globalStyles";

function AppLoader() {
  useEffect(() => {
    init386({
      speedFactor: 2.5,
    });

    pingServer();
  }, []);

  return (
    <>
      <GlobalStyle />
      <App />
    </>
  );
}

export default AppLoader;
