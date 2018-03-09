// const Server = require('../../server');
// const Models = require('../../../models');
// // const Sequelize = require('sequelize');

// describe('Testing the hapi server for GET request', () => {
//   beforeAll((done) => {
//     Models.users.create({
//       userName: 'Paridhi',
//     }).then(() => {
//       console.log('BEFORE');
//       done();
//     });
//   });

//   test('Should return 201 status code for sucessful GET request', (done) => {
//     const options = {
//       method: 'POST',
//       url: '/login',
//       payload: {
//         userName: 'Paridhi',
//       },
//     };
//     Server.inject(options, (response) => {
//       expect(response.result.statusCode).toBe(201);
//       done();
//     });
//   });

//   test('Responds with 400 statusCode for empty/short username', (done) => {
//     const options = {
//       method: 'POST',
//       url: '/login',
//       payload: {
//         userName: 'P',
//       },
//     };
//     Server.inject(options, (response) => {
//       expect(response.statusCode).toBe(400);
//       done();
//     });
//   });
//   afterAll((done) => {
//     Models.users.destroy({
//       where: { userName: 'P' },
//     }).then(() => {
//       console.log('AFTER');
//       done();
//     });
//   });
// });

