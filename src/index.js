import ReactDOM from "react-dom/client";
import { StrictMode } from "react";

import App from "./App";

import "./assets/styles/reset.css"
import "./assets/styles/styles.css"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <StrictMode>
        <App />
    </StrictMode>
)