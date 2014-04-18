(function(undefined) {
  var passport = require('passport');
  var LocalStrategy = require('passport-local').Strategy;
  var express = require('express');
  var app = express();
  var mongoose = require('mongoose');
  var Services = require('./services');

  // *** Mongoose setup ***
  mongoose.connect('mongodb://127.0.0.1:27017/toptal-todo');

  // *** Express Setup ***  
  app.set('view engine', 'jade');
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'toptal todo key' }));
  app.use(express.bodyParser());
  app.use(passport.initialize());
  app.use(passport.session());

  var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
  });

  // *** Express Routes ***
  app.use('/img', express.static(__dirname + '/img'));
  app.use('/css', express.static(__dirname + '/css'));
  app.use('/js', express.static(__dirname + '/js'));

  app.get('/', function (req, res) {
    res.render('index');
  });

  app.get('/partials/:name', function (req, res) {
    var name = req.params.name;
    res.render('partials/' + name);
  });

  // User routes
  app.get('/loggedin', function (req, res) { 
    res.send(req.isAuthenticated() ? req.user : '0'); 
  });

  app.post('/login', passport.authenticate('local'), function (req, res) { 
    res.send(req.user); 
  }); 

  app.post('/logout', function (req, res) { 
    req.logOut(); 
    res.send(200); 
  });

  // *** Authentication ***
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
})();