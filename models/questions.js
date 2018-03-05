

module.exports = (sequelize, DataTypes) => {
  const questions = sequelize.define('questions', {
    questionText: DataTypes.STRING,
    qid: { type: DataTypes.INTEGER, unique: true },
    options: DataTypes.JSON,
  }, {});
  questions.associate = function (models) {
    // associations can be defined here
  };
  return questions;
};
