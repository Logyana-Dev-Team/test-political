const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Banner = new Schema({
    filename : {
        type : String,
        // unique : true,
        required: true
    },
    // contentType : {
    //     type: String,
    //     required : true
    // },
    // imageBase64 : {
    //     type : String,
    //     required: true
    // }
  })
  const banner = mongoose.model('banner', Banner);
  module.exports= banner