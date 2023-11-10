const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const form = require("./routes/form");
const todos = require("./routes/todos");
const products = require("./routes/products");
const methodOverride = require("method-override");
const cors = require("cors");
const app = express();


app.use(bodyParser.urlencoded({extended:false}));
// app.use(methodOverride('_method'));
app.use(bodyParser.json()); 
app.use(express.static(path.join(process.cwd(), "public")));
app.use(methodOverride("_method"));
app.use(cors());
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
app.use("/products",products);



app.listen(3000,() => {
    console.log("Started");
});
