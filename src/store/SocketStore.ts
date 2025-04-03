// import store from "@/store/store";
import { URL_SERVER_WS } from "@/URLS";
import { WebSocketInterface } from "@s/router/types";
import { makeAutoObservable, runInAction } from "mobx"

class SocketStore {
  socket: WebSocket | null = null
  // id: number | null = null

  constructor() {
    makeAutoObservable(this);
    // this.connect()
  }

  connect = async () => {
    const { default: store } = await import("./store"); 
    this.socket = new WebSocket(`${URL_SERVER_WS}`)

    this.socket.onopen = () => {
      console.log('ПРИВЕТ')
    }

    this.socket.onmessage = (message) => {
      const parse: WebSocketInterface = JSON.parse(message.data)
      console.log(parse)
      switch (parse.type) {
        case "message": {
          console.log(parse.data)
          break
        }
        case "playlist": {
          if (!Array.isArray(store.data)) {
            store.data = [];  // 🛠 Если store.data был undefined, создаем пустой массив
          }
          store.pushData(parse.data)
          // console.log(parse.data)
          break
        }
        case "loading": {
          if (parse.data == 1) {
            runInAction(() => store.loadProgress = 0)
          } else {
            runInAction(() => store.loadProgress = parse.data)
          }
          runInAction(() => store.loadFiles = store.loadFiles)
          console.log(store.loadProgress)
          break
        }
        case "loadFiles": {
          console.log(parse)
          runInAction(() => store.loadFiles += parse.data)
        }
      }
    }

    this.socket.onclose = () => {
      console.log('ОТКЛЮЧЕНИЕ')
    }
  }


}

export default new SocketStore()