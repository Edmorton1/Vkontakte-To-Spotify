import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import { BrowserRouter } from "react-router-dom";
import ErrorCheck from "@/ErrorCheck";

const domNode = document.getElementById('root');
const root = ReactDOM.createRoot(domNode);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ErrorCheck />
            <App />
        </BrowserRouter>
    </React.StrictMode>

)