const mongoose = require("mongoose");
const moment = require("moment-timezone");

const alternatifSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    deskripsi: {
      type: String,
      required: true,
    },
  },
  { timestamps: true}
);


module.exports = mongoose.model("Alternatif", alternatifSchema);
