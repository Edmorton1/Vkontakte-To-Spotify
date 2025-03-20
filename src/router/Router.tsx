import { Route } from "react-router-dom";
import { LazyMain } from '@/router/index.lazy';
import Layout from './Layout';

function Router() {
  return (
    <Route path="/" element={<Layout />}>
      <Route index element={<LazyMain />}></Route>
    </Route>
  );
}

export default Router;
