import * as styles from "@/pages/Main/Modal.module.scss"
import ReactDOM from "react-dom";

interface props {
  setModal: Function,
  children: any
}

function Modal({setModal, children}: props) {
  return ReactDOM.createPortal(
    <div className={styles.modal} onClick={() => setModal(false)}>
      {children}
    </div>,
    document.getElementById('root')
  )
}

export default Modal