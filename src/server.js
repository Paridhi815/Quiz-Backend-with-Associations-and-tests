const Hapi = require('hapi');
const Routes = require('./routes');

const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: '9000',
});

server.route(Routes);

if (!module.parent) {
  server.start((err) => {
    if (err) {
      throw err;
    }
    console.log('Server Running at:', server.info.uri);
  });
}

module.exports = server;
