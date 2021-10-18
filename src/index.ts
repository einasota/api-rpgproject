import express from "express";
// import dotenv from "dotenv";
import 'dotenv/config'
// dotenv.config()
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(process.env.PORT,() => {
    console.log('Executando no servidor: ', process.env.PORT)
})