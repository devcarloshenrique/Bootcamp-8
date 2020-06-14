import 'dotenv/config';

import express from 'express';
import path from 'path';
import Youch from 'youch';
import * as Sentry from '@sentry/node';
import sentryConfig from './config/sentry';
/**
 * Deve está antes das rotas
 */
import 'express-async-errors';
import routes from './routes';

import './database/index';

class App {
  constructor() {
    this.server = express();

    /**
     * Inicializando sentry
     */
    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHadler();
  }

  middlewares() {
    /**
     * Seguindo a documentação do setry é necessário colar este code
     * antes de qual quer rota ou requisição
     */

    this.server.use(Sentry.Handlers.requestHandler());

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
    /**
     * Seguindo a documentação do setry é necessário colar este code
     * depois de todas as rotas
     */
    this.server.use(Sentry.Handlers.errorHandler());
  }

  /**
   * Retornar o devido error, quando uma requisição não responder
   */
  exceptionHadler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

// Exportando apenas o server da instância App();
export default new App().server;
