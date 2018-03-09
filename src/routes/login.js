const Models = require('../../models');
const Joi = require('joi');
const populateQuestionDb = require('../helper/populateQuestionDb');
const populateAnswerDb = require('../helper/populateAnswerDb');
const userLogin = require('../helper/userLogin');


const getQuestionsFromDb = () => Models.questions.findAll();

const ifQuestionsInDb = () => Models.questions.count().then((noOfQuestions) => {
  if (noOfQuestions === 0) {
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
  userLogin(request.payload.userName).then((ifUserCreated) => {
    // check if questions in db,if there then return
    // else populate db
    ifQuestionsInDb().then((questions) => {
    //   console.log('Value is', value1);
      // check if ans there in db
      // else populate ans
      ifAnswersInDb().then((value2) => {
        ifUserAnswersInDb(request.payload.userName).then((persist) => {
          response({
            ifUserCreated,
            questions,
            persist,
            statusCode: 201,
          });
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
