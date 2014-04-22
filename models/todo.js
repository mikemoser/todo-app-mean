(function (undefined) {
  var mongoose = require('mongoose');

  var schema = new mongoose.Schema({ 
    description: { type: String, required: true },
    isComplete: { type: Boolean, required: true, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dueDate: { type: Date },
    priority: { type: Number, default: 1 } 
  });

  module.exports = mongoose.model('Todo', schema);
})();