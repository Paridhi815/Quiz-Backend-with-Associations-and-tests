
const Models = require('../../../models');

jest.mock('../../helper/fetchAnswers');

const populateAnswerDb = require('../../helper/populateAnswerDb');

describe('Testing the helper function populate database with correctanswers', () => {
  beforeAll((done) => {
    Models.correctanswers.destroy({ cascade: true, truncate: true }).then(() => {
      console.log('BEFORE');
      done();
    });
  });
  test('Should return length 0 for finding correctanswers in empty table', (done) => {
    Models.correctanswers.findAll().then((answerArray) => {
      expect(answerArray.length).toBe(0);
      done();
    });
  });
  test('Should return length > 0 for finding correctanswers in a table having correctanswers already', (done) => {
    populateAnswerDb().then(() => {
      Models.correctanswers.findAll().then((answerArray) => {
        expect(answerArray.length).not.toBe(0);
        done();
      });
    });
  });
  afterAll((done) => {
    Models.correctanswers.destroy({
      truncate: 'true',
    }).then(() => {
      console.log('AFTER');
      done();
    });
  });
});
