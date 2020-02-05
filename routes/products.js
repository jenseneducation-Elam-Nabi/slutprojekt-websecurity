const express = require("express");
const router = express.Router();
const Product = require("../models/myproducts");
const auth = require("./auth");


// GET ALL PRODUCTS
router.get("/", async (req, res) => {
    const products = await Product.all();
    res.json(products);
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
router.post("/", auth.auth, async (req, res) => {
    if (req.user.role == "admin") {
        const product = await Product.create(req.body);
        if (product) {
            res.json(product);
        } else {
            res.json({ message: "Product couldn't be created" });
        }
    } else {
        res.status(401).json({ message: "Not authorized" });
    }
});

// UPDATE ONE PRODUCT 
router.patch("/:id", auth.auth, async (req, res) => {
    if (req.user.role == "admin") {
        const product = await Product.update(req.params.id, req.body);
        if (product) {
            res.json({ message: "Item updated" });
        } else {
            res.json({ message: "Couldn't update product" });
        }
    } else {
        res.status(401).json({ message: "Not authorized" });
    }
});

// DELETE ON PRODUCT
router.delete("/:id", auth.auth, async (req, res) => {
    if (req.user.role == "admin") {
        const product = await Product.delete(req.params.id);
        if (product) {
            res.json({ message: "Item deleted" });
        } else {
            res.json({ message: "Couldn't delete product" });
        }
    } else {
        res.status(401).json({ message: "Not authorized" });
    }
});
module.exports = router;


