import express from "express";
import dotenv from "dotenv";
import router from "@s/router";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import WebSocket from "ws";
import createWebSocketServer from "@s/webSocket";

dotenv.config();

const app = express();
const server = http.createServer(app);
const wss = createWebSocketServer(server)

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://client-otaku-vibes.up.railway.app/", "http://localhost:5000"],
    credentials: true,
  })
);

// setInterval(() => console.log('СЕРВЕР РАБОТАЕТ'), 3000)

const PORT = process.env.PORT ?? 3000;

app.use("/api", router);

app.get('/', (req, res) => {
  res.json('Сервер работает')
})

server.listen(PORT, () => {
  console.log(`СЕРВЕР ЗАПУШЕН НА ПОРТУ ${PORT} НА САЙТЕ ${process.env.URL_SERVER}`);
});

export { wss }