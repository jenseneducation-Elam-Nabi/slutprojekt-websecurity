const express = require("express");
const router = express.Router();
const Product = require("../models/myproducts");


router.get("/api/products", async (req, res) => {
    const post = await Product.all();
    res.json(post);
});

router.get("/api/products/:id", async (req, res) => {
    const post = await Product.create(req.params.id);
    if (!post) {
        res.json({ message: "Couldn't find post" });
    } else {
        res.json(post);
    }
});

router.post("/api/products/", async (req, res) => {
    const post = await Product.create(req.body);
    if (!post) {
        res.json({ message: "Couldn't create post" });
    } else {
        res.json(post);
    }
});

router.patch("/:id", async (req, res) => {
    let post = await Product.update(req.params.id, req.body);
    res.json(post);
});

router.delete("/api/products/:id", async (req, res) => {
    const post = await Product.remove(req.params.id);
    if (!post) {
        res.json({ message: 'Product removed' })
    } else {

        res.json(post);
    }
});
module.exports = router;


