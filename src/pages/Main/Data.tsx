import { toJS } from "mobx";
import store from "@/store/store";
import DragDrop from "@/pages/Main/DragDrop";

function Data() {
  console.log(toJS(store.data).length);
  const data = toJS(store.data).map((e, i) => (
    <div key={i}>
      {e.playlist}
    </div>
  )
  );

  return (
    <main>
      {data}
      <DragDrop />
    </main>
  );
}

export default Data;
