

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('useranswers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    userid: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    qid: {
      type: Sequelize.INTEGER,
      references: {
        model: 'questions',
        key: 'qid',
      },
    },
    userAnswer: {
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('useranswers'),
};
