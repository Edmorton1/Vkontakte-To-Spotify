import * as styles_tracks from "@/pages/Main/tracks.module.scss"
import { trackInterface } from "@s/router/types";
import burger_img from "@/assets/burger.png"
import { useState } from "react";


interface propsInterface {
  track: trackInterface,
  index: number
}

function TrackList({track, index}: propsInterface) {
  const [burger, setBurger] = useState(-1)
  console.log(burger)
  
  return (
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
    <img src={burger_img} onMouseEnter={() => setBurger(index)} />
    {burger == index && <div className={styles_tracks.burger}>
      <button>послушать</button>
      <button>одобрить</button>
      <button>изменить</button>
      <button>удалить</button>
    </div>}
  </div>
  )
}

export default TrackList