const Users = require("../model/user.model");
const bcrypt = require("bcrypt");

const getUser = async (req, res) => {
  const users = await Users.find();
  res.status(200).json(users);
  //  Users.find()
  //     .then((users) => res.json(users))
  //     .catch((err) => res.status(400).json("Error: " + err));
};



const setUser = async (req, res) => {
  const { username, firstname, lastname, emailid, password ,timestamps} = req.body;
  // const username = req.body.username;
  // const firstname = req.body.firstname;
  // const lastname=  req.body.lastname;
  // const  emailid= req.body.emailid;
  // console.log(username + " " + password + fn + " " +ln);

console.log(req.body);
  const alreadyExistUser = await Users.findOne({emailid}).catch(
    (err) => {
      console.log("Error: ", err);
    }
  );
  
  if (alreadyExistUser) {
    return res.status(409).json({ message: "User is already exists" });
  }

  // const alreadyExistname = await Users.findOne({username}).catch(
  //   (err) => {
  //     console.log("Error: ", err);
  //   }
  // );
 
  // if (alreadyExistname) {
  //   return res.status(409).json({ message: "User's--> Username is already exists" });
  // }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new Users({
    username,
    password: hashedPassword,
    firstname,
    lastname,
    emailid,
    timestamps,
  });
  const savedUser = await newUser.save().catch((err) => {
    console.log("Error: ", err);
    // res.status(500).json({ error: "cannot create user at the moment" });
  });
  if (savedUser){
    res.status(201).json({ message: "Thanks for creating new user" })}
    
    else{
      return res.status(400).json({message:"Please Fill all the Fields"})
    }
}


const updateUser = (req, res) => {
  Users.findById(req.params.id)

    .then((user) => {
      // user.username = req.body.username;
      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(
          (user.password = req.body.password),
          salt,
          (err, hashedPassword) => {
            user.password = hashedPassword;
          }
        );
      });
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
