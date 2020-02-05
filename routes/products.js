const express = require("express");
const router = express.Router();
const Product = require("../models/myproducts");
const auth = require("./auth");


// GET ALL PRODUCTS
router.get("/", async (req, res) => {
    const product = await Product.all();
    res.json(product);
});

// GET ONE PRODUCT
router.get("/:id", async (req, res) => {
    const product = await Product.getOne(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.json({ message: "Couldn't find product" });
    }
});

// CREATE A PRODUCT
router.post("/:id", auth.auth, async (req, res) => {
    const product = await Product.create(req.body);
    if (!product) {
        res.json({ message: "Couldn't create product" });
    } else {
        res.json(product);
    }
});

// UPDATE ONE PRODUCT 
router.patch("/:id", auth.auth, async (req, res) => {
    let product = await Product.update(req.params.id, req.body);
    if (!product) {
        res.json({ message: "Couldn't update post" });
    } else {
        res.json(product);
    }
});

// DELETE ON PRODUCT
router.delete("/:id", auth.auth, async (req, res) => {
    const product = await Product.remove(req.params.id);
    if (!product) {
        res.json({ message: "Product removed" });
    } else {
        res.json(product);
    }
});
module.exports = router;


