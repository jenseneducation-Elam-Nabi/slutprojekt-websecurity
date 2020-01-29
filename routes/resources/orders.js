const express = require("express");
const router = express.Router();
const myModels = require("../../models/myorders");

router.get("/", async (req, res) => {
    const post = await myModels.all();
    res.json(post);
});

router.post("/", async (req, res) => {
    const post = await myModels.create(req.body.content);
    res.json(post);
});

module.exports = router;


