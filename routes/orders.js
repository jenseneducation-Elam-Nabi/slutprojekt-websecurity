const express = require("express");
const router = express.Router(); // to be able to use router instead of app in our middleware.
const Order = require("../models/myorders"); // to be able to use the myorders model, we have to import it. 
const jwt = require("jsonwebtoken");

require('dotenv').config();
const authUser = require('./authUser')

router.get("/", authUser.isAuthorized, async (req, res) => {

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

            if (req.user.role == "admin") {
                const getAllOrders = await Order.getMyOrders();
                res.json(getAllOrders);
            } else if (req.user.role == "costumer") {
                const order = await Order.getOneOrder(req.user.userID);
                res.json(order);
            }


        } catch (error) {
            res.status(403);
        }
    }
});

router.post("/", authUser.isAuthorized, async (req, res) => {
    if (req.headers.authorization === undefined) {
        res.status(403);
        res.json({ message: "You are not ALLOWED" });
    } else {
        try {
            const myOrder = await Order.create(req.body, req.user.userID);
            res.json(myOrder);
        } catch (error) {
            res.status(403);
        }
    }
});

module.exports = router;


