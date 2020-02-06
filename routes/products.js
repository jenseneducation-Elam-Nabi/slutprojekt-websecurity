const express = require("express");
const router = express.Router();
const Product = require("../models/myproducts");
const authUser = require('./authUser')


// GET ALL PRODUCTS
router.get("/", async (req, res) => {
    const product = await Product.all();
    res.json(product);
});

// GET ONE PRODUCT WITH THE HELP OF ID 
router.get("/:id", async (req, res) => {
    const product = await Product.create(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.json({ message: "Couldn't find product" });
    }
});

// CREATE A PRODUCT
router.post("/", authUser.isAuthorized, async (req, res) => {
    if (req.user.role === 'admin') {

        const product = await Product.create(req.body);
        if (!product) {
            res.json({ message: "Couldn't create product" });
        } else {
            res.json(product);
        }
    } else {
        res.status(401).json({ message: "Not authorized" });
    }
});

// UPDATE ONE PRODUCT WITH THE HELP OF ID
router.patch("/:id", authUser.isAuthorized, async (req, res) => {
    if (req.user.role === 'admin') {

        let product = await Product.update(req.params.id, req.body);
        if (!product) {
            res.json({ message: "Couldn't update post" });
        } else {
            res.json(product);
        }
    } else {
        res.status(401).json({ message: "Not authorized" });
    }
});

// DELETE ON PRODUCT WITH THE HELP OF ID
router.delete("/:id", authUser.isAuthorized, async (req, res) => {
    if (req.user.role === 'admin') {

        const product = await Product.remove(req.params.id);
        if (!product) {
            res.json({ message: "Product removed" });
        } else {
            res.json(product);
        }
    } else {
        res.status(401).json({ message: "Not authorized" });
    }
});
module.exports = router;


