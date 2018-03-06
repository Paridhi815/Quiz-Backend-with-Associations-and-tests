

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    userName: { type: DataTypes.STRING, unique: true },
  }, {});
  users.associate = function (models) {
    // associations can be defined here
    users.hasMany(models.useranswers);
    users.hasOne(models.scores);
  };
  return users;
};
