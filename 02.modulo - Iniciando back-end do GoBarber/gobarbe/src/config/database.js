module.exports = {
  dialect: 'postgres',
  host: '192.168.99.100',
  username: 'postgres',
  password: 'docker',
  database: 'gobarber',
  define: {
    timestamps: true,
    // Esses dois objetos, vão evitar que o sequelize crie tabelas com o nome camecasel(TabelUsuario), criando desta manéria (tabela_usuario)
    underscored: true,
    underscoredAll: true,
  },
};
