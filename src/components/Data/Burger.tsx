import * as stylesBurger from "@/css/burger.module.scss"
import { trackInterface } from "@s/router/types";
import store from "@/store/store";
import { CSSTransition } from "react-transition-group";
import { useRef } from "react";
import * as animations from "@/css/animations/burgerAnimation.module.scss"

interface propsInterface {
  uslovie: boolean,
  track: trackInterface,
  playlist: number,
  index: number,
  setChangeId: React.Dispatch<React.SetStateAction<number>>,
  setBurger: React.Dispatch<React.SetStateAction<number>>
}

function Burger({uslovie, track, playlist, index, setChangeId, setBurger}: propsInterface) {
  const nodeRef = useRef(null);

  return (
    <CSSTransition nodeRef={nodeRef} in={uslovie} timeout={500} unmountOnExit classNames={{
      enter: animations.enter,
      enterActive: animations.enterActive,
      exit: animations.exit,
      exitActive: animations.exitActive
    }}>
    <div ref={nodeRef} className={stylesBurger.burger}>
      <button onClick={() => window.open(track.url)}>Послушать</button>
      <button onClick={() => {store.updateTracks(playlist, index, 'sim_event'); setBurger(-1)}}>Одобрить</button>
      <button onClick={() => setChangeId(index)}>Изменить</button>
      <button onClick={() => {store.updateTracks(playlist, index, 'delete'); setBurger(-1)}}>Удалить</button>
    </div>
    </CSSTransition>
  )
}

export default Burger