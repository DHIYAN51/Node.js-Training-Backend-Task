const mongoose = require("mongoose");
const schema = mongoose.Schema;

const loginSchema = new schema(
  {
    
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true, minlength: 3 },
    confirmpassword:{type:String,required:true,minlength:3}
  },
  {
    timestamps: true,
  }
);

const Login = mongoose.model("Login", loginSchema);
module.exports = Login;