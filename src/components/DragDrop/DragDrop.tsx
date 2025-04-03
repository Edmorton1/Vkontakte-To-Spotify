import * as styles from "@/css/dragDrop.module.scss"
import store from "@/store/store"
import { observer } from "mobx-react-lite"
import { useState } from "react"
import asd from "@/assets/dropCross.png"
import { Link } from "react-router-dom"

const dropHandle = async (e: React.DragEvent<any>, setShowBlock?: React.Dispatch<React.SetStateAction<boolean>>) => {
  // console.log(e.dataTransfer.files)
  const files = e.dataTransfer.files
  let formData = new FormData()
  Array.from(files).forEach(file => formData.append(file.name, file))
  store.loadPlaylists(formData, setShowBlock)
  // console.log(formData.get('Серега Пират.html'))
  // console.log(formData.get('Blur.html'))
  // store.loadPlaylists(request.data)
}

export const onDrop = (event: React.DragEvent<any>, setShowBlock?: React.Dispatch<React.SetStateAction<boolean>>) => {
  setShowBlock ? setShowBlock((false)) : ''; 
  dropHandle(event, setShowBlock);
  event.preventDefault();
}

function DragDrop() {
  const [Drag, setDrag] = useState(false)

  return (
    <div className={styles.main}>
      <div className={styles.dragDrop}
        onDragEnter={(event) => {event.preventDefault(); document.getElementsByClassName(styles.dragDrop__cross__img)[0].classList.add(styles["dragDrop__cross__img--rotate"])}}
        onDrop={(event) => onDrop(event)}
        onDragOver={(e) => {e.preventDefault(); console.log('OVER')}}
        onDragLeave={(event) => 
        {event.preventDefault(); if (!event.relatedTarget || !document.getElementsByClassName(styles.dragDrop)[0].contains(event.relatedTarget as Node)) document.getElementsByClassName(styles.dragDrop__cross__img)[0].classList.remove(styles["dragDrop__cross__img--rotate"])}}>
          <span>Добавляйте плейлисты</span>
            <div className={styles.dragDrop__cross} >
              <img className={styles.dragDrop__cross__img} src={asd} />
            </div>
          <Link to="/instruction">Как?</Link>
      </div>
    </div>
  )

}

export default observer(DragDrop)