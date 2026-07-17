const Joi = require("joi");

const validateTeam = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    department: Joi.string().required(),
    leader: Joi.string().required(),
    email: Joi.string().email().required(),
    members: Joi.number().integer().min(1).required()
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }

  next();
};

module.exports = validateTeam;