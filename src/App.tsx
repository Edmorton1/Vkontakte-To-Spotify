import { Routes } from 'react-router-dom';
// ДЛЯ АССИНХРОННЫХ ОПЕРАЦИЙ ИСПОЛЬЗОВАТЬ suspense
import Router from '@/router/Router';
import "./App.scss"

function App() {
  return (
    <Routes>
      {Router()}
    </Routes>
  );
}

export default App;