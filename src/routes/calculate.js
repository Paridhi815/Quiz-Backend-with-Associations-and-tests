const Models = require('../../models');
const Sequelize = require('sequelize');

const { Op } = Sequelize;


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
      return Models.scores.upsert({
        userId,
        score,
      }).then(() => score);
    });
  });
  return modelPromise;
};

const leaderBoard = () => {
  const modelPromise = Models.users.findAll({
    include: [{
      model: Models.scores,
      as: 'score',
    }],
    order: [
      [{ model: Models.scores }, 'score', 'DESC'],
    ],
    limit: 5,
  }).then((result) => {
    const res = result;
    return result;
  });
  return modelPromise;
  // const modelPromise = Models.scores.findAll({
  //   order: [
  //     ['score', 'DESC'],
  //   ],
  //   raw: true,
  // }).then(result => (result.slice(0, 5)));
  // return modelPromise;
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
