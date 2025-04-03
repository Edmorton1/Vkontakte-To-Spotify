import { Route } from "react-router-dom";
import { LazyInstruction, LazyMain } from '@/router/index.lazy';
import Layout from './Layout';
// import Test from "@/router/TEST/Test";


function Router() {
  return (
    <Route path="/" element={<Layout />}>
      <Route index element={<LazyMain />}></Route>
      {/* <Route path="/test" element={<Test/>}></Route> */}
      <Route path="/instruction" element={<LazyInstruction />}></Route>
    </Route>
  );
}

export default Router;
