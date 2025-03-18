import { toJS } from "mobx";
import store from "@/store/store";
import DragDrop from "@/pages/Main/DragDrop";
import * as styles from "@/pages/Main/Data.module.scss"
import ModalStore from "@/store/ModalStore";
import Modal from "@/pages/Main/Modal";
import * as styles_tracks from "@/pages/Main/tracks.module.scss"
import burger from "@/assets/burger.png"

function Data() {
  // console.log(toJS(store.data));

  const data = toJS(store.data).map((e, i) => {
    // function countNes() {
    //   return (e.tracks.filter((as) => as.sim_event)).length
    // }
    // console.log(countNes())
    function tracks() {
      return <div className={styles_tracks.tracks}>
        <div className={styles_tracks.tracks_header}>
          <span><img src="https://cdn.worldvectorlogo.com/logos/spotify-2.svg" /></span>
          <span>Схожесть</span>
          <span><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/VK_Compact_Logo_%282021-present%29.svg/1200px-VK_Compact_Logo_%282021-present%29.svg.png" /></span>
        </div>
        {e.tracks.map((track, index) => (
          <div key={index} className={styles_tracks.track}>
            <div className={styles_tracks.twin}>
              <span>{track.spotify_name}</span>
              <span>{track.spotify_artist}</span>
            </div>
            <div className={styles_tracks.twin}>
              <span>{track.name_sim}</span>
              <span>{track.arist_sim}</span>
            </div>
            <div className={styles_tracks.twin}>
              <span>{track.vk_name}</span>
              <span>{track.vk_artist}</span>
            </div>
            <img src={burger} />
          </div>
      ))}
      </div>
    }

    return (
      <div key={i} className={styles.playlist}>
        <div className={styles.playlist_image}>{e.playlist}</div>
        <span>{`${(e.tracks.filter((as) => as.sim_event)).length} треков из ${e.tracks.length} несовпадают`}</span>
        <button onClick={() => ModalStore.open(tracks())} className={styles.playlist_button_open}>Открыть</button>
        <button onClick={() => console.log('asdasdsad')} className={styles.playlist_button}>добавить на Spotify</button>
      </div>
    )
    }
  );
  // const showPlaylist = setPlaylist(playlist)
  // console.log(toJS(store.data[playlist].tracks))
  function tracks() {
    
  }

  return (
    <main className={styles.data_main}>
      <Modal></Modal>
      {data}
      <DragDrop />
    </main>
  );
}

export default Data;
