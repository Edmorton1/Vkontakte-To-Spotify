// import { users } from "@s/router/db";
import { WebSocketInterface } from "@s/router/types";
import WebSocket from "ws";

export default function createWebSocketServer(server: any) {
  const wss = new WebSocket.Server({ server });
  
  wss.on("connection", (ws) => {
      console.log("Клиент подключился");
      
      ws.send(JSON.stringify({type: "message", data: 'Ты подключился'}))

      ws.on('message', (message: Base64URLString) => {
          console.log(JSON.parse(message))
      })
      ws.on('close', () => {
        console.log('КЛИЕНТ ОТКЛЮЧИЛСЯ')
      })
  });

  return wss
}

