import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import CakesPage from "./CakesPage";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CakesPage />
  </StrictMode>
);
