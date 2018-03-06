

module.exports = (sequelize, DataTypes) => {
  const useranswers = sequelize.define('useranswers', {
    userId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER,
    userAnswer: DataTypes.STRING,
  }, {});
  useranswers.associate = function (models) {
  };
  return useranswers;
};
