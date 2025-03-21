import testStore from "@/router/TEST/testStore"
import { observer } from "mobx-react-lite"
import { useRef, useState } from "react"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import * as animations from "@/css/animations/animations.module.scss"

function Test() {
  // const [arr, setArr] = useState()
  console.log(testStore)

  function renderList() {
    const nodeRef = useRef(null)

      return(
        <TransitionGroup>
          {testStore.data.map((e, i) => (
            <CSSTransition key={i} nodeRef={nodeRef} timeout={300} classNames={{
              enter: animations.enter,
              enterActive: animations.enterActive,
              exit: animations.exit,
              exitActive: animations.exitActive
            }}>
              <div ref={nodeRef}>{e}</div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      )
  }

  return (
    <>
      <button onClick={() => testStore.data.push('asdsad')}>
        добавить
      </button>
      {renderList()}
    </>
  )
}

export default observer(Test)