

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    userName: DataTypes.STRING,
    score: DataTypes.INTEGER,
  }, {});
  users.associate = function (models) {
    // associations can be defined here
  };
  return users;
};
