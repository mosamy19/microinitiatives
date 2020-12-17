import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import AppRoutes from "./routes";

// Import react slick css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <div>
      <AppRoutes />
    </div>
  );
}

export default App;
