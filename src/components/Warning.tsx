import TransitionShablon from "@/components/TransitionShablon"
import * as style from "@/css/warning.module.scss"
import ModalStore from "@/store/ModalStore"
import store from "@/store/store"
import { useRef } from "react"

function Warning({playlist_id}: {playlist_id: number}) {
  const nodeRef = useRef(null)

  return (
    <div className={style.wrapper} ref={nodeRef}>
      <div>Внимание!</div>
      <span>У вас есть не одобренные треки</span>
      <div>
        <button onClick={() => store.createPlaylist(playlist_id, true)}>Добавить только одобренные треки</button>
        <button onClick={() => store.createPlaylist(playlist_id, false)}>Добавить всё</button>
      </div>
    </div>
  )
}

export default Warning