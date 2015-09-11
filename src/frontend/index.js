var express = require('express')
var swig = require('swig')
var subscriptionController = require('./controllers/subscription')
var webpackProxy = require('./webpack.proxy.js')
var app = express()

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.engine('html', swig.renderFile)

app.set('view engine', 'html')
app.set('views', __dirname + '/views')

// Swig will cache templates for you, but you can disable
// that and use Express's caching instead, if you like:
app.set('view cache', false);
// To disable Swig's cache, do the following:
swig.setDefaults({ cache: false });
// NOTE: You should always cache templates in a production environment.
// Don't leave both of these to `false` in production!

// Routes

app.get('/', subscriptionController.get)
app.post('/', subscriptionController.post)
app.get('/thankyou', subscriptionController.thankyou)
//app.get('/verify', subscriptionController.verify)
app.use(webpackProxy)

module.exports = app

