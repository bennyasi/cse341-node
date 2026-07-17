const Joi = require("joi");

const bookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  genre: Joi.string().required(),
  isbn: Joi.string().required(),
  publishedYear: Joi.number().integer().required(),
  available: Joi.boolean().required(),
  pages: Joi.number().integer().required()
});

const validateBook = (req, res, next) => {
  const { error } = bookSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    });
  }

  next();
};

module.exports = validateBook;