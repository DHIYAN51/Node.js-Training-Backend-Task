const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const UserRouter = require("./src/routes/user");
const LoginRouter = require("./src/routes/login")
const app = express();
const bodyParser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/*+json' }))
require("dotenv").config();
app.use(cors(
    
));


// app.get('/',(req,res)=>{
//     res.send("hello")
// })

mongoose.set("strictQuery", false);
app.use("/users", UserRouter);
app.use("/login",LoginRouter)

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, (err) => {
  if (err) throw err;
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongoose database connection established successfully");
});

const port = 8001;
app.listen(port, () => {
  console.log(`server is running in port ${port}`);
});
// app.listen(8001)
