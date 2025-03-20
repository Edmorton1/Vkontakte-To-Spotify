import * as styles from "@/css/modal.module.scss"
import ModalStore from "@/store/ModalStore";
import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function Modal({children}: any) {
  return ModalStore.isOpen ? ReactDOM.createPortal(
    <div className={styles.modal} onClick={() => ModalStore.close()}>
      {children}
    </div>,
    document.getElementById('root')
  ) : null
}

export default observer(Modal)