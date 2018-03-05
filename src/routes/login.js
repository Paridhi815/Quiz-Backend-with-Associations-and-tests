const Models = require('../../models');
const rp = require('request-promise');

const url1 = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allQuestions';
const url2 = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findAnswerById/';


const userLogin = (userName) => {
  console.log(userName, 'USERLOGIN');

  const modelPromise = Models.users.findOrCreate({
    where: {
      userName,
    },
  }).then((userExists) => {
    console.log(userExists, 'EXISTS');
    const [user, isCreated] = userExists;
    if (isCreated) {
      return 'New User Is Created';
    }
    return 'User Already Exists';
  });
  return modelPromise;
};

// const populateDb = () => {
//     return rp(url1).then((result1) => {
//         const obj = {};
//         const questions = JSON.parse(result1);
//         const promiseArray = [];
//         for (let i = 0; i < questions.allQuestions.length; i += 1) {
//           const url = `${url2}${questions.allQuestions[i].questionId}`;
//           const correctAnswerPromise = rp(url);
//           promiseArray.push(correctAnswerPromise);
//           obj.qid = questions.allQuestions[i].questionId;
//         }
//         Promise.all(promiseArray).then((result2) => {
//           for (let i = 0; i < result2.length; i += 1) {
//             const answer = JSON.parse(result2[i]);
//             obj.correctAnswer = answer.answer;
//           }
//           const optionObj = {};
//           questions.allQuestions.forEach((question) => {
//             const questionKeys = Object.keys(question);
//             questionKeys.forEach((key) => {
//               if (key.startsWith('option')) {
//                 optionObj.key = key;
//                 optionObj[key] = question.key;
//               }
//             });
//           });
//           const allQuestionsWithOptions = questions.allQuestions.map(question => ({
//             qid: question.questionId,
//             options: optionObj,
//           }));
//           console.log(allQuestionsWithOptions);
//         });
//       });
// };

// const readDb = () => {


// const questionObj={
//     questionText:
//     qid:
//     options:
// }
// };

// const ifQuestionsInDb = () => {
//   Models.questions.findAll().then((result) => {
//     if (result.length === 0) {
//       populateDb();
//     } else {
//       readDb();
//     }
//   });
// };

const handler = (request, response) => {
  // check if user exists,if existes return user
  // else create user and then return
  userLogin(request.payload.userName).then((value) => {
    response({
      statusCode: 201,
      value,
    });
  });
  // check if questions in db,if there then return
  // else populate db
//   ifQuestionsInDb().then((value) => {

//   });
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
