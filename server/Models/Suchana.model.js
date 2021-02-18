const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SuchanaSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  link:{
      type:String,
  }
},{timestamps:true});

const Suchana = mongoose.model('suchana', SuchanaSchema);
module.exports = Suchana;
