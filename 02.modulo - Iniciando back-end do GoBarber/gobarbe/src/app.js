import express from 'express';
import routes from './routes';

class App {
  
  constructor(){
  
    this.server = express();
    
    this.middlewares();

    this.routes();

  }

  middlewares() {

    this.server.use( express.json() );
    
  }

  routes() {
    
    this.server.use( routes );

  }

}

// O único atributo ou metodo que pode ser acessado é o server;
export default new App().server;