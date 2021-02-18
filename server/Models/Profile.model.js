const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Profile = new Schema({
    filename : {
        type : String,
        // unique : true,
        required: true
    },
    contentType : {
        type: String,
        required : true
    },
    imageBase64 : {
        type : String,
        required: true
    }
  })
  const profile = mongoose.model('profile', Profile);
  module.exports= profile