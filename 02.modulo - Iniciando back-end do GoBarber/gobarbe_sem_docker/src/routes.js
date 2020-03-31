// Separa a forma de roteamento do express em outro arquivo.
import { Router } from 'express';

// Importando o metodo store do controller user que é responsável por criar os user
import UserController from './app/controllers/UserController';

import SessionController from './app/controllers/SessionController';

// importando autenticação de token
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

// middleware global
routes.use(authMiddleware);

// authMiddleware é um middleware local
routes.put('/users', UserController.update);

export default routes;
