import store from "@/store/store";
import DragDrop from "@/pages/Main/DragDrop";
import * as styles from "@/pages/Main/Data.module.scss"
import ModalStore from "@/store/ModalStore";
import Modal from "@/pages/Main/Modal";
import * as styles_tracks from "@/pages/Main/tracks.module.scss"
import TrackList from "@/pages/Main/TrackList";
import { observer } from "mobx-react-lite";
import { useState } from "react";

function Data() {
  const [modal, setModal] = useState(false)

  const data = store.data.map((e, playlist_id) => {
    // function countNes() {
    //   return (e.tracks.filter((as) => as.sim_event)).length
    // }
    // console.log(countNes())
    function tracks() {
      return <div onClick={(event) => event.stopPropagation()} className={styles_tracks.tracks}>
        {/* <button onClick={() => runInAction(() => store.data[i].tracks[0].vk_name = 'afoasdas')}>открыть даут</button>
        <button onClick={() => console.log(store.data[i].tracks[0])}>обнова</button> */}
        <div className={styles_tracks.tracks_header}>
          <span><img src="https://cdn.worldvectorlogo.com/logos/spotify-2.svg" /></span>
          <span>Схожесть</span>
          <span><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/VK_Compact_Logo_%282021-present%29.svg/1200px-VK_Compact_Logo_%282021-present%29.svg.png" /></span>
        </div>
        {e.tracks.map((track, index) => (
          <TrackList track={track} index={index} playlist={playlist_id} />
      ))}
      </div>
    }

    return (
      <div key={playlist_id} className={styles.playlist}>
        <div className={styles.playlist_image}>{e.playlist}</div>
        <span>{`${(e.tracks.filter((as) => as.sim_event)).length} треков из ${e.tracks.length} несовпадают`}</span>
        <button onClick={() => ModalStore.open(tracks())} className={styles.playlist_button_open}>Открыть</button>
        {tracks()}
        <button onClick={() => console.log('asdasdsad')} className={styles.playlist_button}>добавить на Spotify</button>
      </div>
    )
    }
  );
  // const showPlaylist = setPlaylist(playlist)

  return (
    <main className={styles.data_main}>
      <Modal></Modal>
      {data}
      <DragDrop />
    </main>
  );
}

export default observer(Data);
