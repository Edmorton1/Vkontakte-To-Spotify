const dotenv = require("dotenv")
const express = require("express")
const path = require("path")
dotenv.config()

const app = express()

app.use(express.static(path.join(__dirname, "/dist")))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "/dist", "/index.html"))
})

app.listen(5000, () => console.log(`КЛИЕНТ ЗАПУЩЕН НА ПОРТУ 5000, САЙТ: ${process.env.URL_CLIENT}`))