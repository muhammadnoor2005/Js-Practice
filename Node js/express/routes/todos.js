const express = require("express");
const { getAllTodos, addTodo } = require("../controllers/todos");
const router = express.Router();

router.get("/",(req,res) => {
    res.render("todos",{todos:getAllTodos()});
});
router.post("/add",(req,res) => {
    addTodo(req.body.data);
    res.send("Todos Added");
});

module.exports = router;
