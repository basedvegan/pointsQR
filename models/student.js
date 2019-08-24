const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  studentname: { type: String, required: true },
  points: { type: Number, required: true },
  qrcode: String,
  date: {type: Date, default: Date.now }
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
