const Product = require("../models/product");
const validateObjectId = require("../validations/validateObjectId");
const validateProduct = require("../validations/validateProduct");

const getAllProducts = async (req, res) => {

  const { tags, price, category, type } = req.query;

  const queryObject = {};

  if (tags) {
    queryObject.tags = {$in: JSON.parse(tags).map( t => new RegExp(t) )}
  }

  if (category) {
    queryObject.category = category;
  }

  if (price) {
    const [min, max] = price.split("-");
    queryObject.price = { $gte: min, $lte: max };
  }

  if (type) {
    queryObject.type = type;
  }

  // pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page -1) * limit;

  const products = 
  await Product.find(queryObject)
    .skip(skip)
    .limit(limit);

  res.json({
    nbHits: products.length,
    hits: products,
  });
};


const getProduct = async (req, res) => {
  const {id: productId} = req.params;

  // validate ID
  const { error } = validateObjectId({ id: productId });
  if (error) return res.status(400).send("Invalid ID!");

  const product = await Product.findById(productId);
  if(!product) return res.status(404).send(`No product with id: ${productId}`);

  res.json({product});
};


const createProduct = async (req, res) => {
  const {body} = req;

  // product validation 
  const {error} = validateProduct(body);
  if(error) return res.status(400).send(error.details[0].message);

  const product = await Product.create(body);

  res.status(201).json(product);
};


const updateProduct = async (req, res) => {

  const {body} = req;
  const {id:productId} = req.params;

  // validate ID
  const { error: IdError } = validateObjectId({ id: productId });
  if (IdError) return res.status(400).send("Invalid ID!");

  // product validation 
  const {error} = validateProduct(body);
  if(error) return res.status(400).send(error.details[0].message);

  const product = await Product.findByIdAndUpdate(productId, body, {new: true})
  if(!product) return res.status(404).send(`No product with id: ${productId}`);

  res.send(product);
};


const deleteProduct = async (req, res) => {

  const {id:productId} = req.params;

  // validate ID
  const { error: IdError } = validateObjectId({ id: productId });
  if (IdError) return res.status(400).send("Invalid ID!");

  const product = await Product.findByIdAndDelete(productId);
  if(!product) return res.status(404).send(`No product with id: ${productId}`);

  res.send(product);
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
