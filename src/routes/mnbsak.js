const Models = require('../../models');

const handler = (request, response) => {
  const { userid, qid, userAnswer } = request.payload;
  Models.useranswers.findOrCreate({
    where: {
      qid,
      userid,
      userAnswer,
    },
  }).then((result) => {
    const [userAnswer, isCreated] = result;
    if (isCreated) {
      return 'New Answer Is Created';
    }
    Models.useranswers.update({
      userAnswer,
    }, {
      where: {
        qid,
        userid,
      },
    });
  });
};

const addUserAnswer = {
  method: 'PUT',
  path: '/userAnswer',
  handler,
};


module.exports = addUserAnswer;
