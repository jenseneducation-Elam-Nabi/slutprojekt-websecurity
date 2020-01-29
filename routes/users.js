const express = require("express");
const router = express.Router();
// const jwt = require("jsonwebtoken");
const myUser = require("../models/myuser");

const secret = process.env.MYPASS;
// const token = jwt.sign(secret);

router.post("/register", async (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        adress: {
            street: req.body.adress.street,
            zip: req.body.adress.zip,
            city: req.body.adress.city
        }
    }

    const users = await myUser.newRegister(newUser)
    res.send(users);
});

module.exports = router;