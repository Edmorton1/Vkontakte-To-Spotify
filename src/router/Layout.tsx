// import ErrorStore from "@/store/ErrorStore";
import ErrorStore from "@/store/ErrorStore";
import store from "@/store/store";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
    <header>
      <button onClick={() => ErrorStore.setError(new Error('asd'))}>Выдать ошибку</button>
      <button onClick={() => console.log(toJS(store.data))}>Показать дату</button>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/VK_Compact_Logo_%282021-present%29.svg/1200px-VK_Compact_Logo_%282021-present%29.svg.png" />
        Плейлисты
      <img src="https://cdn.worldvectorlogo.com/logos/spotify-2.svg" />
    </header>
    <Outlet />
    </>

  );
}

export default observer(Layout);