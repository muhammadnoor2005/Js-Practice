const express = require("express");
const { addTodo, getAllTodos,deleteTodo } = require("../controllers/todos");

const router = express.Router();

router.get("/",(req,res) => {
    res.render("todos",{todos:getAllTodos()});
});

router.post("/add",(req,res) => {
    addTodo(req.body.data);
    // res.send("Todo Added");
    res.redirect("/todos");
});

module.exports = router;
