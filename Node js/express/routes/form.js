const express = require("express");
// const path = require("path");

const router = express.Router();


router.get("/",(req,res) => {
    // res.render("form",{user:"Noor"});
    res.render("form",{user: req.query.data || "user"});
});

router.post("/submit",(req,res) => {
    console.log(req.body.data)
    res.send(req.body.data);
});

module.exports = router;




