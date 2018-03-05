

module.exports = (sequelize, DataTypes) => {
  const useranswers = sequelize.define('useranswers', {
    userid: DataTypes.INTEGER,
    qid: DataTypes.INTEGER,
    userAnswer: DataTypes.STRING,
  }, {});
  useranswers.associate = function (models) {
    // associations can be defined here
    useranswers.belongsTo(models.users);
    useranswers.belongsTo(models.questions);
  };
  return useranswers;
};
