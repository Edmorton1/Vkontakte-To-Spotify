import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import { BrowserRouter } from "react-router-dom";
import ErrorCheck from "@/ErrorCheck";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "@/Fallback";

const domNode = document.getElementById('root');
const root = ReactDOM.createRoot(domNode);

root.render(
    <StrictMode>
        <BrowserRouter>
            <ErrorCheck />
            <App />
        </BrowserRouter>
    </StrictMode>

)