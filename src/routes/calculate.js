const Models = require('../../models');


const calculateScore = (userId) => {
  const questionIDtoAnswerMapping = {};
  let score = 0;
  const modelPromise = Models.correctanswers.findAll().then((qidWithCorrectAnswersArray) => {
    qidWithCorrectAnswersArray.forEach((qidWithCorrectAnswers) => {
      questionIDtoAnswerMapping[qidWithCorrectAnswers.questionId] = qidWithCorrectAnswers.correctanswer;
    });
  }).then(() => {
    console.log('Check');
    return Models.useranswers.findAll({
      where: {
        userId,
      },
    }).then((userAnswerArray) => {
      userAnswerArray.forEach((userAnswer) => {
        if (userAnswer.userAnswer === questionIDtoAnswerMapping[userAnswer.questionId]) {
          score += 1;
        }
      });
      return Models.scores.create({
        userId,
        score,
      });
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
  const { userId } = request.payload;
  Models.questions.count().then((numberOfQuestions) => {
    Models.useranswers.count({
      where: {
        userId,
      },
    }).then((numberOfUserAnswers) => {
      if (numberOfQuestions === numberOfUserAnswers) {
        calculateScore(userId).then((scores) => {
          leaderBoard().then((leaderBoardValue) => {
            response({
              userId,
              scores,
              leaderBoardValue,
            });
          });
        });
      } else {
        response('Please Answer All Questions First');
      }
    });
  });
};

const addUserAnswer = {
  method: 'PUT',
  path: '/score',
  handler,
};


module.exports = addUserAnswer;
