const rp = require('request-promise');

const fetchQuestions = () => {
  const url1 = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allQuestions';
  const requestPromise = rp(url1).then((result1) => {
    const questions = JSON.parse(result1);
    const questionsArray = [];
    questions.allQuestions.forEach((question) => {
      const optionObj = {};
      const questionWithOptionObject = {};
      questionWithOptionObject.questionId = question.questionId;
      questionWithOptionObject.questionText = question.question;
      const questionKeys = Object.keys(question);
      questionKeys.forEach((key) => {
        if (key.startsWith('option')) {
          optionObj[key] = question[key];
        }
      });
      questionWithOptionObject.options = optionObj;
      questionsArray.push(questionWithOptionObject);
    });
    return questionsArray;
  });
  return requestPromise;
};

module.exports = {
  fetchQuestions,
};

