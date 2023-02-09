const Users = require("../model/user.model")

const getUser = async (req,res)=>{
   await Users.find()
    .then(users => res.json(users))
    .catch(err=> res.status(400).json("Error: " + err))
}

const setUser = (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    console.log(username+ " " + password);
    const newUser = new Users(({username,password}))
    newUser.save() 
    .then(()=>res.json("user added!!"))
    .catch(err=>res.status(400).json("Error: " + err));
}

const updateUser = (req,res)=>{
    Users.findById(req.params.id)
    .then(user => {
        user.username = req.body.username;
        user.password = req.body.password;

        user.save()
        .then(()=>res.json("user updated"))
        .catch(err=>res.status(400).json("Error: " + err));
    })
    .catch(err=>res.status(400).json("Error: " + err));
}

const deleteUser =(req,res)=>{
    Users.findByIdAndDelete(req.params.id)
    .then(()=>res.json("Users Deleted"))
    .catch(err=>res.status(400).json("Error: " + err))
}

module.exports ={
    getUser,setUser,updateUser,deleteUser
}