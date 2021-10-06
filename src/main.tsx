import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";

const targets = document.querySelectorAll<HTMLElement>(".bananas-bg");
targets.forEach((target) => {
  target.style.position = "relative";
  const root = document.createElement("div");
  root.style.position = "absolute";
  root.style.top = "0";
  root.style.left = "0";
  root.style.height = "100%";
  root.style.width = "100%";
  root.style.zIndex = "-2";
  target.appendChild(root);

  ReactDOM.render(
    <StrictMode>
      <App />
    </StrictMode>,
    root
  );
});
