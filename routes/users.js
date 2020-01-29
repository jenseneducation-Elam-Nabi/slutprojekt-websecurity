const express = require("express");
const router = express.Router();
// const jwt = require("jsonwebtoken");
const myUser = require("../models/myuser");

const secret = process.env.MYPASS;
// const token = jwt.sign(secret);

router.post("/api/register", async (req, res) => {
    const user = await myUser.newRegister(req.body)
    if (user) {
        res.json(user)
    } else {
        res.send('Something went wrong...')
    }
});

module.exports = router;