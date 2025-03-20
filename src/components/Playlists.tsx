import store from "@/store/store";
import DragDrop from "@/components/DragDrop";
import * as styles from "@/css/data.module.scss"
import ModalStore from "@/store/ModalStore";
import Modal from "@/components/Modal";
import * as styles_tracks from "@/css/tracks.module.scss"
import TrackList from "@/components/TrackList";
import { observer } from "mobx-react-lite";
import { useRef, useState } from "react";
import Block from "@/components/Block";
import BlockStore from "@/store/BlockStore";
import * as styles_drop from "@/css/dragDrop.module.scss"
import loader from "@/assets/loader.png"
import TransitionShablon from "@/components/TransitionShablon";

function Playlists() {
  const [openPlaylist, setOpenPlaylist] = useState(0)
  const playlistRef = useRef(null)

  return store.data.map((e, playlist_id) => {
    // function countNes() {
    //   return (e.tracks.filter((as) => as.sim_event)).length
    // }
    // console.log(countNes())
    function tracks(playlist: number) {
      return <div onClick={(event) => event.stopPropagation()} className={styles_tracks.tracks}>
        {/* <button onClick={() => runInAction(() => store.data[i].tracks[0].vk_name = 'afoasdas')}>открыть даут</button>
        <button onClick={() => console.log(store.data[i].tracks[0])}>обнова</button> */}
        <div className={styles_tracks.tracksHeader}>
          <span><img src="https://cdn.worldvectorlogo.com/logos/spotify-2.svg" /></span>
          <span>Схожесть</span>
          <span><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/VK_Compact_Logo_%282021-present%29.svg/1200px-VK_Compact_Logo_%282021-present%29.svg.png" /></span>
        </div>
        {store.data[playlist].tracks.map((track, index) => (
          <TrackList key={index} track={track} index={index} playlist={playlist_id} />
      ))}
      </div>
    }

    return (
        <div ref={playlistRef} key={playlist_id} className={styles.playlistContainer}>
          <div className={styles.playlistCover}>{e.playlist}</div>
          <span>{`${(e.tracks.filter((sim) => sim.sim_event)).length} треков из ${e.tracks.length} несовпадают`}</span>
          <button onClick={() => {ModalStore.open(); setOpenPlaylist(playlist_id)}} className={styles.button_open}>Открыть</button>
          {openPlaylist == playlist_id &&<Modal>{tracks(playlist_id)}</Modal>}
          <button onClick={() => console.log('asdasdsad')} className={styles.button}>добавить на Spotify</button>
        </div>
    )
  });
}

export default Playlists