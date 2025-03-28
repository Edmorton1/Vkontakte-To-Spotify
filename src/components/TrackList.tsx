import * as styles from "@/css/tracks.module.scss"
import * as stylesBurger from "@/css/burger.module.scss"
import { trackInterface } from "@s/router/types";
import burger_img from "@/assets/burger.png"
import { useState } from "react";
import store from "@/store/store";
import { observer } from "mobx-react-lite";
import * as styles_shablon from "@/css/shablon.module.scss"
import { CSSTransition, Transition } from "react-transition-group";
import { useRef } from "react";
import * as animations from "@/css/animations/burgerAnimation.module.scss"

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

  function justTrack() {
    return (
      <>
      <div className={styles.tracks__track__twin}>
        <span>{track.spotify_name}</span>
        <span>{track.spotify_artist}</span>
      </div>
      <div className={styles.tracks__track__twin}>
        <span>{track.name_sim != 1 ? track.name_sim : 'ㅤ'}</span>
        <span>{track.arist_sim != 1 ? track.arist_sim : 'ㅤ'}</span>
      </div>
      <div className={styles.tracks__track__twin}>
        <span>{track.vk_name}</span>
        <span>{track.vk_artist}</span>
      </div>
      <div onMouseEnter={() => {setBurger(index); console.log(burger)}} onMouseLeave={() => setBurger(-1)} className={stylesBurger.burger__cross} >
        <CSSTransition nodeRef={nodeRef} in={burger == index} timeout={500} unmountOnExit classNames={{
          enter: animations.enter,
          enterActive: animations.enterActive,
          exit: animations.exit,
          exitActive: animations.exitActive
        }}>
        <div ref={nodeRef} className={stylesBurger.burger}>
          <button onClick={() => window.open(track.url)}>Послушать</button>
          <button onClick={() => {store.updateTracks(playlist, index, 'sim_event'); setBurger(-1)}}>Одобрить</button>
          <button onClick={() => setChangeId(index)}>Изменить</button>
          <button onClick={() => {store.updateTracks(playlist, index, 'delete'); setBurger(-1)}}>Удалить</button>
        </div>
        </CSSTransition>
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
    <div className={styles.tracks__track__change}>
      {changeTrack()}
    </div>
    )
  }

  return (
    <div className={styles.tracks__track && track.sim_event ? styles.tracks__track__sim_event : styles.tracks__track}>
      {justTrack()}
    </div>
  )
}

export default observer(TrackList)