const express = require('express');
const routes = require('./routes');

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
module.exports = new App().server;