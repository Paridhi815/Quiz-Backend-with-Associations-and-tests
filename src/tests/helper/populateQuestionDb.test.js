
const Models = require('../../../models');

jest.mock('../../helper/fetchQuestions');

const populateQuestionDb = require('../../helper/populateQuestionDb');

describe('Testing the helper function populate database with questions', () => {
  beforeAll((done) => {
    Models.questions.destroy({ cascade: true, truncate: true }).then(() => {
      console.log('BEFORE');
      done();
    });
  });
  test('Should return length 0 for finding questions in empty table', (done) => {
    Models.questions.findAll().then((answerArray) => {
      expect(answerArray.length).toBe(0);
      done();
    });
  });
  test('Should return length > 0 for finding questions in a table having questions already', (done) => {
    populateQuestionDb().then(() => {
      Models.questions.findAll().then((answerArray) => {
        expect(answerArray.length).not.toBe(0);
        done();
      });
    });
  });
  afterAll((done) => {
    Models.questions.destroy({
      truncate: 'true',
    }).then(() => {
      console.log('AFTER');
      done();
    });
  });
});
