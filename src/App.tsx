import { Routes } from 'react-router-dom';
import Router from '@/router/Router';
import "@/css/App.scss"
import { observer } from 'mobx-react-lite';
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "@/Fallback";

function App() {
  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <Routes>
        {Router()}
      </Routes>
    </ErrorBoundary>
  );
}

export default observer(App);