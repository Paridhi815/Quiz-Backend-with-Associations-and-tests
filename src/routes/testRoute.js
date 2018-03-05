
const handler = (request, response) => {
  response('Working!');
};


module.exports = {
  method: 'GET',
  path: '/',
  handler,
};
