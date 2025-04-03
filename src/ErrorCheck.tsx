import ErrorStore from "@/store/ErrorStore"
import { observer } from "mobx-react-lite"
import { createPortal } from "react-dom"
import Modal from "@/components/Modal";
import { useState, useEffect, useRef } from "react";
import * as styles from "@/css/warning.module.scss"
import { reaction } from "mobx";

function ErrorCheck() {
  const nodeRef = useRef(null)
  // ModalStore.open()
  const [modal, setModal] = useState(false)

  useEffect(() => {
    const disposer = reaction(
      () => ErrorStore.error,
      (error) => {
        if (error) {
          setModal(true);
        }
      }
    );

    return () => disposer();
  }, []);

  if (ErrorStore.error) {
    return createPortal(
    <Modal nodeRef={nodeRef} uslovie={modal} setModal={setModal}>
      <div className={styles.wrapper} ref={nodeRef}>
        <div>Ошибка!</div>
        <span>{ErrorStore.error.message}</span>
        <div>
          <button onClick={() => {ErrorStore.removeError()}}>Закрыть</button>
        </div>
      </div>
    </Modal>, document.getElementById("root")
    )
  }
}

export default observer(ErrorCheck)