// import { users } from "@s/router/db";
import WebSocket from "ws";

export default function createWebSocketServer(server: any) {
  const wss = new WebSocket.Server({ server });
  
  wss.on("connection", (ws) => {
      console.log("Клиент подключился");
      
      ws.send(JSON.stringify({type: "message", data: 'Ты подключился'}))

      ws.on('message', (message) => {
          console.log(message)
      })
      ws.on('close', () => {
        console.log('КЛИЕНТ ОТКЛЮЧИЛСЯ')
      })
  });

  return wss
}

