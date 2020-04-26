import Sequelize, { Model } from 'sequelize';

class File extends Model {
  // Método chamado auto pelo sequelize
  static init(sequelize) {
    // Chamando o método init da class Pai(Model)
    super.init(
      {
        // Apenas colunas em que o usuario cadastra dados, não precisam ser reflexo da base de dados
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3333/files/${this.path} `;
          },
        },
      },
      {
        // Como segundo parametro pode ser passada outras configurações além de retornar a variavel sequelize
        sequelize,
      }
    );
  }
}

export default File;
