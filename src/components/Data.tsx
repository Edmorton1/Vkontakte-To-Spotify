import store from "@/store/store";
import { onDrop } from "@/components/DragDrop";
import * as styles from "@/css/data.module.scss"
import { observer } from "mobx-react-lite";
import { useState } from "react";
import Block from "@/components/Block";
import Playlists from "@/components/Playlists";
import BlockAdding from "@/components/BlockAdding";
import Warning from "@/components/Warning";

function Data() {
  const [showBlock, setShowBlock] = useState(false)
  const [modalWarning, setModalWarning] = useState(false)

  function blocksRender() {
    return Array.from({length: store.loadFiles}, (_, i) => (
      <Block index={i}/>
    ))
  }

  blocksRender()

  return (
    <div className={styles.container}>
      <main className={styles.main}
        onDragEnter={(event) => {setShowBlock(true); event.preventDefault()}}
        onDrop={(event) => onDrop(event, setShowBlock)}
        onDragOver={(e) => {e.preventDefault(); console.log('OVER')}}
        onDragLeave={(event) => 
        {event.preventDefault(); if (!event.relatedTarget || !document.getElementsByClassName(styles.main)[0].contains(event.relatedTarget as Node)) setShowBlock(false)}}>
        <Playlists />
        <BlockAdding showBlock={showBlock} />
        {blocksRender()}
      </main>
    
      <button onClick={() => setModalWarning(true)} className={(styles.button, styles.button_all)}>Добавить всё</button>
      <Warning playlist_arr={(store.data.filter(e => !e.is_published)).map((e, i) => i)} setModalWarning={setModalWarning} uslovie={modalWarning} />
    </div>
  );
}

export default observer(Data);
