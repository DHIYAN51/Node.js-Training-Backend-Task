const Users = require("../model/user.model");
const bcrypt = require ('bcrypt')



const getUser = async(req, res) => {

 Users.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
};

const setUser = (req, res) => {
  const username = req.body.username;
  const firstname = req.body.firstname;
  const lastname=  req.body.lastname;
  const  emailid= req.body. emailid;
    // console.log(username + " " + password + fn + " " +ln);
 
  bcrypt.genSalt(10, (err,salt) => {
    bcrypt.hash(req.body.password,salt,(err,hashedPassword)=>{
      const password = hashedPassword;
      const newUser = new Users({ username, password, firstname ,lastname,  emailid});
      newUser
      .save()
      .then(() => res.json("user added!!"))
      .catch((err) => res.status(400).json("Error: " + err));
    })
  })
}

 
 

const updateUser = (req, res) => {
  Users.findById(req.params.id)

    .then((user) => {
      // user.username = req.body.username;
      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;
      bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash( user.password = req.body.password,salt,(err,hashedPassword)=>{
          user.password = hashedPassword;
        })})
      user
        .save()
        .then(() => res.json("user updated"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

const deleteUser = (req, res) => {
  Users.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json("Users Deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
};

module.exports = {
  getUser,
  setUser,
  updateUser,
  deleteUser,
};