const Login = require("../model/login.model");
const jwt = require("jsonwebtoken")
require("dotenv").config();
const auth =  async (req,res,next)=>{

  
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer Token
// let token;
  // Authenticate token
  try {
    const decode = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await Login.findById(decode.id).select('-password');
        next()
  } catch (error) {
    res.status(403).json({
      errors: [
        {
          msg: "Not Authorizated, Wrong Token",
        },
      ],
    });
  }
// if(req.headers.authorization &&req.headers.authorization.startsWith('Bearer')){
//     try{
//         token= req.headers.authorization.split(' ')[1];
//             console.log(token);
//         // to find user id
//         const decode = jwt.verify(token,process.env.JWT_SECRET);
//         req.user = await Login.findById(decode.id).select('-password');
//         next()
//     }
//     catch(err){
//         return res.status(401).json({err: "Not Authorizated, Wrong Token"})
//     }
    if(!token){
        return res.status(401).json({msg:"Not Authorizated,No Token"})
    }
}


module.exports ={auth};