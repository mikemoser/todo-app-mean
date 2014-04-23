(function(undefined) {
  var express = require('express');
  var app = express();
  var mongoose = require('mongoose');
  var apiRoutes = require('./config/api-routes')
  var auth = require('./config/authorization');

  // Setup mongoose
  mongoose.connect('mongodb://127.0.0.1:27017/toptal-todo');

  // Setup Express
  app.set('view engine', 'jade');
  app.set('views', __dirname + '/web-app/views');
  app.use(express.bodyParser());

  var server = app.listen(8080, function() {
    console.log('Listening on port %d', server.address().port);
  });

  // Public Routes
  app.get('/', function (req, res) {
    res.render('index');
  });

  app.get('/partials/:name', function (req, res) {
    res.render('partials/' + req.params.name);
  });

  app.use('/img', express.static(__dirname + '/web-app/img'));
  app.use('/css', express.static(__dirname + '/web-app/css'));
  app.use('/js', express.static(__dirname + '/web-app/js'));

  // Load Api routes
  apiRoutes(app, auth);
})();