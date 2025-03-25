import store from "@/store/store";
import DragDrop from "@/components/DragDrop";
import * as styles from "@/css/data.module.scss"
import * as styles_tracks from "@/css/tracks.module.scss"
import TrackList from "@/components/TrackList";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import Block from "@/components/Block";
import Playlists from "@/components/Playlists";
import BlockAdding from "@/components/BlockAdding";
import ErrorStore from "@/store/ErrorStore";

function Data() {
  const [showBlock, setShowBlock] = useState(false)
  const dropHandle = async (e: React.DragEvent<HTMLElement>) => {
    const files = e.dataTransfer.files
    let formData = new FormData()
    Array.from(files).forEach(file => formData.append(file.name, file))
    store.loadPlaylists(formData, setShowBlock)
  }

  function blocksRender() {
    return Array.from({length: store.loadFiles}, (_, i) => (
      <Block index={i}/>
    ))
  }

  blocksRender()

  return (
    <main className={styles.main}
      onDragEnter={(event) => {setShowBlock(true); event.preventDefault()}}
      onDrop={(event) => {
        setShowBlock(false); 
        dropHandle(event);
        store.loadFiles++;
        event.preventDefault();
      }}
      onDragOver={(e) => {e.preventDefault(); console.log('OVER')}}
      onDragLeave={(event) => 
      {event.preventDefault(); if (!event.relatedTarget || !document.getElementsByClassName(styles.main)[0].contains(event.relatedTarget as Node)) setShowBlock(false)}}>
      <Playlists />
      {/* <Block showBlock={showBlock} /> */}
      {blocksRender()}
      <BlockAdding showBlock={showBlock} />
      <button onClick={() => store.createPlaylist(undefined, false)}>Добавить всё</button>
      {/* <DragDrop /> */}
    </main>
  );
}

export default observer(Data);
