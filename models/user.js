(function (undefined) {
  var mongoose = require('mongoose');

  var schema = new mongoose.Schema({ 
    username: { type: String, required: true },
    password: { type: String, required: true }, 
    salt: { type: String, required: true }
  });

  module.exports = mongoose.model('User', schema);
})();