import store from "@/store/store";
import DragDrop from "@/components/DragDrop";
import * as styles from "@/css/data.module.scss"
import * as styles_tracks from "@/css/tracks.module.scss"
import TrackList from "@/components/TrackList";
import { observer } from "mobx-react-lite";
import { useRef, useState } from "react";
import Block from "@/components/Block";
import * as styles_drop from "@/css/dragDrop.module.scss"
import TransitionShablon from "@/components/TransitionShablon";
import Playlists from "@/components/Playlists";
import Loading from "@/components/Loading";

function Data() {
  const [openPlaylist, setOpenPlaylist] = useState(0)
  const [showBlock, setShowBlock] = useState(false)
  const nodeRef = useRef(null)
  const playlistRef = useRef(null)
  const dropHandle = async (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files
    let formData = new FormData()
    Array.from(files).forEach(file => formData.append(file.name, file))
    store.loadPlaylists(formData, setShowBlock)
  }

  return (
    <main className={styles.main}
      onDragEnter={(event) => {setShowBlock(true); event.preventDefault()}}
      onDrop={(event) => {dropHandle(event)}}
      onDragOver={(e) => {e.preventDefault(); console.log('OVER')}}
      onDragLeave={(event) => 
      {event.preventDefault(); if (!event.relatedTarget || !document.getElementsByClassName(styles.main)[0].contains(event.relatedTarget as Node)) setShowBlock(false)}}>
      <Playlists />
      <TransitionShablon nodeRef={nodeRef} inside={showBlock} >
        <Block><div ref={nodeRef} className={`${styles_drop.block} ${styles.playlistContainer}`}>{store.isLoad ? <Loading /> : `Новый плейлист`}</div></Block>
      </TransitionShablon>
      {/* <DragDrop /> */}
    </main>
  );
}

export default observer(Data);
