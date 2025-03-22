import * as styles_drop from "@/css/dragDrop.module.scss"
import loader from "@/assets/loader.png"

function Loading() {
  return (
    <img src={loader} className={styles_drop.loader} />
  )
}

export default Loading