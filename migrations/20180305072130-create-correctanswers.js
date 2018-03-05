

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('correctanswers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    qid: {
      type: Sequelize.INTEGER,
      references: {
        model: 'questions',
        key: 'qid',
      },
    },
    correctanswer: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('correctanswers'),
};
