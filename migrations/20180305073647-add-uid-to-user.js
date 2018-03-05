

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('users', 'userid', Sequelize.INTEGER);
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('users', 'userid');
  },
};
