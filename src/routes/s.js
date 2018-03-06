const Models = require('../../models');


const calculateScore = (uid) => {
  const modelPromise = Models.correctanswers.findAll().then((correctAnswerArray) => {
    Models.useranswers.findAll({
      where: {
        userId: uid,
      },
    }).then((userAnswerArray) => {
      let score = 0;
      for (let correctAnswerIndex = 0; correctAnswerIndex < correctAnswerArray.length; correctAnswerIndex += 1) {
        for (let userAnswerIndex = 0; userAnswerIndex < userAnswerArray.length; userAnswerIndex += 1) {
          if (correctAnswerArray[correctAnswerIndex].qid === userAnswerArray[userAnswerIndex].qid) {
            if (correctAnswerArray[correctAnswerIndex].correctanswer === userAnswerArray[userAnswerIndex].userAnswer) {
              score += 1;
            }
          }
        }
      }
    //   Models.scores.upsert();
    });
  });
  return modelPromise;
};

const leaderBoard = () => {
  const modelPromise = Models.scores.findAll({
    order: [
      ['score', 'DESC'],
    ],
    raw: true,
  }).then(result => (result.slice(0, 5)));
  return modelPromise;
};

const handler = (request, response) => {
  const { uid } = request.payload;
  calculateScore(uid);
  leaderBoard();
};

const addUserAnswer = {
  method: 'PUT',
  path: '/score',
  handler,
};


module.exports = addUserAnswer;





const Models = require('../../models');
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

const populateQuestionDb = () => {
  const questionsArray = fetchQuestions();
  return Models.questions.bulkCreate(questionsArray);
};

module.exports = populateQuestionDb;
