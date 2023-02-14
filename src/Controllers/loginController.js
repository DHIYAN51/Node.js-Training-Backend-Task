const Login = require("../model/login.model");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { validationResult } = require("express-validator");
require("dotenv").config();
// Get all users
const details =async (req, res) => {
  const users = await Login.find();
  res.status(200).json(users);
};

const registerUser = async (req, res) => {
  const { email, password, name, confirmpassword } = req.body;
  //  Validate user input
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  if (!name || !password || !email || !confirmpassword) {
    return res.status(400).json("Please Fill All the Fields");
  }
  const userExits = await Login.findOne({ email });
  if (userExits) {
    return res.status(400).json("User Already Exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await Login.create({
    name,
    email,
    password: hashedPassword,
    confirmpassword: hashedPassword,
  });
  if (user) {
    return res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      status: "User Created",
    });
  } else {
    return res.status(400).json({ msg: "Invalid User Data" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!password || !email) {
    return res.status(400).json("Please Fill All the Fields");
  }
  const user = await Login.findOne({ email });
  // If user not found, send error message
  if (!user) {
    return res.status(400).json({
      errors: [
        {
          msg: "Invalid credentials",
        },
      ],
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({
      errors: [
        {
          msg: "Email or password is invalid",
        },
      ],
    });
  }

  if (user) {
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      status: "Login Successful",
    });
  } else {
    return res.status(404).json({ msg: "Invalid User Data" });
  }
};

//generate token
const generateToken = (id) => {
  return JWT.sign({ id }, process.env.ACCESS_TOKEN_SECRET);
};

module.exports = {
  registerUser,
  loginUser,
  details,
};
