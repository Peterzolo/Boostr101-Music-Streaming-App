 const express = require('express');
 const bodyParser = require('body-parser');
 const cors = require('cors');
 const morgan = require('morgan');


  app.use(express.json());
  app.use(bodyParser.urlencoded({extended : true}));

  app.use(cors())
  app.use(morgan())

  module.exports = app;


