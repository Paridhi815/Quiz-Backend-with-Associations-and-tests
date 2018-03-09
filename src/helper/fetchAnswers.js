const rp = require('request-promise');
const Models = require('../../models');

const fetchAnswers = () => {
  const url2 = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findAnswerById/';
  const modelPromise = Models.questions.findAll().then((allQuestions) => {
    const promiseArray = [];
    const questionIdArray = [];
    const questionWithnswer = [];
    allQuestions.forEach((question) => {
      const url = `${url2}${question.questionId}`;
      const correctAnswerPromise = rp(url);
      promiseArray.push(correctAnswerPromise);
      questionIdArray.push(question.questionId);
    });
    return Promise.all(promiseArray).then((answers) => {
      for (let i = 0; i < answers.length; i += 1) {
        const answer = JSON.parse(answers[i]);
        const questionId = questionIdArray[i];
        questionWithnswer.push({
          questionId,
          correctanswer: answer.answer,
        });
      }
      return questionWithnswer;
    });
  });
  return modelPromise;
};


module.exports = {
  fetchAnswers,
};

