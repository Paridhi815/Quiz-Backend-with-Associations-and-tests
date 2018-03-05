

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    userName: { type: DataTypes.STRING, unique: true },
    score: DataTypes.INTEGER,
  }, {});
  users.associate = function (models) {
    // associations can be defined here
  };
  return users;
};
