const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MahitiSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  desc1: {
    type: String,
    required: true,
  },
  desc2: {
    type: String,
    required: true,
  },
  facebook: {
    type: String,
    required: true,
  },
  instagram: {
    type: String,
    required: true,
  },
  gmail: {
    type: String,
    required: true,
  },
  whatsapp: {
    type: String,
    required: true,
  },
  playstore: {
    type: String,
  },
  number: {
    type: Number,
    required: true,
  },
});

const Mahiti = mongoose.model("mahiti", MahitiSchema);
module.exports = Mahiti;
