const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  filename: {
    type: String,
    // unique: true,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
  imageBase64: {
    type: String,
    required: true,
  },
});

const KaryaSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
    images: [ImageSchema],
  },
  { timestamps: true }
);

const Karya = mongoose.model("karya", KaryaSchema);

module.exports = Karya;
