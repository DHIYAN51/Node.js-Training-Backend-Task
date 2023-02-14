const Login = require("../model/login.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const registerUser = async (req, res) => {
  const { emailid, password, name } = req.body;
   
  if (!name || !password || !emailid) {
    return res.status(400).json(  "Please Fill All the Fields" );
  }
  const userExits = await Login.findOne({ emailid });
  if (userExits) {
    return res.status(400).json( "User Already Exists" );
  }
 

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  

  const user = await Login.create({
    name,emailid,password:hashedPassword
  })
 if(user){
    return res.status(201).json({
        id:user._id,name:user.name,emailid:user.emailid,status:"User Created"
    })
 }
 else{
    return res.status(400).json({msg:"Invalid User Data"})
 }
  
};

const loginUser = async (req, res) => {
    const{emailid,password} =req.body;
    if (!password || !emailid) {
        return res.status(400).json("Please Fill All the Fields");
      }
      const user = await Login.findOne({emailid});
      if (user && (await bcrypt.compare(password,user.password))) 
      {
         return res.json({
         _id: user._id,
         name: user.name,
         emailid:user.emailid,
         token: generateToken(user._id),
         status:"Login Successful",
         })
      }
      else{
        return res.status(404).json({msg:"Invalid User Data"})
      }

    
  
};

const getme = async (req, res) => {
   const {_id,emailid,name} = await Login.findById(req.user.id);

  return res.status(200).json({_id,name,emailid});
};


//generate token
const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
}



module.exports = {
  registerUser,
  loginUser,
  getme,
};
