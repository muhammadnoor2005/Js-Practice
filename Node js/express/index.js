const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const form = require("./routes/form");
const todos = require("./routes/todos");
const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(path.join(process.cwd(), "public")));

app.set("view engine","ejs");
app.set("views","views");

app.use((req,res,next) =>{
    req.name = "noor";
    next();
});

// app.use((req,res,next) => {
//     res.send(req.name);
//     next();
// });

app.use("/form",form);
app.use("/todos",todos);



app.listen(3000);
