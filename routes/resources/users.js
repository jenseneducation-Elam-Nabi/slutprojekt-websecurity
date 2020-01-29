const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const secret = process.env.MYPASS;
const token = jwt.sign(secret)

const myUser = require("../../models/myuser");

router.post("/register", async (req, res) => {
    const users = await myUser.create(req.body);
    res.send(users);
});

module.exports = router;