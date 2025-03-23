import { Request, Response } from "express";
// import { wss } from "@s/index"; // Это нужно для доступа к серверу WebSocket

class TestController {
  // test = async (req: Request, res: Response) => {
  //   // Отправить сообщение всем подключенным WebSocket клиентам
  //   wss.clients.forEach((ws) => {
  //     if (ws.readyState === ws.OPEN) {
  //       ws.send("Hello from the server!");
  //     }
  //   });

  //   // Ответить клиенту, что запрос был обработан
  //   res.json({ message: "WebSocket message sent to all clients" });
  // }
}

export default new TestController();
