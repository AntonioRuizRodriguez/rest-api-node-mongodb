const express = require("express");
const routes = require("./routes/routes");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/restapis" )
  .then(() => console.log("MongoDB Conectado..."))
  .catch((err) => console.log(err));

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes());

app.listen(5080);
