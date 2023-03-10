const services = require('../services/auth.js');
const jwt = require('jsonwebtoken');
const config = require('config');

const authenticateUser =  async function(req, res){
  const token = await services.authenticateUser(req.body);
  if(token==='Invalid email or password.')
    return res.status(400).send(token);
  
  res.status(200).send(token);
};

async function verifyJWT(req, res, next) {
  const token = req.body?.token;
  if(!token)
    return res.status(401).send('Access denied. No token provided.');
  try{
    const isToken = await redisClient.get(token);
    if(Number(isToken) === 1){
      const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
      res.status(200).send(decoded);
    }
    else {
      res.status(401).send('Invalid token.');
    }
  }
  catch(ex){
    res.status(401).send('Invalid token.');
  }
}


module.exports = {authenticateUser, verifyJWT };