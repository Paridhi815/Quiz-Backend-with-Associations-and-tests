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

const populateDb = () => {
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

// const readDb = () => {


// const questionObj={
//     questionText:
//     qid:
//     options:
// }
// };

const ifQuestionsInDb = () => Models.questions.findAll().then((result) => {
  if (result.length === 0) {
    populateDb();
  } else {
    return 'Questions are already in database';
  }
});

const handler = (request, response) => {
  // check if user exists,if exists return user
  // else create user and then return
  userLogin(request.payload.userName).then((value) => {
    response({
      statusCode: 201,
      value,
    });
  });
  // check if questions in db,if there then return
  // else populate db
  ifQuestionsInDb().then((value) => {
    console.log('Value is', value);
  });
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
