const Joi = require("joi");

const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required().min(0),
  description: Joi.string().required().min(10),
});

const productUpdateSchema = Joi.object({
  price: Joi.number().min(0),
  description: Joi.string().min(10),
});

module.exports = {
  productSchema,
  productUpdateSchema,
};
