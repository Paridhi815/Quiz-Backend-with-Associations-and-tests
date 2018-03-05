const Models = require('../../models');
const rp = require('request-promise');

const url1 = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allQuestions';
const url2 = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findAnswerById/';


// const userLogin = (userName) => {
//   Models.users.findOrCreate({
//     userName,
//   }).then((userExists) => {
//     if (userExists) {
//       status = '';
//     }
//   });
// };
const handler = (request, response) => {
  // check if user exists,if existes return user
  // else create user and then return
  // check if questions in db,if there then return
  // else populate db
  // check if ans there in db
  // else populate ans
  // get user answers

  response({
    statusCode: 201,
  });
};

const login = {
  method: 'POST',
  path: '/login',
  handler,
};

module.exports = login;
