const Models = require('../../models');
const Helper = require('./fetchAnswers');

const populateAnswerDb = () => {
  const modelPromise = Helper.fetchAnswers().then(questionWithnswer =>
    Models.correctanswers.bulkCreate(questionWithnswer));
  return modelPromise;
};

module.exports = populateAnswerDb;
