import BlockStore from "@/store/BlockStore"
import { createPortal } from "react-dom"
import * as styles from "@/css/data.module.scss"
import { observer } from "mobx-react-lite"

function Block({children}: {children: React.ReactNode}) {
  const container = document.getElementsByClassName(styles.main)[0]
  console.log(container)
  // const container = document.getElementById('root')
  // setTimeout(() => console.log(container), 5000)
  // console.log(BlockStore.isOpen)

  return BlockStore.isOpen && container ? createPortal(
    <>{children}</>
    , container
  ) : null
}

export default observer(Block)