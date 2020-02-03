const express = require("express");
const router = express.Router();
const myUser = require("../models/myuser");

require('dotenv').config();


router.post("/api/register", async (req, res) => {
    const user = await myUser.newRegister(req.body)
    if (user) {
        res.json(user);
    } else {
        res.send('Something went wrong...');
    }
});

router.post("/api/auth", async (req, res) => {
    const token = await myUser.userLogin(req.body);
    if (token) {
        res.status(201).json(token);
        console.log(token);
    } else {
        res.status(401).json({ error: "You are not authorized" });
    }
});

module.exports = router;