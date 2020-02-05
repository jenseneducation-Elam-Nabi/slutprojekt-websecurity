const express = require("express");
const router = express.Router(); // to be able to use router instead of app in our middleware.
const Order = require("../models/myorders"); // to be able to use the myorders model, we have to import it. 
const jwt = require("jsonwebtoken");

require('dotenv').config();

router.get("/api/orders", async (req, res) => {

    //The HTTP Authorization request header contains the credentials to authenticate a user agent with a server.//
    //if the credetentials doesn't match then you will get an 403(forbidden).

    if (req.headers.authorization === undefined) {
        res.status(403);
        res.json({ message: "You are not ALLOWED" });
    } else {
        try {

            /* if the credentials(keys) matches with the ones that we had sent
            from our payload inside the myuser.js, then we deconstruct(decode)
            the key and at the same time we remove the bearer and replace it with an empty array,
            we also send in our secret. */

            const myPayload = jwt.verify(req.headers.authorization.replace("Bearer ", ""), process.env.MYPASS)
            if (myPayload.role == "admin") {
                const getAllOrders = await Order.getMyOrders();
                res.json(getAllOrders);
            } else if (myPayload.role == "costumer") {
                const order = await Order.getOneOrder(myPayload.userID);
                res.json(order);
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
    }
});

module.exports = router;


