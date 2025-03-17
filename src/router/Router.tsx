import { Route } from "react-router-dom";
import { LazyMidi, LazyMain } from '@/pages/index.lazy';
import Layout from './Layout';

function Router() {
  return (
    <Route path="/" element={<Layout />}>
      <Route path="/midi" element={<LazyMidi />}></Route>
      <Route index element={<LazyMain />}></Route>
    </Route>
  );
}

export default Router;
