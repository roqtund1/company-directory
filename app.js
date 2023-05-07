require("dotenv").config();
require("express-async-errors");

//extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');

const express = require("express");
const app = express();

const connectDB = require("./db/connect");

const employeesRouter = require('./routes/employees');

const notFoundMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');


app.get("/", (req, res) => {
  res.send(process.env.message || "Env not working.");
});

app.set('trust proxy', 1);
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10
}))
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.use('/api/v1/', employeesRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware)

const port = process.env.port || 4000;

const start = async () => {
  try {
    await connectDB(process.env.mongo_uri);
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log("Could not connect to MongoDB.", error.message);
  }
};

start();
