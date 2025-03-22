// import Modal from "@/components/Modal";
// import ModalStore from "@/store/ModalStore";
// import store from "@/store/store";
// import { useState, useEffect, useRef } from "react";
// import { FallbackProps } from "react-error-boundary";
// import * as styles from "@/css/warning.module.scss"
// import { createPortal } from "react-dom";
// import ErrorStore from "@/store/ErrorStore";

// function ErrorCallback(props: FallbackProps) {
//   const {error, resetErrorBoundary} = props
//   const nodeRef = useRef(null)
//   ModalStore.open()

//   return createPortal(
//     <Modal nodeRef={nodeRef} uslovie={ModalStore.isOpen}>
//       <div className={styles.wrapper} ref={nodeRef}>
//       <div>Ошибка!</div>
//       <span>{error.message}</span>
//       <div>
//         <button onClick={() => {ErrorStore.removeError(); resetErrorBoundary()}}>Закрыть</button>
//       </div>
//     </div>
//     </Modal>, document.getElementById("root")
//   )
// }

// export default ErrorCallback


// import Modal from "@/components/Modal";
// import ModalStore from "@/store/ModalStore";
// import store from "@/store/store";
// import { useState, useEffect, useRef } from "react";
// import { FallbackProps } from "react-error-boundary";
// import * as styles from "@/css/warning.module.scss"
// import { createPortal } from "react-dom";
// import ErrorStore from "@/store/ErrorStore";

// function ErrorCallback(props: FallbackProps) {
//   const {error, resetErrorBoundary} = props
//   const nodeRef = useRef(null)
//   ModalStore.open()

//   return createPortal(
//     <Modal nodeRef={nodeRef} uslovie={ModalStore.isOpen}>
//       <div className={styles.wrapper} ref={nodeRef}>
//       <div>Ошибка!</div>
//       <span>{error.message}</span>
//       <div>
//         <button onClick={() => {ErrorStore.removeError(); resetErrorBoundary()}}>Закрыть</button>
//       </div>
//     </div>
//     </Modal>, document.getElementById("root")
//   )
// }

// export default ErrorCallback