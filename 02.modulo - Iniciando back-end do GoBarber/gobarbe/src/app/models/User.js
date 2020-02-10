import Sequelize, { Model } from 'sequelize';

import bcrypt from 'bcryptjs';

class User extends Model {
  // metodo que vai ser chamado de manéira automatica pelo sequelize.
  static init(sequelize) {
    /* dentro desse método, vamos enviar como objeto as colunas que vamos
     * ter dentro da nossa base de dados, evitando chamar pk, fk, creat dt, update dt
     */
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    // Sequelize | trecho de code que é execultado de forma automatica
    // Execultado antes do usuario ir para o banco de dados
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }
}

export default User;
