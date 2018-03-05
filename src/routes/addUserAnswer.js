const Models = require('../../models');

const handler = (request, response) => {
  const { userid, qid, userAnswer } = request.payload;
  Models.useranswers.upsert({
    qid,
    userid,
    userAnswer,
  }, {
    where: {
      qid,
      userid,
    },
  }).then((result) => {
    response(result);
  });
};

const addUserAnswer = {
  method: 'PUT',
  path: '/userAnswer',
  handler,
};


module.exports = addUserAnswer;
