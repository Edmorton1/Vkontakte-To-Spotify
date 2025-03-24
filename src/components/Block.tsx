import { createPortal } from "react-dom"
import * as styles from "@/css/data.module.scss"
import { observer } from "mobx-react-lite"
import Loading from "@/components/Loading"
import TransitionShablon from "@/components/TransitionShablon"
import { useRef } from "react"
import * as styles_drop from "@/css/dragDrop.module.scss"
import store from "@/store/store"

function Block({index}: {index: number}) {
  const nodeRef = useRef(null)

  return (
    <TransitionShablon nodeRef={nodeRef} inside={store.loadFiles > 0} >
      <div ref={nodeRef} style={{justifyContent: "center"}} className={`${styles_drop.block} ${styles.playlistContainer}`}>
        <Loading />
        {index == 0 && <progress value={store.loadProgress} />}
      </div>
    </TransitionShablon>
  )
}

export default observer(Block)