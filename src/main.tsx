import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Globals first: component stylesheets must be able to override these, and
// import order decides the cascade at equal specificity.
import "./styles/theme.css";
import "./styles/components.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);