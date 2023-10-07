const express = require("express");
require('dotenv').config();
const port = process.env.PORT;

const error = require('./middleware/error')
const { sendJson } = require('./middleware/generateResponse');

const app = express();

app.use(express.json());
app.use("/api/v1", require("./routes"));

app.response.sendJson = sendJson;
// if error is not instance of APIError, convert it
app.use(error.converter)
// catch 404
app.use(error.notFound)

app.listen(port, ()=> {
  console.log(`Server listening on ${port}`);
});