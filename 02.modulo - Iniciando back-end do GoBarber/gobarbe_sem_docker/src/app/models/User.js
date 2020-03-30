import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  // Método chamado auto pelo sequelize
  static init(sequelize) {
    // Chamando o método init da class Pai(Model)
    super.init(
      {
        // Apenas colunas em que o usuario cadastra dados, não precisam ser reflexo da base de dados
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        // Sequelize.VIRTUAL, que dizer que este campo nunca existirá no DB
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        // Como segundo parametro pode ser passada outras configurações além de retornar a variavel sequelize
        sequelize,
      }
    );
    /* Funcionalidade do sequileze, o Hook 'berforeSave' determina, que qual quer usuario antes de ser salvo
      no BD, passará por essa função. Recebemos este usuario  como parametro user
    */
    this.addHook('beforeSave', async user => {
      if (user.password) {
        // Criptografando o password_hash e definindo o nivel de segurança em 8
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    // Quando é chama criado this.addHook, é consciderado boa pratica retornar o this
    return this;
  }
}

export default User;
