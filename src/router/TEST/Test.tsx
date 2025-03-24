import testStore from "@/router/TEST/testStore"
import { observer } from "mobx-react-lite"
import { Suspense, useEffect, useRef, useState } from "react"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import * as animations from "@/css/animations/animations.module.scss"

function Test() {
  const [socket, setSocket] = useState<WebSocket>()

  return (
    <Suspense>
      <div>
        <h1>SSE Сообщения:</h1>
        <button onClick={() => socket.send('salam alejkum')}>send message</button>
      </div>
    </Suspense>
  );
}

export default observer(Test)


























  // // const [arr, setArr] = useState()
  // console.log(testStore)

  // function renderList() {
  //   const nodeRef = useRef(null)

  //     return(
  //       <TransitionGroup>
  //         {testStore.data.map((e, i) => (
  //           <CSSTransition key={i} nodeRef={nodeRef} timeout={300} classNames={{
  //             enter: animations.enter,
  //             enterActive: animations.enterActive,
  //             exit: animations.exit,
  //             exitActive: animations.exitActive
  //           }}>
  //             <div ref={nodeRef}>{e}</div>
  //           </CSSTransition>
  //         ))}
  //       </TransitionGroup>
  //     )
  // }

  // return (
  //   <>
  //     <button onClick={() => testStore.data.push('asdsad')}>
  //       добавить
  //     </button>
  //     {renderList()}
  //   </>
  // )

  // useEffect(() => {
  //     const eventSource = new EventSource("http://localhost:3000/api/test");

  //     eventSource.onmessage = (event) => {
  //         const data = JSON.parse(event.data);
  //         setMessages((prev) => [...prev, data.message]);
  //     };

  //     eventSource.onerror = () => {
  //         console.error("Ошибка соединения с сервером");
  //         eventSource.close();
  //     };

  //     return () => {
  //         eventSource.close(); // Закрываем соединение при размонтировании компонента
  //     };
  // }, []);