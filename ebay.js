require('dotenv').config();

var express = require('express');
var app = express();
const controller = require("./controller.js");

controller(app);

app.listen(3000);
