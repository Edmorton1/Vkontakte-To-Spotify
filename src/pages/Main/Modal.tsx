import * as styles from "@/pages/Main/Modal.module.scss"
import ModalStore from "@/store/ModalStore";
import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function Modal() {
  console.log(ModalStore.content)
  return ModalStore.content ? ReactDOM.createPortal(
    <div className={styles.modal} onClick={() => ModalStore.close()}>
      {ModalStore.content}
    </div>,
    document.getElementById('root')
  ) : null
}

export default observer(Modal)