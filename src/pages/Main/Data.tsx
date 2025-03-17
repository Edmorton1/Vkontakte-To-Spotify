import { toJS } from "mobx";
import store from "@/store/store";
import DragDrop from "@/pages/Main/DragDrop";
import * as styles from "@/pages/Main/Data.module.scss"

function Data() {
  console.log(toJS(store.data));
  const data = toJS(store.data).map((e, i) => {
    // function countNes() {
    //   return (e.tracks.filter((as) => as.sim_event)).length
    // }
    // console.log(countNes())

    return (
      <div key={i} className={styles.playlist}>
        <div className={styles.playlist_image}>{e.playlist}</div>
        <span>{`${(e.tracks.filter((as) => as.sim_event)).length} треков из ${e.tracks.length} несовпадают`}</span>
        <button onClick={() => console.log(i)} className={styles.playlist_button_open}>Открыть</button>
        <button className={styles.playlist_button}>добавить на Spotify</button>
      </div>
    )
    }
  );

  return (
    <main className={styles.data_main}>
      {data}
      <DragDrop />
    </main>
  );
}

export default Data;
