import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
    <header>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/VK_Compact_Logo_%282021-present%29.svg/1200px-VK_Compact_Logo_%282021-present%29.svg.png" />
        Плейлисты
      <img src="https://cdn.worldvectorlogo.com/logos/spotify-2.svg" />
    </header>
    <Outlet />
    </>

  );
}

export default observer(Layout);