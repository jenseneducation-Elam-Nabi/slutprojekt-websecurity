const express = require("express");
const router = express.Router();
const myUser = require("../models/myuser");


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
    if (userAuth) {
        res.json(userAuth)
    } else {
        res.send("You are not authorized");
    }
});

module.exports = router;