// Separa a forma de roteamento do express em outro arquivo.
import { Router } from 'express';

import User from './app/models/User';

// Importando o metodo store do controller user que é responsável por criar os user
import UserController from './app/controllers/UserController';

const routes = new Router();

routes.post('/users', UserController.store);

export default routes;
