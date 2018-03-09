const Models = require('../../models');

const userLogin = (userName) => {
  console.log(userName, 'USERLOGIN');
  let isNewUser = false;
  const modelPromise = Models.users.findOrCreate({
    where: {
      userName,
    },
  }).then((userExists) => {
    const [user, isCreated] = userExists;
    if (isCreated) {
      isNewUser = true;
      return isNewUser;
    }
    isNewUser = false;
    return isNewUser;
  });
  return modelPromise;
};

module.exports = userLogin;

