const Models = require('../../models');


const calculateScore = (uid) => {
  const questionIDtoAnswerMapping = {};
  let score = 0;
  const modelPromise = Models.correctanswers.findAll().then((qidWithCorrectAnswersArray) => {
    qidWithCorrectAnswersArray.forEach((qidWithCorrectAnswers) => {
      questionIDtoAnswerMapping[qidWithCorrectAnswers.qid] = qidWithCorrectAnswers.correctanswer;
    });
  }).then(() => {
    Models.useranswers.findAll({
      where: {
        userid: uid,
      },
    }).then((userAnswerArray) => {
      userAnswerArray.forEach((userAnswer) => {
        if (userAnswer.userAnswer === questionIDtoAnswerMapping[userAnswer.qid]) {
          score += 1;
        }
      });
      return score;
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
