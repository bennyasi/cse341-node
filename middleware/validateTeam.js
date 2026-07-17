const Joi = require("joi");

const teamSchema = Joi.object({
  teamName: Joi.string().required(),
  city: Joi.string().required(),
  coach: Joi.string().required(),
  captain: Joi.string().required(),
  founded: Joi.number().integer().required(),
  stadium: Joi.string().required(),
  championships: Joi.number().integer().required()
});

const validateTeam = (req, res, next) => {
  const { error } = teamSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    });
  }

  next();
};

module.exports = validateTeam;