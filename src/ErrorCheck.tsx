// import ErrorStore from "@/store/ErrorStore"
// import store from "@/store/store"
// import { observer } from "mobx-react-lite"
// import { createPortal } from "react-dom"
// import Modal from "@/components/Modal";
// import ModalStore from "@/store/ModalStore";
// import { useState, useEffect, useRef } from "react";
// import { FallbackProps } from "react-error-boundary";
// import * as styles from "@/css/warning.module.scss"

// function ErrorCheck({children}: any) {
//   const nodeRef = useRef(null)
//   // ModalStore.open()
//   const [modalStore] = useState(() => new ModalStore());

//   if (ErrorStore.error) {
//     // console.log(ErrorStore.error)
//     modalStore.open()
//     return createPortal(
//     <Modal nodeRef={nodeRef} uslovie={modalStore.isOpen} copy={modalStore}>
//       <div className={styles.wrapper} ref={nodeRef}>
//         <div>Ошибка!</div>
//         <span>{ErrorStore.error.message}</span>
//         <div>
//           <button onClick={() => {ErrorStore.removeError()}}>Закрыть</button>
//         </div>
//       </div>
//     </Modal>, document.getElementById("root")
//     )
//   }

//   // return children
// }

// export default observer(ErrorCheck)