import { Router } from "express";
import UserController from "./controllers/UserController";
import AuthController from "./controllers/AuthController";

const routes = Router();

routes
    .get('/', (req, res) => {return res.send('Hello World!')})
    .get('/users', UserController.indexedDB)
    .post('/register', AuthController.create)

export default routes;
