import Data from "@/components/Data"
import DragDrop from "@/components/DragDrop"
import Loading from "@/components/Loading"
import store from "@/store/store"
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import * as styles_drop from "@/css/dragDrop.module.scss"
import loader from "@/assets/loader.png"
import Enter from "@/components/Enter"

function Main() {
  const [auth, setAuth] = useState(null)

  useEffect(() => {
    async function fetchData() {
      setAuth(await store.checkRefreshToken())
    }

    fetchData()
  }, [])

  if (auth === null) {
    return (
      <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100vh"}}>
        <div>
          <img src={loader} style={{width: "300px"}} className={styles_drop.loader} />
        </div>
      </div>
    )
  }
  if (auth === false || auth === 'undefined' || auth === undefined) {
    console.log(store.data.length, store.loadFiles, auth)
    return <Enter />
  }
  if (store.data.length > 0 || store.loadFiles > 0) {
    return (
      <Data />
    )
  }
  if (auth === true) {
    console.log(store.data.length)
    return (
      <main style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100vh"}}>
        <DragDrop />
      </main>
    )
  }
}

export default observer(Main)