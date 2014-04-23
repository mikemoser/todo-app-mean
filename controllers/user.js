(function (undefined) {
  var Services = require('../services');
  var jwt = require('jsonwebtoken');
  var secret = 'toptal todo yeah'

  module.exports.create = function (req, res) {
    Services.User.create(req.body.username, req.body.password)
    .then(function (user) {
      // Grant access token for user requests
      var token = jwt.sign(user, secret, { expiresInMinutes: 60*5 });
      res.json({ token: token });
    }, function (error) {
      res.json({ error: error.message });
    });
  }

  module.exports.login = function (req, res) { 
    Services.User.login(req.body.username, req.body.password)
    .then(function (user) {
        // Grant access token for user requests
        var token = jwt.sign(user, secret, { expiresInMinutes: 60*5 });
        res.json({ token: token });
    }, function (error) {
      res.json({ error: error.message });
    })
  }

  module.exports.me = function (req, res) {
    // For security, we need to clean the user object and only
    // send non sensitive information back (e.g. password hash).
    var cleanUser = { 
      _id: req.user._id,
      username: req.user.username
    }

    res.json(cleanUser);
  }
})();