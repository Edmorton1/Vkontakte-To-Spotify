import ErrorStore from "@/store/ErrorStore"
import store from "@/store/store"
import { observer } from "mobx-react-lite"
import { createPortal } from "react-dom"
import Modal from "@/components/Modal";
import { useState, useEffect, useRef } from "react";
import { FallbackProps } from "react-error-boundary";
import * as styles from "@/css/warning.module.scss"
import { reaction } from "mobx";

function ErrorCheck({children}: any) {
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

    return () => disposer(); // Очистка реакции при размонтировании
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

  // return children
}

export default observer(ErrorCheck)