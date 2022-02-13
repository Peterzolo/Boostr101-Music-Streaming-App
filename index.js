const express = require("express");
const databaseConnect = require("./config/database");
const app = require("./app");

require("dotenv").config();

databaseConnect();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
