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
  const { email, password } = reqBody;
  const user = await Credential.findOne({
    where: {
      email: email
    }
  });

  if (user===null)
    return 'Invalid email or password.';

  const validPassword = await bcrypt.compare(password, user.dataValues.password);
  
  if (!validPassword)
    return 'Invalid email or password.';

  const token = jwt.sign({ email: email}, config.get('jwtPrivateKey'), {expiresIn: '1d'});
  redisClient.set(token, 1 , 'EX', 3600);
  return {
    accessToken: token,
  };
};

module.exports = { authenticateUser };
