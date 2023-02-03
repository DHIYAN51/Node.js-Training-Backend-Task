const router = require ('express').Router();

const Users = require('../model/user.model');

router.route('/').get((req,res)=>{
    Users.find()
    .then(users => res.json(users))
    .catch(err=> res.status(400).json("Error: " + err))
})

router.route('/add').post((req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const newUser = new Users(({username,password}))
    newUser.save() 
    .then(()=>res.json("user added!!"))
    .catch(err=>res.status(400).json("Error: " + err));
})

module.exports = router;