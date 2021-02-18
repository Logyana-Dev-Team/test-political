const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VideosSchema = new Schema(
  {
    link: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Videos = mongoose.model("video", VideosSchema);
module.exports = Videos;
