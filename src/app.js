var express = require('express')
var app = express()
var frontend = require('./frontend')

app.use(frontend)

module.exports = app;

