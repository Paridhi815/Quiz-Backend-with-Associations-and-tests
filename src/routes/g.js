const Models = require('../../models');
const rp = require('request-promise');
const Joi = require('joi');

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

const populateQuestionDb = () => {
  const requestPromise = rp(url1).then((result1) => {
    // const obj = {};
    const questions = JSON.parse(result1);

    const questionsArray = [];
    questions.allQuestions.forEach((question) => {
      const optionObj = {};
      const questionWithOptionObject = {};
      questionWithOptionObject.qid = question.questionId;
      questionWithOptionObject.questionText = question.question;

      const questionKeys = Object.keys(question);
      questionKeys.forEach((key) => {
        if (key.startsWith('option')) {
          optionObj[key] = question[key];
        }
      });
      questionWithOptionObject.options = optionObj;
      questionsArray.push(questionWithOptionObject);
    });
    Models.questions.bulkCreate(questionsArray);
    // console.log(allQuestionsWithOptions);
  });
  return requestPromise;
};

const populateAnswerDb = () => {
  const modelPromise = Models.questions.findAll().then((allQuestions) => {
    const promiseArray = [];
    const questionIdArray = [];
    const questionWithnswer = [];
    allQuestions.forEach((question) => {
      const url = `${url2}${question.qid}`;
      const correctAnswerPromise = rp(url);
      promiseArray.push(correctAnswerPromise);
      questionIdArray.push(question.qid);
    });
    Promise.all(promiseArray).then((result) => {
      for (let i = 0; i < result.length; i += 1) {
        const answer = JSON.parse(result[i]);
        const questionId = questionIdArray[i];
        questionWithnswer.push({
          qid: questionId,
          correctanswer: answer.answer,
        });
      }
      Models.correctanswers.bulkCreate(questionWithnswer);
    });
    // });
  });
  return modelPromise;
};


const ifQuestionsInDb = () => Models.questions.findAll().then((result) => {
  if (result.length === 0) {
    populateQuestionDb();
  } else {
    return 'Questions are already in database';
  }
});

const ifAnswersInDb = () => Models.correctanswers.findAll().then((result) => {
  if (result.length === 0) {
    populateAnswerDb();
  } else {
    return 'Answers are already in dataBase';
  }
});

// const ifAnswersInDb = (userName) => {
//   const modelPromise = Models.users.findAll({
//     where: {
//       userName,
//     },
//     include: [{
//       model: Models.useranswers,
//       as: 'answers',
//     }],
//   }).then(res => res);
//   return modelPromise;
// };
// const ifAnswersInDb = () => {
//   const modelPromise = Models.correctanswers.findAll().then((result) => {
//     if (result.length === 0) {
//       populateAnswerDb();
//     } else {
//       return 'Answers are already in dataBase';
//     }
//   });
//   return modelPromise;
// };

const handler = (request, response) => {
  // check if user exists,if exists return user
  // else create user and then return
  userLogin(request.payload.userName).then((value) => {
    console.log('here', value);
    // check if questions in db,if there then return
    // else populate db
    ifQuestionsInDb().then((value1) => {
      console.log('Value is', value1);
      // check if ans there in db
      // else populate ans
      ifAnswersInDb().then((value2) => {
        console.log('value in answer', value2);
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
