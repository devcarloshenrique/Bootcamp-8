// Separa a forma de roteamento do express em outro arquivo.
import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

// Importando o metodo store do controller user que é responsável por criar os user
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvaliableController from './app/controllers/AvailableController';

// importando autenticação de token
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

// middleware global
routes.use(authMiddleware);

// authMiddleware é um middleware local
routes.put('/users', UserController.update);

routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/avaliable', AvaliableController.index);

routes.post('/appointments', AppointmentController.store);
routes.get('/appointments', AppointmentController.index);
routes.delete('/appointments/:id', AppointmentController.delete);

routes.get('/schedule', ScheduleController.index);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

/* utilizamos single pois queremos fazer upload de um arquivo por vez e não varios
 * file é o nome do campo que será enviado pela requisição
 */
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
