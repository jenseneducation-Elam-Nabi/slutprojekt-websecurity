const express = require("express");
const router = express.Router();
const Product = require("../models/myproducts");


// GET ALL PRODUCTS
router.get("/api/products", async (req, res) => {
    const product = await Product.all();
    res.json(product);
});

// GET ONE PRODUCT WITH THE HELP OF ID 
router.get("/api/products/:id", async (req, res) => {
    const product = await Product.create(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.json({ message: "Couldn't find product" });
    }
});

// CREATE A PRODUCT
router.post("/api/products", async (req, res) => {
    const product = await Product.create(req.body);
    if (!product) {
        res.json({ message: "Couldn't create product" });
    } else {
        res.json(product);
    }
});

// UPDATE ONE PRODUCT WITH THE HELP OF ID
router.patch("/api/products/:id", async (req, res) => {
    let product = await Product.update(req.params.id, req.body);
    if (!product) {
        res.json({ message: "Couldn't update post" });
    } else {
        res.json(product);
    }
});

// DELETE ON PRODUCT WITH THE HELP OF ID
router.delete("/api/products/:id", async (req, res) => {
    const product = await Product.remove(req.params.id);
    if (!product) {
        res.json({ message: "Product removed" });
    } else {
        res.json(product);
    }
});
module.exports = router;


