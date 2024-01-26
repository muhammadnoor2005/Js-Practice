if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}


const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const auth = require("./routes/auth");
const methodOverride = require("method-override");
const mongoose = require("./models/connection");
const cors = require("cors");
const { verify } = require("./middlewares/auth");
const multer = require("multer");
const profile = require("./routes/profile");
const student = require("./routes/student");
const app = express();


app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(cors());

app.set("view engine","ejs");
app.set("views","views");


app.use("/auth",auth);
app.use("/profile",verify,profile);
app.use("/student",verify,student);


app.listen(8000,() => {
    console.log("Server started");
});
