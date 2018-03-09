const Models = require('../../models');
// const rp = require('request-promise');
const Joi = require('joi');
const populateQuestionDb = require('../helper/populateQuestionDb');
const populateAnswerDb = require('../helper/populateAnswerDb');


const userLogin = (userName) => {
  console.log(userName, 'USERLOGIN');

  const modelPromise = Models.users.findOrCreate({
    where: {
      userName,
    },
  }).then((userExists) => {
    // console.log(userExists, 'EXISTS');
    const [user, isCreated] = userExists;
    if (isCreated) {
      return 'New User Is Created';
    }
    return 'User Already Exists';
  });
  return modelPromise;
};

// const populateAnswerDb = () => {
//   const modelPromise = Models.questions.findAll().then((allQuestions) => {
//     const promiseArray = [];
//     const questionIdArray = [];
//     const questionWithnswer = [];
//     allQuestions.forEach((question) => {
//       const url = `${url2}${question.questionId}`;
//       const correctAnswerPromise = rp(url);
//       promiseArray.push(correctAnswerPromise);
//       questionIdArray.push(question.questionId);
//     });
//     return Promise.all(promiseArray).then((result) => {
//       for (let i = 0; i < result.length; i += 1) {
//         const answer = JSON.parse(result[i]);
//         const questionId = questionIdArray[i];
//         questionWithnswer.push({
//           questionId,
//           correctanswer: answer.answer,
//         });
//       }
//       return Models.correctanswers.bulkCreate(questionWithnswer);
//     });
//   });
//   return modelPromise;
// };

const getQuestionsFromDb = () => Models.questions.findAll();

const ifQuestionsInDb = () => Models.questions.findAll().then((result) => {
  if (result.length === 0) {
    return populateQuestionDb().then(() => getQuestionsFromDb());
  }
  return getQuestionsFromDb();
});


const getAnswersFromDb = () => Models.correctanswers.findAll();

const ifAnswersInDb = () => Models.correctanswers.findAll().then((result) => {
  if (result.length === 0) {
    return populateAnswerDb().then(() => getAnswersFromDb());
  }
  return getAnswersFromDb();
});

// const ifUserAnsInDb = () => {
//   Models.useranswers.findAll().then((result) => {
//     if (result.length === 0) {
//       console.log('User Is new and hasnt taken this quiz before');
//     } else {
//       fetchUserAnswers();
//     }
//   });
// };
const ifUserAnswersInDb = (userName) => {
  const modelPromise = Models.users.findAll({
    where: {
      userName,
    },
    include: [{
      model: Models.useranswers,
    }],
  }).then(res => res);
  return modelPromise;
};

const handler = (request, response) => {
  // check if user exists,if exists return user
  // else create user and then return
  userLogin(request.payload.userName).then((value) => {
    // console.log('here', value);
    // check if questions in db,if there then return
    // else populate db
    ifQuestionsInDb().then((questions) => {
    //   console.log('Value is', value1);
      // check if ans there in db
      // else populate ans
      ifAnswersInDb().then((value2) => {
        // console.log('value in answer', value2);
        ifUserAnswersInDb(request.payload.userName).then((persist) => {
          response({
            value,
            questions,
            persist,
            statusCode: 201,
          });
        //   });
        });
      });
    });
  });
};

const login = {
  method: 'POST',
  path: '/login',
  handler,
  config: {
    validate: {
      payload: {
        userName: Joi.string().alphanum().min(3).max(30)
          .required(),
      },
    },
  },
};

module.exports = login;
