// Este arquivo não suporta pode a sitaxe do sucrese pois vai ser acessado tanto pela aplicação quanto pelo sequelize
module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'admin',
  database: 'gobarber',
  define: {
    timestamps: true,
    // Quero utilizar o padrão de tabelas e colunas underscored
    underscored: true,
    underscoredAll: true,
  },
};
