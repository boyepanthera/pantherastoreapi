const express = require("express");
const Product = require("./models/product.model");
const sequelize = require("./connection");
const api = express();
const {
  productSchema,
  productUpdateSchema,
} = require("./validators/product.validator");
api.use(express.json());
api.use(express.urlencoded({ extended: true }));

api.get("/", function (req, res) {
  return res.status(200).json({
    message: "Panthera store api service",
  });
});

api.post("/product", async function (req, res) {
  const productCheck = productSchema.validate(req.body);
  if (productCheck.error) {
    return res.status(400).json({
      message: productCheck.error.message,
    });
  }
  // check if product already exists
  let productExist = await Product.findOne({
    where: {
      name: req.body.name,
    },
  });
  if (productExist)
    return res.status(400).json({
      message: `product ${req.body.name} already exists`,
    });
  const newProduct = await Product.create(req.body);
  return res.status(201).json({
    message: "product created successfully",
    products: newProduct,
  });
});

api.get("/product", async (req, res) => {
  const products = await Product.findAll({});
  return res.status(200).json({
    message: "product retrieved successfully",
    products: products,
  });
});

api.get("/product/:productId", async function (req, res) {
  const product = await Product.findByPk(req.params.productId);
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

api.put("/product/:productId", async function (req, res) {
  const productCheck = productUpdateSchema.validate(req.body);
  if (productCheck.error) {
    return res.status(400).json({
      message: productCheck.error.message,
    });
  }
  const product = await Product.update(req.body, {
    where: {
      id: req.params.productId,
    },
  });
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

api.delete("/product/:productId", async function (req, res) {
  const product = await Product.destroy({
    where: {
      id: req.params.productId,
    },
  });
  if (!product) {
    return res.status(404).json({
      message: "product not found, no product exist with that id",
    });
  }
  return res.status(200).json({
    message: "product trashed",
    product: product,
  });
});

api.listen(4000, async function () {
  console.log("Service listening on port 4000");
  try {
    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (err) {
    console.error("err ", err.message);
  }
});
