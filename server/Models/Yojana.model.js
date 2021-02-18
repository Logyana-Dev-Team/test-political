const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const YojanaSchema = new Schema(
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
  },
  { timestamps: true }
);

const Yojana = mongoose.model("yojana", YojanaSchema);
module.exports = Yojana;
