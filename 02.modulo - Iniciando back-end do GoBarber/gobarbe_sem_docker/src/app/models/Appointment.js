import Sequelize, { Model } from 'sequelize';

class Appointment extends Model {
  // Método chamado auto pelo sequelize
  static init(sequelize) {
    // Chamando o método init da class Pai(Model)
    super.init(
      {
        // Apenas colunas em que o usuario cadastra dados, não precisam ser reflexo da base de dados
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
      },
      {
        // Como segundo parametro pode ser passada outras configurações além de retornar a variavel sequelize
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    // OBS: quando uma tabela tem mais de uma fk é obrigatorio atribuir "apelidos" = as: ""
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
  }
}

export default Appointment;
