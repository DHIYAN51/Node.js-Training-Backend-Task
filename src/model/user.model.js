const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    emailid: {type:String},
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true, minlength: 3 },
    firstname: { type: String, required: true, minlength: 3 },
    lastname: { type: String, required: true, minlength: 3 },
  },
  {
    timestamps: true
  }
);

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
