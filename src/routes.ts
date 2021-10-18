import { Router } from "express";
import UserController from "./controllers/UserController";

const routes = Router();

routes.get('/', (req, res) => {
    return res.send('Hello World!');
});

routes.get('/users', UserController.indexedDB)

export default routes;
