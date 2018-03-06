const Models = require('../../models');


const calculateScore = (uid) => {
  const modelPromise = Models.correctanswers.findAll().then((correctAnswerArray) => {
    Models.useranswers.findAll({
      where: {
        userid: uid,
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
