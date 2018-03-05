const Models = require('../../models');
const rp = require('request-promise');

const url1 = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allQuestions';
const url2 = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findAnswerById/';


const userLogin = userName => Models.users.findOrCreate({
  where: {
    userName,
  },
}).then((userExists) => {
  if (userExists) {
    return 'New User Is Created';
  }
  return 'User Already Exists';
});

const handler = (request, response) => {
  // check if user exists,if existes return user
  // else create user and then return
  userLogin(request.payload.userName).then((value) => {
    response({
      statusCode: 201,
    });
  });
  // check if questions in db,if there then return
  // else populate db
  // check if ans there in db
  // else populate ans
  // get user answers
};

const login = {
  method: 'POST',
  path: '/login',
  handler,
};

module.exports = login;
