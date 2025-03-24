import { createPortal } from "react-dom"
import * as styles from "@/css/data.module.scss"
import { observer } from "mobx-react-lite"
import Loading from "@/components/Loading"
import Progress from "@/components/Progress"
import TransitionShablon from "@/components/TransitionShablon"
import { useRef } from "react"
import * as styles_drop from "@/css/dragDrop.module.scss"
import store from "@/store/store"

function BlockAdding({showBlock}: {showBlock: boolean}) {
  const nodeRef = useRef(null)

  return (
    <TransitionShablon nodeRef={nodeRef} inside={showBlock} >
      <div ref={nodeRef} style={{justifyContent: "center"}} className={`${styles_drop.block} ${styles.playlistContainer}`}>
        Новый плейлист
      </div>
    </TransitionShablon>
  )
}

export default observer(BlockAdding)