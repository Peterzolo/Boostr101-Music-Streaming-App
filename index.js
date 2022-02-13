const express = require("express");
const databaseConnect = require("./config/database");

require("dotenv").config();

const app = express();

databaseConnect();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
