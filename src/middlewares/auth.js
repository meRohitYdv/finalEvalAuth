const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('Joi');



function validateRequest(req, res, next){
  const schema = Joi.object().keys({ 
    email: Joi.string().required().min(3).email(),
    password: Joi.string().required().min(3)
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