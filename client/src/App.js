import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import ReactGA from "react-ga";

import AppRoutes from "./routes";

// Import react slick css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    ReactGA.initialize("G-LK6FQCEZTE");
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  return (
    <div>
      <AppRoutes />
    </div>
  );
}

export default App;
