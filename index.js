const express = require("express");
const api = express();
const Joi = require("joi");

const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required().min(10),
});

api.use(express.json());
api.use(express.urlencoded({ extended: true }));

let products = [];

api.get("/", function (req, res) {
  return res.status(200).json({
    message: "Panthera store api service",
  });
});

api.post("/product", function (req, res) {
  const productCheck = productSchema.validate(req.body);
  if (productCheck.error) {
    return res.status(400).json({
      message: productCheck.error.message,
    });
  }
  // check if product already exists
  let productExist = products.find(
    (prod) => prod.name.toLowerCase() === req.body.name.toLowerCase()
  );
  if (productExist)
    return res.status(400).json({
      message: `product ${req.body.name} already exists`,
    });
  const newProduct = { id: products.length + 1, ...req.body };
  products.push(newProduct);
  return res.status(201).json({
    message: "product created successfully",
    products: products,
  });
});

api.get("/product", (req, res) => {
  console.log(req.params);
  return res.status(200).json({
    message: "product retrieved successfully",
    products: products,
  });
});

api.get("/product/:productId", function (req, res) {
  console.log(req.params);
  const product = products.find((prod) => prod.id == req.params.productId);
  if (!product) {
    return res.status(404).json({
      message: "product not found, no product exist with that id",
    });
  }
  return res.status(200).json({
    message: "product retrieved",
    product: product,
  });
});

api.listen(4000, function () {
  console.log("Service listening on port 4000");
});
