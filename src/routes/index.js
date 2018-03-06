const testRoute = require('./testRoute');
const login = require('./login');
const addUserAnswer = require('./addUserAnswer');
const calculate = require('./calculate');

module.exports = [].concat(
  testRoute, login, addUserAnswer,
  calculate,
);
