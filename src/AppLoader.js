import { useEffect } from "react";
import init386 from "386-animation";
import "386-animation/386.css";
import App from "./App";
import { pingServer } from "./api";

function AppLoader() {
  useEffect(() => {
    init386({
      speedFactor: 2.5,
    });

    pingServer();
  }, []);

  return <App />;
}

export default AppLoader;
