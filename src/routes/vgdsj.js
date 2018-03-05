const Models = require('../../models');
const rp = require('request-promise');

const url1 = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allQuestions';
const url2 = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findAnswerById/';


const userLogin = (userName) => {
  Models.users.findOrCreate({
    userName,
  }).then((userExists) => {
    if (userExists) {
      status = '';
    }
  });
};
const handler = (request, response) => {
  rp(url1).then((result1) => {
    const obj = {};
    const questions = JSON.parse(result1);
    const promiseArray = [];
    for (let i = 0; i < questions.allQuestions.length; i += 1) {
      const url = `${url2}${questions.allQuestions[i].questionId}`;
      const correctAnswerPromise = rp(url);
      promiseArray.push(correctAnswerPromise);
      obj.qid = questions.allQuestions[i].questionId;
    }
    Promise.all(promiseArray).then((result2) => {
      for (let i = 0; i < result2.length; i += 1) {
        const answer = JSON.parse(result2[i]);
        obj.correctAnswer = answer.answer;
      }
      const optionObj = {};
      questions.allQuestions.forEach((question) => {
        const questionKeys = Object.keys(question);
        questionKeys.forEach((key) => {
          if (key.startsWith('option')) {
            optionObj.key = key;
            optionObj[key] = question.key;
          }
        });
      });
      const allQuestionsWithOptions = questions.allQuestions.map(question => ({
        qid: question.questionId,
        options: optionObj,
      }));
      console.log(allQuestionsWithOptions);
    });
  });
};

const login = {
  method: 'POST',
  path: '/login',
  handler,
};

module.exports = login;


const Server = require('../../server');
// const Models = require('../../../models');

describe('Testing the hapi server for GET request', () => {
  test('Should return 200 status code for sucessful GET request', (done) => {
    const options = {
      method: 'POST',
      url: '/login',
    };
    Server.inject(options, (response) => {
      expect(response.result.statusCode).toBe(201);
      done();
    });
  });
//   test('Responds with Not Found for invalid path', (done) => {
//     const options = {
//       method: 'POST',
//       url: '/user/mini',
//     };
//     Server.inject(options, (response) => {
//       expect(response.result.statusCode).toBe(404);
//       done();
//     });
//   });
});
