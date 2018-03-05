const Server = require('../../server');
const Models = require('../../../models');


describe('Testing the hapi server for GET request', () => {
  beforeAll((done) => {
    Models.users.create({
      userName: 'Paridhi',
    }).then(() => {
      console.log('BEFORE');
      done();
    });
  });
  test('Should return 201 status code for sucessful GET request', (done) => {
    const options = {
      method: 'POST',
      url: '/login',
      payload: {
        userName: 'Paridhi',
      },
    };
    Server.inject(options, (response) => {
      expect(response.result.statusCode).toBe(201);
      done();
    });
  });
  test('Should return User Already Exists for existing User', (done) => {
    console.log('REACHED');
    const options = {
      method: 'POST',
      url: '/login',
      payload: {
        userName: 'Paridhi',
      },
    };
    Server.inject(options, (response) => {
      expect(response.result.value).toBe('User Already Exists');
      done();
    });
  });
  test('Should return New User Is Created for New users', (done) => {
    const options = {
      method: 'POST',
      url: '/login',
      payload: {
        userName: 'Pari',
      },
    };
    Server.inject(options, (response) => {
      expect(response.result.value).toBe('New User Is Created');
      done();
    });
  });
  afterAll((done) => {
    Models.users.destroy({
      where: { userName: 'Paridhi' },
    }).then(() => {
      console.log('AFTER');
      done();
    });
  });
});
