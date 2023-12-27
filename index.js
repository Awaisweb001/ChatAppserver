const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require('./routes/auth');

const app = express();

require("dotenv").config();

app.use(cors());
app.use(express.json());

const MongoURL = process.env.MONGO_URI;
const Port = process.env.PORT;

mongoose
  .connect(MongoURL)
  .then(() => {
    console.log("Db Connected SuccesFully !");
  })
  .catch((err) => {
    console.log(err);
  });

  // User Routes

  app.use('/api/user', userRoutes);




const Server = app.listen(Port, () => {
  console.log(`Server is Runing on ${Port}`);
});
