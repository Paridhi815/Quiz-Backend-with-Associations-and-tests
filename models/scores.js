

module.exports = (sequelize, DataTypes) => {
  const scores = sequelize.define('scores', {
    userId: { type: DataTypes.INTEGER, unique: true },
    score: DataTypes.INTEGER,
  }, {});
  scores.associate = function (models) {
  };
  return scores;
};
