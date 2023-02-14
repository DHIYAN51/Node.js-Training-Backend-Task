const mongoose = require("mongoose");
const schema = mongoose.Schema;

const loginSchema = new schema(
  {
    
    emailid: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true, minlength: 3 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Login", loginSchema);
