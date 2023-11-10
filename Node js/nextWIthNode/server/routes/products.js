const express = require("express");
const { getProducts, addProduct, editProduct, deleteProduct } = require("../controllers/products");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const API = "http://localhost:3001";

router.get("/",(req,res) => {
    // res.render("products/products",{products:getProducts()});
    res.json(getProducts());
}); 


router.get("/add",(req,res) => {
    const param = req.url;
    res.render("products/addProduct");
});
router.post("/add/done",(req,res) => {
    addProduct(req.body.name,uuidv4());
    // res.send(201);
    res.redirect(API);
});


// router.get("/edit/:id",(req,res) => {
//     const { id } = req.params;
//     res.send("products/editProduct",{id});
// });
router.patch("/edit/done/:id",(req,res) => {
    const { id } = req.params;
    editProduct(req.body.name,id);
    res.redirect(API);
});

router.delete("/del/:id",(req,res) => {
    const {id} = req.params;
    deleteProduct(id);
    res.send(200);  
})

module.exports = router;