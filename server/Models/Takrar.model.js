const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const ImageSchema = new Schema({
//   filename : {
//       type : String,
//       unique : true,
//       required: true
//   },
//   contentType : {
//       type: String,
//       required : true
//   },
//   imageBase64 : {
//       type : String,
//       required: true
//   }
// })

const TakrarSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    status: String,
  },
  { timestamps: true }
);

const Takrar = mongoose.model("takrar", TakrarSchema);
module.exports = Takrar;
