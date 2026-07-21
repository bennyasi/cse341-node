const Joi = require("joi");

const validateBook = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(2).max(100).required(),
    author: Joi.string().min(2).max(100).required(),
    isbn: Joi.string().required(),
    genre: Joi.string().required(),
    publishedYear: Joi.number().integer().required(),
    publisher: Joi.string().required(),
    pages: Joi.number().integer().required(),
    available: Joi.boolean().required()
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    });
  }

  next();
};

module.exports = validateBook;