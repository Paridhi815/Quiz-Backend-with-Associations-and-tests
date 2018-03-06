const Models = require('../../models');

const handler = (request, response) => {
  const { userId, questionId, userAnswer } = request.payload;
  Models.useranswers.findOrCreate({
    where: {
      questionId,
      userId,
    },
    defaults: {
      userAnswer,
      questionId,
      userId,
    },
  }).then((result) => {
    const [userAnswers, isCreated] = result;
    if (isCreated) {
      return 'New Answer Is Created';
    }
    Models.useranswers.update({
      userAnswer,
      questionId,
      userId,
    }, {
      where: {
        questionId,
        userId,
      },
    });
  });
  response('upserted');
};

const addUserAnswer = {
  method: 'PUT',
  path: '/userAnswer',
  handler,
};


module.exports = addUserAnswer;
