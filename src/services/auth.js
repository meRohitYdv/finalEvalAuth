const bcrypt = require('bcrypt');
const Credential = require('../models').Credential;
const User = require('../models').user;
const jwt = require('jsonwebtoken');
const config = require('config');

// const userByUsername = async (username) => {
//   return (await User.findOne({
//     where: {
//       username: username
//     }
//   })).dataValues;
// };

const authenticateUser = async function (reqBody) {
  const { username, password } = reqBody;
  const user = await Credential.findOne({
    where: {
      username: username
    }
  });

  if (user===null)
    return 'Invalid id or password.';

  const validPassword = await bcrypt.compare(password, user.dataValues.password);
  
  if (!validPassword)
    return 'Invalid id or password.';

  return {
    accessToken: jwt.sign({ username: username}, config.get('jwtPrivateKey'), {expiresIn: '1d'}),
  };
};

module.exports = { authenticateUser };
