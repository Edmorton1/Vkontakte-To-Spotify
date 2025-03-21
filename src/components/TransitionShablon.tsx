import { CSSTransition } from "react-transition-group"
import * as animations from "@/css/animations/animations.module.scss"

interface propsInterface {
  inside: boolean,
  nodeRef: React.RefObject<any>,
  children: any
}

function TransitionShablon({inside, nodeRef, children}: propsInterface) {
  return (
    <CSSTransition 
    in={inside} 
    unmountOnExit
    mountOnEnter
    timeout={300} 
      classNames={{
      enter: animations.enter,
      enterActive: animations.enterActive,
      exit: animations.exit,
      exitActive: animations.exitActive
      }}
    nodeRef={nodeRef}
    >
      {children}
    </CSSTransition>
  )
}

export default TransitionShablon