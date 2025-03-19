import Data from "@/pages/Main/Data"
import DragDrop from "@/pages/Main/DragDrop"
import store from "@/store/store"
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Main() {
  const [auth, setAuth] = useState(null)

  useEffect(() => {
    async function fetchData() {
      setAuth(await store.checkRefreshToken())
    }

    fetchData()
  }, [])

  const url = `https://accounts.spotify.com/authorize?client_id=ed9730b2fe9d4d4bbde6cea261dd063d&response_type=code&redirect_uri=http://localhost:3000/api/callback&state=generateRandomString(16)&scope=playlist-modify-public playlist-modify-private user-library-modify`

  if (auth === null) {
    return (
      <div>Загрузка...</div>
    )
  }
  if (auth === false) {
    return (
      <Link to={url}>Войти</Link>
    )
  }
  if (store.data.length > 0) {
    return <Data />
  }
  if (auth === true) {
    console.log(store.data.length)
    return (
      <DragDrop />
    )
  }
}

export default observer(Main)