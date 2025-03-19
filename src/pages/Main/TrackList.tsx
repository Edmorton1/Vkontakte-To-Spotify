import * as styles_tracks from "@/pages/Main/tracks.module.scss"
import { trackInterface } from "@s/router/types";
import burger_img from "@/assets/burger.png"
import { useState } from "react";
import { redirect } from "react-router-dom";
import store from "@/store/store";
import { observer } from "mobx-react-lite";
import { runInAction } from "mobx";

interface propsInterface {
  track: trackInterface,
  index: number,
  playlist: number
}

function TrackList({track, index, playlist}: propsInterface) {
  const [burger, setBurger] = useState(-1)
  // console.log(burger)
  
  return (
    <div key={index} className={styles_tracks.track}>
      <button onClick={() => store.updateTracks(playlist, index, 'delete')}>удалить</button>
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
      {/* <div onMouseEnter={() => {setBurger(index); console.log(burger)}} onMouseLeave={() => setBurger(-1)} className={styles_tracks.cross} >
        {burger == index && <div className={styles_tracks.burger}>
          <button onClick={() => window.open(track.url)}>послушать</button>
          <button onClick={() => store.updateTracks(playlist, index, 'url', 'https://open.spotify.com/track/73yXCwINoNqUBJRAgPJPsY')}>одобрить</button>
          <button>изменить</button>
          <button onClick={() => store.updateTracks(playlist, index, 'delete')}>удалить</button>
        </div>}
        <span><img src={burger_img} /></span>
      </div> */}
    </div>
  )
}

export default observer(TrackList)