const Models = require('../../models');
const helper = require('./fetchQuestions');

const populateQuestionDb = () => {
  const requestPromise = helper.fetchQuestions().then(questionsArray =>
    Models.questions.bulkCreate(questionsArray));
  return requestPromise;
};

module.exports = populateQuestionDb;
