import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/index.css";
import App from "./App";
import { ThreeProvider } from "./context/useThreeContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThreeProvider>
      <App />
    </ThreeProvider>
  </React.StrictMode>
);
