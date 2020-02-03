const express = require("express");
const router = express.Router();
const Order = require("../models/myorders");
const jwt = require("jsonwebtoken");

require('dotenv').config();

router.get("/api/orders", async (req, res) => {
    if (req.headers.authorization === undefined) {
        res.status(403);
        res.json({ message: "You are not ALLOWED" });
    } else {
        try {
            const myPayload = jwt.verify(req.headers.authorization.replace("Bearer ", ""), process.env.MYPASS)
            if (myPayload.role == "admin") {
                const getAllOrders = await Order.getMyOrders();
                res.json(getAllOrders);
            } else if (myPayload.role == "costumer") {
                const getOneOrder = await Order.getOneOrder();
                res.json(getOneOrder);
            }


        } catch (error) {
            res.status(403);
        }
    }
});

router.post("/api/orders", async (req, res) => {
    if (req.headers.authorization === undefined) {
        res.status(403);
        res.json({ message: "You are not ALLOWED" });
    } else {
        try {
            const myPayload = jwt.verify(req.headers.authorization.replace("Bearer ", ""), process.env.MYPASS)
            const myOrder = await Order.create(req.body, myPayload.userID);
            res.json(myOrder);
        } catch (error) {
            res.status(403);
        }
        if (!myOrder) {
            res.json({ message: "Order not found" });
        } else {
            res.json({ message: "Order created" });
        }
    }
});

module.exports = router;


