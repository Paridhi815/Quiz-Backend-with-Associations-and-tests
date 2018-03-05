

module.exports = (sequelize, DataTypes) => {
  const correctanswers = sequelize.define('correctanswers', {
    qid: DataTypes.INTEGER,
    correctanswer: DataTypes.STRING,
  }, {});
  correctanswers.associate = function (models) {
    // associations can be defined here
    correctanswers.belongsTo(models.questions);
  };
  return correctanswers;
};
