const express = require("express");
const router = express.Router();
const Order = require("../models/myorders");

router.get("/api/orders", async (req, res) => {
    const myOrder = await Order.getMyOrders();
    res.json(myOrder);
});

router.post("/api/orders", async (req, res) => {
    const myOrder = await Order.create(req.body);
    if (!myOrder) {
        res.json({ message: "Order not found" });
    } else {
        res.json({ message: "Order created" });
    }
});

module.exports = router;


