

module.exports = (sequelize, DataTypes) => {
  const correctanswers = sequelize.define('correctanswers', {
    questionId: DataTypes.INTEGER,
    correctanswer: DataTypes.STRING,
  }, {});
  correctanswers.associate = function (models) {
    // associations can be defined here
    // correctanswers.belongsTo(models.questions, { foreignKey: 'qid', onDelete: 'CASCADE' });
  };
  return correctanswers;
};
