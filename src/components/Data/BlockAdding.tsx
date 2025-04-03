import * as styles from "@/css/data.module.scss"
import { observer } from "mobx-react-lite"
import { useRef } from "react"
import * as styles_drop from "@/css/dragDrop.module.scss"
import { CSSTransition } from "react-transition-group"
import * as animations from "@/css/animations/animations.module.scss"

function BlockAdding({showBlock}: {showBlock: boolean}) {
  const nodeRef = useRef(null)

  return (
    <CSSTransition nodeRef={nodeRef} in={showBlock} timeout={50} unmountOnExit classNames={{
      enter: animations.enter,
      enterActive: animations.enterActive,
    }}>
      <div ref={nodeRef} style={{justifyContent: "center"}} className={`${styles_drop.block} ${styles.playlist}`}>
        Новый плейлист
      </div>
    </CSSTransition>    
  )
}

export default observer(BlockAdding)