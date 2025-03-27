const Joi = require("joi");

const validateUser = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    role: Joi.string(),
  });
  const validate = schema.validate(user);
  return validate;
};

const validateLogin = (login) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  const validate = schema.validate(login);
  return validate;
};

module.exports.validateLogin = validateLogin;
module.exports.validateUser = validateUser;
