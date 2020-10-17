import "regenerator-runtime/runtime";

import * as React from "react";
import { unstable_createRoot as createRoot } from "react-dom/profiling";
import App from "./App";

import styles from "./index.css";

const container = document.createElement("div");
container.className = styles.Container;
container.id = "root";

document.body.appendChild(container);

createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
