const express = require('express');
const app = express();

const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');

require('dotenv').config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); //this is the equivalent of body-parser -> allows you to do req.body
// app.use(express.static("./build"));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//api endpoints
app.use(routes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});