import * as styles from "@/css/dragDrop.module.scss"
import $api from "@/store/$api"
import store from "@/store/store"
import { observer } from "mobx-react-lite"
import { useState } from "react"


function DragDrop() {
  const [Drag, setDrag] = useState(false)

  const dropHandle = async (e: React.DragEvent<HTMLDivElement>) => {
    // console.log(e.dataTransfer.files)
    const files = e.dataTransfer.files
    let formData = new FormData()
    Array.from(files).forEach(file => formData.append(file.name, file))
    // store.loadPlaylists(formData, setShowBlock)
    // console.log(formData.get('Серега Пират.html'))
    // console.log(formData.get('Blur.html'))
    // store.loadPlaylists(request.data)
  }
  return (
    <div className={styles.dragDrop}
      // onDragEnter={(event) => {setShowBlock(true); event.preventDefault()}}
      onDragEnter={(event) => {event.preventDefault()}}
      onDrop={(event) => {
        // setShowBlock(false); 
        dropHandle(event);
        setTimeout(() => store.loadFiles++, 50);
        event.preventDefault();
      }}
      onDragOver={(e) => {e.preventDefault(); console.log('OVER')}}
      onDragLeave={(event) => 
      // {event.preventDefault(); if (!event.relatedTarget || !document.getElementsByClassName(styles.main)[0].contains(event.relatedTarget as Node)) setShowBlock(false)}}>
      {event.preventDefault(); if (!event.relatedTarget || !document.getElementsByClassName(styles.dragDrop)[0].contains(event.relatedTarget as Node)) console.log(false)}}>
        asdasasd
    </div>
  )

}

export default observer(DragDrop)

// return (
//   <div onDragEnter={(e) => {e.preventDefault(); setDrag(true)}} onDragLeave={(e) => {e.preventDefault(); setDrag(false)}} onDrop={(e) => dropHandle(e)} onDragOver={(e) => {e.preventDefault(); console.log('OVER'); setDrag(true)}} className={styles.dragDrop}>
    
//     {Drag ? 'Отпустите файл чтобы дропнуть' : 'файл тащи'}
//   </div>
// )