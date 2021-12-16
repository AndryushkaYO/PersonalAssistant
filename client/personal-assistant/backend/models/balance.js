const mongoose = require('mongoose');

const balanceSchema = mongoose.Schema({
  date: { type: String, require: true },
  sectors : [ { name: String, value: Number } ],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true }
});

module.exports = mongoose.model('Balance', balanceSchema);
