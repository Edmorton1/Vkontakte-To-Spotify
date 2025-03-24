import store from "@/store/store"
import { observer } from "mobx-react-lite"
import { useState } from "react"

function Progress() {

  return (
    <>
    <progress value={store.loadProgress} />
    </>
  )
}

export default observer(Progress)