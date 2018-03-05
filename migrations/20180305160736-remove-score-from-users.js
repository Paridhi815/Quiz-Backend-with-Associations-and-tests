

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('users', 'score', Sequelize.INTEGER);
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.addColumn('users', 'score', Sequelize.INTEGER);
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  },
};
