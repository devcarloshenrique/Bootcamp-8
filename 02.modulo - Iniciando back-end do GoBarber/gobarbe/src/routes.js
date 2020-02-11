import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddllewares from './app/middllewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Rota Global de verificação JWT, só vai ocorrer verificações apartir desta rota.
routes.use(authMiddllewares);
routes.put('/users', UserController.update);

export default routes;
