const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const myUser = require("../../models/myusers");

const secret = process.env.MYPASS;
const token = jwt.sign(secret)

router.post("/auth", async (req, res) => {
    try {
        res.json({ token });
    } catch (error) {
        res.status(403).send("Something went wrong")
    }
});

router.post("/register", async (req, res) => {
    const myUser = await
})