import { Link } from "react-router-dom"
import * as style from "@/css/enter.module.scss"
const url = `https://accounts.spotify.com/authorize?client_id=ed9730b2fe9d4d4bbde6cea261dd063d&response_type=code&redirect_uri=http://localhost:3000/api/callback&state=generateRandomString(16)&scope=playlist-modify-public playlist-modify-private user-library-modify`

function Enter() {
  return (
    <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100vh"}}>
      <Link to={url}>
        <button className={style.button}>Войти</button>
      </Link>
    </div>
  )
}

export default Enter