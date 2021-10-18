import express from "express";
import cors from "cors";
import 'dotenv/config';
import routes from "./routes";
// dotenv.config()
const app = express();

app.use(cors)
app.use(routes);

app.listen(process.env.PORT, () => {
    console.log('Executando no servidor: ', process.env.PORT)
})
