import Sequelize from 'sequelize';

import User from '../app/models/User';

import databaseConfig from '../config/database';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // Esta variavel está dentro dos nosso models, dentro do metodo init(sequelize).
    this.connection = new Sequelize(databaseConfig);

    // Acessando cada uma das models e chamando o metodo init()
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
