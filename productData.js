const Chance = require("chance");
const chance = new Chance();
const connectDB = require("./db/connect");
require("dotenv").config();
const Product = require("./models/product");

const products = [];

for (let i = 0; i < 1000; i++) {
  const product = {
    name: `Product ${i}`,
    category: `Category ${i}`,
    price: chance.integer({ min: 10, max: 1000 }),
    type: `Type ${i}`,
    tags: [`tag${i}1`, `tag${i}2`, `tag${i}3`],
  };

  products.push(product);
}


const populateDB = async () => {
  await connectDB(process.env.mongo_uri);
  await Product.deleteMany();
  if(products.length !== 0){
    await Product.create(products);
    console.log('Success!')
    process.exit(0)
  }
  else{
    console.error('Error! Empty array passed.')
    process.exit(1);
  }
}


populateDB();

// console.log(products);
