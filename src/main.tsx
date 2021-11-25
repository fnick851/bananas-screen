import { StrictMode } from "react";
import { render } from "react-dom";
import App from "./App";

const root = document.createElement("div");
root.className = "root";
root.style.position = "fixed";
root.style.top = "0px";
root.style.left = "0px";
root.style.height = "100vh";
root.style.width = "100vw";
root.style.zIndex = "-2";
document.body.appendChild(root);

render(
  <StrictMode>
    <App />
  </StrictMode>,
  root
);
