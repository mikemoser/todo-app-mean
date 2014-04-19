(function (undefined) {
  var Services = require('../services');

  module.exports.create = function (req, res) {
    Services.User.create(req.body.username, req.body.password)
    .then(function (user) {
      req.login(user, function (error) {
        if (error)
          res.send(500);
        else
          res.send(user);  
      });
    }, function (error) {
      res.send(500);
    });
  }
})();