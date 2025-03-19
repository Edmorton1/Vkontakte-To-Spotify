import * as styles from "@/pages/Main/DragDrop.module.scss"
import $api from "@/store/$api"
import store from "@/store/store"
import { observer } from "mobx-react-lite"
import { useState } from "react"


function DragDrop() {
  const [Drag, setDrag] = useState(false)

  const dropHandle = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // console.log(e.dataTransfer.files)
    const files = e.dataTransfer.files
    let formData = new FormData()
    Array.from(files).forEach(file => formData.append(file.name, file))
    const request = await $api.post(`http://localhost:3000/api/take`, formData)
    // console.log(formData.get('Серега Пират.html'))
    // console.log(formData.get('Blur.html'))
    store.loadPlaylists(request.data)
  }

  return (
    <div onDragEnter={(e) => {e.preventDefault(); setDrag(true)}} onDragLeave={(e) => {e.preventDefault(); setDrag(false)}} onDrop={(e) => dropHandle(e)} onDragOver={(e) => {e.preventDefault(); console.log('OVER'); setDrag(true)}}
     className={styles.dragDrop}
     >{Drag ? 'Отпустите файл чтобы дропнуть' : 'файл тащи'}</div>
  )
}

export default observer(DragDrop)