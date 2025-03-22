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
import * as styles_drop from "@/css/dragDrop.module.scss"
import loader from "@/assets/loader.png"
import TransitionShablon from "@/components/TransitionShablon";
import { CSSTransition, TransitionGroup } from "react-transition-group"
import * as animations from "@/css/animations/animations.module.scss"
import Warning from "@/components/Warning";
import Loading from "@/components/Loading";
// import * as cross from "@/assets/cross.png"

function Playlists() {
  const [openPlaylist, setOpenPlaylist] = useState<number | string>(0)
  const playlistRef = useRef(null)
  const modalRef = useRef(null)
  const [asd, setAsd] = useState(-1)

  const renderPlaylists = () => store.data.map((e, playlist_id) => {
    // function countNes() {
    //   return (e.tracks.filter((as) => as.sim_event)).length
    // }
    // console.log(countNes())
    const sim = e.tracks.filter((sim) => sim.sim_event).length
    const is_published = store.data[playlist_id].is_published

    function tracks(playlist: number) {
      return <div ref={modalRef} onClick={(event) => event.stopPropagation()} className={styles_tracks.tracks}>
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
      <CSSTransition key={playlist_id} timeout={300} nodeRef={playlistRef} classNames={{
        enter: animations.enter,
        enterActive: animations.enterActive,
        exit: animations.exit,
        exitActive: animations.exitActive
      }}>
        <div ref={playlistRef} className={styles.playlistContainer}>
          <div className={styles.playlistCover}>{e.playlist}</div>
          <span>{sim > 0 ? `${sim} треков из ${e.tracks.length} несовпадают` : 'ㅤ'}</span>
          <button onClick={() => {ModalStore.open(); setOpenPlaylist(playlist_id)}} className={styles.button_open} disabled={is_published || store.isLoadCreate.includes(playlist_id)}>Открыть</button>
          {/* {openPlaylist == playlist_id &&
            <Modal openPlaylist={openPlaylist} playlist_id={playlist_id} >{tracks(playlist_id)}</Modal>
          } */}
              <Modal nodeRef={modalRef} uslovie={openPlaylist == playlist_id && ModalStore.isOpen}>{tracks(playlist_id)}</Modal>
          {/* <button onClick={() => {ModalStore.open(); setOpenPlaylist(`spotify-${playlist_id}`)}} className={styles.button}>добавить на Spotify</button> */}
          {/* store.createPlaylist(playlist_id) */}
          {is_published ? 
            <div className={styles.added}>
              <button disabled className={styles.button}>Добавлено</button>
              <button className={styles.button} onClick={() => store.removePlaylist(playlist_id)}>Вернуть</button>
            </div> : 
            <button onClick={() => {
              if (sim) {
                setOpenPlaylist(`spotify-${playlist_id}`); ModalStore.open()
              } else {store.createPlaylist(playlist_id)}
            }} className={styles.button} disabled={store.isLoadCreate.includes(playlist_id)} >{store.isLoadCreate.includes(playlist_id) ? <Loading /> : `Добавить на Spotify`}</button>
          }
            <Modal nodeRef={modalRef} uslovie={openPlaylist == `spotify-${playlist_id}` && ModalStore.isOpen}>
              <Warning playlist_id={playlist_id}/>
            </Modal>
        </div>
      </CSSTransition>
    )
  });

  return (
    <TransitionGroup component={null}>
      {renderPlaylists()}
    </TransitionGroup>
  )
}

export default observer(Playlists)