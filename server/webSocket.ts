// import { users } from "@s/router/db";
import { user_data } from "@s/router/db";
import { WebSocketInterface } from "@s/router/types";
import WebSocket from "ws";

export default function createWebSocketServer(server: any) {
  const wss = new WebSocket.Server({ server });
  
  wss.on("connection", (ws) => {
      console.log("Клиент подключился");
      
      ws.send(JSON.stringify({type: "message", data: 'Ты подключился'}))

      ws.on('message', (message: Base64URLString) => {
          console.log(user_data)
      })
      ws.on('close', () => {
        //@ts-ignore
        user_data = []
        console.log('КЛИЕНТ ОТКЛЮЧИЛСЯ')
      })
  });

  return wss
}

