import { useState, useEffect } from "react";
import init386 from "386-animation";
import "386-animation/386.css";
import App from "./App";
import { pingServer } from "./openAI";

function AppLoader() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    init386({
      speedFactor: 2.5,
    });

    pingServer().then((serverOnline) => {
      setReady(serverOnline);
    });
  }, []);

  return <App />;
}

export default AppLoader;
