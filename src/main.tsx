import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

function main(rootId: string) {
  const rootContainer = document.getElementById(rootId);
  if (!rootContainer) {
    throw new Error(`Could not find element with id="${rootId}"`);
  } else {
    ReactDOM.createRoot(rootContainer).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
}

main("root");
