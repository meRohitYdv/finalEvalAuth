const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('Joi');



function validateRequest(req, res, next){
  console.log(req.body);
  const schema = Joi.object().keys({ 
    username: Joi.string().required(),
    password: Joi.string().required()
  });
    
  const result = schema.validate(req.body);
    
  const {error} = result;
    
  if(error)
    return res.status(400).send(error);

  next();
}

// function isAdmin(req, res, next){  
//   if(req.user.role!=='admin')
//     return res.status(403).send('Access denied. Unauthorised.');
//   next();
// }

module.exports = {validateRequest };