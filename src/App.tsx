import { Routes } from 'react-router-dom';
// ДЛЯ АССИНХРОННЫХ ОПЕРАЦИЙ ИСПОЛЬЗОВАТЬ suspense
import Router from '@/router/Router';
import "./App.scss"
import { observer } from 'mobx-react-lite';

function App() {
  return (
    <Routes>
      {Router()}
    </Routes>
  );
}

export default observer(App);