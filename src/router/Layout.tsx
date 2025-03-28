import ErrorStore from "@/store/ErrorStore";
import SocketStore from "@/store/SocketStore";
import store from "@/store/store";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  const [error, setError] = useState(false)

  if (error) throw new Error('jaiza')

  return (
    <>
    <header>
      <button onClick={() => setError(true)}>Выдать ошибку</button>
      <button onClick={() => SocketStore.socket.send(JSON.stringify({type: "message", data: "project x"}))}>Вывести дату на сервере</button>
      <button onClick={() => console.log(store.data)}>Вывести дату на клиенте</button>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/VK_Compact_Logo_%282021-present%29.svg/1200px-VK_Compact_Logo_%282021-present%29.svg.png" />
        Плейлисты
      <img src="https://cdn.worldvectorlogo.com/logos/spotify-2.svg" />
    </header>
    <Outlet />
    </>

  );
}

export default observer(Layout);