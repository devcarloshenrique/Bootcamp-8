import express from 'express';
import path from 'path';
import routes from './routes';

import './database/index';

class App {
  constructor() {
    this.server = express();

    this.middlewares();

    this.routes();
  }

  middlewares() {
    // Para à aplicação conseguir consumir json, é necessário chamar essa função do express
    this.server.use(express.json());
    // Este metodo static faz com que a "url" da imagem seja reconhecida pelo nevegador
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tpm', 'uploads'))
    );
  }

  // As rotas serão exportadas de routes.js
  routes() {
    this.server.use(routes);
  }
}

// Exportando apenas o server da instância App();
export default new App().server;
