import { wss } from "@s/index"
import { user_data } from "@s/router/db"
import { SpotifyDataInterface } from "@s/router/types"
import WebSocket from "ws"

function onceClient(): WebSocket {
  if ([...wss.clients].length > 0) {
    return [...wss.clients][0]
  }
}

class WebsocketController {
  sendmessage = (message: string) => {
    // console.log(wss.clients)
    wss.clients.forEach(client => {
      client.send(message)
    })
  }
  pushToDB = (playlist: SpotifyDataInterface) => {
    // console.log(onceClient())
    user_data.push(playlist)
    onceClient().send(JSON.stringify({type: "playlist", data: playlist}))
  }
  setLoading = (status: number) => {
    onceClient().send(JSON.stringify({type: "loading", data: status}))
  }
  setLoadFiles = (count: number) => {
    onceClient().send(JSON.stringify({type: "loadFiles", data: count}))
  }
}

export default new WebsocketController()