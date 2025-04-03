import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import { BrowserRouter } from "react-router-dom";
import ErrorCheck from "@/ErrorCheck";

const domNode = document.getElementById('root');
const root = ReactDOM.createRoot(domNode);

root.render(
    <StrictMode>
        <BrowserRouter>
            {/* <ErrorBoundary FallbackComponent={Fallback}> */}
                <ErrorCheck />
                <App />
            {/* </ErrorBoundary> */}
        </BrowserRouter>
    </StrictMode>

)