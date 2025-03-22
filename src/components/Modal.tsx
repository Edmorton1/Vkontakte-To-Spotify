import TransitionShablon from "@/components/TransitionShablon";
import * as styles from "@/css/modal.module.scss"
import { observer } from "mobx-react-lite";
import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

interface propsInterface {
  children: any,
  nodeRef: React.RefObject<any>,
  uslovie: any,
  setModal: React.Dispatch<React.SetStateAction<boolean>>

}

function Modal({children, nodeRef, uslovie, setModal}: propsInterface) {

  return true ? ReactDOM.createPortal(
    <TransitionShablon inside={uslovie} nodeRef={nodeRef}>
      <div ref={nodeRef} className={styles.modal} onClick={() => setModal(false)}>
        {children}
      </div>
    </TransitionShablon>,
    document.getElementById('root')
  ) : null
}

export default observer(Modal)

// export default observer(Modal)

// import TransitionShablon from "@/components/TransitionShablon";
// import * as styles from "@/css/modal.module.scss"
// import ModalStore from "@/store/ModalStore";
// import { observer } from "mobx-react-lite";
// import { useState, useEffect, useRef } from "react";
// import ReactDOM from "react-dom";

// function Modal({children, openPlaylist, playlist_id}: any) {
//   const modalRef = useRef(null)

//   return ModalStore.isOpen ? ReactDOM.createPortal(
//     <TransitionShablon inside={openPlaylist == playlist_id} nodeRef={modalRef}>
//       <div ref={modalRef} className={styles.modal} onClick={() => ModalStore.close()}>
//       {children}
//       </div>,
//     </TransitionShablon>,
//     document.getElementById('root')
//   ) : null
// }

// export default observer(Modal)