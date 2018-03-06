

module.exports = (sequelize, DataTypes) => {
  const scores = sequelize.define('scores', {
    userId: DataTypes.INTEGER,
    score: DataTypes.INTEGER,
  }, {});
  scores.associate = function (models) {
  };
  return scores;
};
