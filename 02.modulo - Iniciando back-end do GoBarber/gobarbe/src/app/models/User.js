import Sequelize, { Model } from 'sequelize';

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
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }
}

export default User;
