const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const myUser = require("../models/myuser");

require('dotenv').config()

const secret = process.env.MYPASS


router.post("/api/register", async (req, res) => {
    const user = await myUser.newRegister(req.body)
    if (user) {
        res.json(user)
    } else {
        res.send('Something went wrong...');
    }
});

router.post("/api/auth", async (req, res) => {
    const userAuth = await myUser.userLogin(req.body)
    const verify = jwt.verify(userAuth.token, process.env.MYPASS);
    if (verify) {
        res.json(verify);
        console.log(verify);
    } else {
        res.send("You are not authorized");
    }
});

module.exports = router;