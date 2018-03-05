const Server = require('../../server');

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
});
