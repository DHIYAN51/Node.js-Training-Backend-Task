const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    emailid:{type:String,required:true,unique:true,minlength:3},
    username:{type:String,required:true,unique:true,minlength:3},
    password:{type:String,required:true,minlength:3},
    firstname:{type:String,required:true,minlength:3},
    lastname:{type:String,required:true,minlength:3},
},{
    timestamps : true
});

const Users = mongoose.model('Users',userSchema);

module.exports =  Users;