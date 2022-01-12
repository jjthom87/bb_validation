require('dotenv').config();

var express = require('express');
var app = express();
const controller = require("./services/controller.js");

controller(app);

app.listen(4000);
