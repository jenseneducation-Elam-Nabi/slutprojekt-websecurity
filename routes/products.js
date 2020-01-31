const express = require("express");
const router = express.Router();
const Product = require("../models/myproducts");


router.get("/", async (req, res) => {
    const post = await Product.all();
    res.json(post);
});

router.get("/:id", async (req, res) => {
    const post = await Product.all(req.params.id);
    res.json(post);
});

router.post("/", async (req, res) => {
    const post = await Product.create(req.body.content);
    res.json(post);
});

router.patch("/:id", async (req, res) => {
    let post = await Product.update(req.params.id, req.body);
    res.json(post);
});

router.delete("/:id", async (req, res) => {
    const post = await Product.remove(req.params.id);
    res.json(post);
});
module.exports = router;


