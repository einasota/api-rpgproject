import { Router } from "express";
//Controllers
import UserController from "./controllers/UserController";
import AuthController from "./controllers/AuthController";
//Middlewares
import AuthMiddleware from "./middlewares/auth";

const routes = Router();

routes
    .get('/', (req, res) => {return res.send('Hello World!')})
    .get('/users', AuthMiddleware, UserController.indexedDB)
    .post('/register', AuthController.create)
    .post('/login', AuthController.login)
    .post('/forgot_password', AuthController.recovery)
    .post('/reset_password', AuthController.reset)

export default routes;
