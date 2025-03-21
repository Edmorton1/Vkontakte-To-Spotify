import { createPortal } from "react-dom"
import * as styles from "@/css/data.module.scss"
import { observer } from "mobx-react-lite"

function Block({children}: {children: React.ReactNode}) {

  return (
    <>{children}</>
  )
}

export default observer(Block)