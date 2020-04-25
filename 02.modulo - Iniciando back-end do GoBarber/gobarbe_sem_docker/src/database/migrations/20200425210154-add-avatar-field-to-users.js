module.exports = {
  up: (queryInterface, Sequelize) => {
    // Adicionando o campo avatar_id na tabela users
    return queryInterface.addColumn('users', 'avatar_id', {
      type: Sequelize.INTEGER,
      // Este campo vai ser um ForeiKey, relacionado a tabela files e seu campo id
      references: { model: 'files', key: 'id' },
      // Caso o campo avatar_id venha ser alterado, este campo tbm será alterado
      onUpdate: 'CASCADE',
      // Caso o arquivo venha ser deletado na tabela files, este campo vai ser setado como null
      onDelete: 'SET NULL',
      // por padrão este campo é null
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'avatar_id');
  },
};
