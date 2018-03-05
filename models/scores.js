

module.exports = (sequelize, DataTypes) => {
  const scores = sequelize.define('scores', {
    userid: DataTypes.INTEGER,
    qid: DataTypes.INTEGER,
    score: DataTypes.INTEGER,
  }, {});
  scores.associate = function (models) {
    // associations can be defined here
    scores.belongsTo(models.users);
    scores.belongsTo(models.questions);
  };
  return scores;
};
