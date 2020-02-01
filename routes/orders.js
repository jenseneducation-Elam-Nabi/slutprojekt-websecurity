const express = require("express");
const router = express.Router();
const Order = require("../models/myorders");

router.get("/api/orders", async (req, res) => {
    const posts = await Order.all();
    res.json(posts);
});

router.post("/", async (req, res) => {
    const post = await Order.create(req.body.content);
    res.json(post);
});

module.exports = router;


