const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SamparkSchema = new Schema({
  number: {
    type: Number,
    required: true
  },
  message: {
    type: String,
    required: true
  }
},{
  timestamps:true
});

const Sampark = mongoose.model('sampark', SamparkSchema);
module.exports = Sampark;
