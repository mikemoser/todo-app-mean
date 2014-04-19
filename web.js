(function(undefined) {
  var passport = require('passport');
  var LocalStrategy = require('passport-local').Strategy;
  var express = require('express');
  var app = express();
  var mongoose = require('mongoose');
  var Routes = require('./routes');
  var Services = require('./services');

  // ----------------------------------------------------------------
  // MONGOOSE SETUP
  // ----------------------------------------------------------------
  mongoose.connect('mongodb://127.0.0.1:27017/toptal-todo');

  // ----------------------------------------------------------------
  // EXPRESS SETUP
  // ----------------------------------------------------------------
  app.set('view engine', 'jade');
  app.set('views', __dirname + '/web-app/views');
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'toptal todo key' }));
  app.use(express.bodyParser());
  app.use(passport.initialize());
  app.use(passport.session());

  var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
  });

  // ----------------------------------------------------------------
  // EXPRESS ROUTES
  // ----------------------------------------------------------------

  // Static Routes
  app.use('/img', express.static(__dirname + '/web-app/img'));
  app.use('/css', express.static(__dirname + '/web-app/css'));
  app.use('/js', express.static(__dirname + '/web-app/js'));

  // Public Routes
  app.get('/', function (req, res) {
    res.render('index');
  });

  app.get('/partials/:name', function (req, res) {
    var name = req.params.name;
    res.render('partials/' + name);
  });

  // Authentication Routes
  app.post('/login', passport.authenticate('local'), function (req, res) { 
    res.send(req.user); 
  }); 

  app.post('/logout', function (req, res) { 
    req.logOut(); 
    res.send(200); 
  });
  
  app.get('/loggedin', function (req, res) { 
    res.send(req.isAuthenticated() ? req.user : null); 
  });

  // User Routes  
  app.post('/users', Routes.User.create);

  // Todo Routes
  app.get('/user/:id/todos', ensureAuthenticated, Routes.Todo.list);
  app.post('/user/:id/todos', ensureAuthenticated, Routes.Todo.create);

  
  // ----------------------------------------------------------------
  // AUTHENTICATION
  // ----------------------------------------------------------------
  passport.use(new LocalStrategy(
    function(username, password, done) {
      Services.User.login(username, password)
      .then(function (user) {
        return done(null, user);
      }, function (error) {
        return done(null, false, { message: error.message})
      })
    }
  ));

  passport.serializeUser(function(user, done) {
    // TODO: Only serialize id for security
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    // TODO: Deserialize user based on id
    done(null, user);
  });

  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.send(401)
  }
})();