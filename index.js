const express = require('express');
const cors = require('cors');
const mongoose  = require('mongoose');

require('dotenv').config();
const app = express();

app.get('/',(req,res)=>{
    res.send("hello")
})

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