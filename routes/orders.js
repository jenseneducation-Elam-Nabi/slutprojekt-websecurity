const { Router } = require("express");
const router = new Router();
const Order = require("../models/myorders");
require("dotenv").config();
const auth = require("./auth");

router.get("/", auth.auth, async (req, res) => {

    try {
        if (req.user.role === "admin") {
            const orders = await Order.getMyOrders();
            res.json(orders);
        } else if (req.user.role === "customer") {
            const order = await Order.getOneOrder(req.user.userID);
            res.json(order);
        }
    } catch (error) {
        res.status(401).json({ message: error });
    }
});

router.post("/", auth.auth, async (req, res) => {
    try {
        const order = await Order.create(req.body, req.user.userID);
        res.json(order);
    } catch (error) {
        res.status(401).json({ message: error });
    }
});

module.exports = router;


