const express = require('express');
const router = express.Router();
const {auth} = require("../middleware/authMiddleware")

const {registerUser,loginUser,getme}= require("../Controllers/loginController");
router.post('/',registerUser);
router.post('/loginuser',loginUser);
router.get('/home',auth,getme);


module.exports =router;