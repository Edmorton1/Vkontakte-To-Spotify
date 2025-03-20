import * as styles from "@/css/tracks.module.scss"
import * as stylesBurger from "@/css/burger.module.scss"
import { trackInterface } from "@s/router/types";
import burger_img from "@/assets/burger.png"
import { useState } from "react";
import store from "@/store/store";
import { observer } from "mobx-react-lite";
import * as styles_shablon from "@/css/shablon.module.scss"
import { CSSTransition, Transition } from "react-transition-group";
import * as animations from "@/css/animations.module.scss"
import { useRef } from "react";
import TransitionShablon from "@/components/TransitionShablon";
import BlockStore from "@/store/BlockStore";

interface propsInterface {
  track: trackInterface,
  index: number,
  playlist: number
}

function TrackList({track, index, playlist}: propsInterface) {
  const [burger, setBurger] = useState(-1)
  const [changeId, setChangeId] = useState(-1)
  const [value, setValue] = useState('')
  const nodeRef = useRef(null);
  // console.log(burger)
  // onClick={() => store.updateTracks(playlist, index, 'url', 'https://open.spotify.com/track/73yXCwINoNqUBJRAgPJPsY')}

  function justTrack() {
    return (
      <>
      {/* <button onClick={() => store.updateTracks(playlist, index, 'delete')}>удалить</button> */}
      <div className={styles.twin}>
        <span>{track.spotify_name}</span>
        <span>{track.spotify_artist}</span>
      </div>
      <div className={styles.twin}>
        <span>{track.name_sim != 1 ? track.name_sim : 'ㅤ'}</span>
        <span>{track.arist_sim != 1 ? track.arist_sim : 'ㅤ'}</span>
      </div>
      <div className={styles.twin}>
        <span>{track.vk_name}</span>
        <span>{track.vk_artist}</span>
      </div>
      <div onMouseEnter={() => {setBurger(index); console.log(burger)}} onMouseLeave={() => setBurger(-1)} className={stylesBurger.cross} >
        <TransitionShablon nodeRef={nodeRef} inside={burger == index}>
        <div ref={nodeRef} className={stylesBurger.burger}>
          <button>Послушать</button>
          <button>Одобрить</button>
          <button>Изменить</button>
          <button>Удалить</button>
        </div>
        </TransitionShablon>
        <span><img src={burger_img} /></span>
      </div>
      </>
    )
  }
  function changeTrack() {
    return (
      <>
      <input className={styles_shablon.input} type="text" onChange={(event) => setValue(event.target.value)} placeholder="Вставте ссылку на трек в Spotify" />
      <button className={styles_shablon.button} onClick={() => {store.updateTracks(playlist, index, 'url', value); setChangeId(-1)}}>готово</button>
      <button className={styles_shablon.buttonDelete} onClick={() => setChangeId(-1)}>отменить</button>
      </>
    )
  }
  
  if (changeId == index) {
    return (
    <div className={styles.trackChange}>
      {changeTrack()}
    </div>
    )
  }

  return (
    <div className={styles.track && track.sim_event ? styles.track_sim_event : styles.track}>
      {justTrack()}
    </div>
  )
}

export default observer(TrackList)