const express = require('express');
const cors = require('cors');
const mongoose  = require('mongoose');
const UserRouter = require('./routes/user')

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}))
require('dotenv').config();
app.use(cors(
    {
        origin: "*"
    }
))


// app.get('/',(req,res)=>{
//     res.send("hello")
// })


app.use('/users',UserRouter);


const uri = process.env.ATLAS_URI;
mongoose.connect(uri,err=>{
    if(err) throw err;
})
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("Mongoose database connection established successfully")
})

const port = 8000
app.listen(port,()=>{
    console.log(`server is running in port ${port}`);
})
// app.listen(8001)