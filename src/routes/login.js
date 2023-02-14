const express = require('express');
const router = express.Router();
const {auth} = require("../middleware/authMiddleware")
const { check } = require("express-validator");
const {registerUser,loginUser,details}= require("../Controllers/loginController");
 
router.post('/signup',registerUser , [
    check("email", "Invalid email").isEmail(),
    check("password", "Password must be at least 6 chars long").isLength({
      min: 6,
    }),
  ]);
router.post('/loginuser',loginUser);
router.get('/list',details);
 
 


module.exports =router;