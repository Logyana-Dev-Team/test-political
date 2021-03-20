const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema(
  {
    filename: {
      type: String,
      // unique : true,
      required: true,
    },
    // contentType: {
    //   type: String,
    //   required: true,
    // },
    // imageBase64: {
    //   type: String,
    //   required: true,
    // },
  },
  { timestamps: true }
);
const image = mongoose.model("image", ImageSchema);
module.exports = image;
