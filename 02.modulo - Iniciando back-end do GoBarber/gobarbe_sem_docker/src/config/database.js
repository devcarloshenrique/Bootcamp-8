require('dotenv/config');

// Este arquivo não suporta pode a sitaxe do sucrese pois vai ser acessado tanto pela aplicação quanto pelo sequelize
module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamps: true,
    // Quero utilizar o padrão de tabelas e colunas underscored
    underscored: true,
    underscoredAll: true,
  },
};
